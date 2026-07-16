import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Loader2, AlertCircle, RotateCcw, Info } from 'lucide-react';

interface ThreeViewerProps {
  modelPath: string;
  texturePath: string;
  fallbackType: 'ganesha' | 'radha_krishna';
}

export const ThreeViewer: React.FC<ThreeViewerProps> = ({
  modelPath,
  texturePath,
  fallbackType,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Generate procedural marble texture for the pedestal
  const createProceduralMarbleTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.fillStyle = '#f0ede6';
    ctx.fillRect(0, 0, 512, 512);

    const drawVein = (color: string, width: number, opacity: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      let x = Math.random() * 512;
      let y = 0;
      ctx.moveTo(x, y);
      while (y < 512) {
        y += Math.random() * 15 + 5;
        x += (Math.random() - 0.5) * 12;
        x = Math.max(0, Math.min(512, x));
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    for (let i = 0; i < 12; i++) drawVein('#b8b4ac', Math.random() * 2 + 0.5, Math.random() * 0.25 + 0.08);
    for (let i = 0; i < 4; i++) drawVein('#d4af37', Math.random() * 1.5 + 0.5, Math.random() * 0.3 + 0.15);

    ctx.globalAlpha = 0.04;
    ctx.fillStyle = '#8b7e74';
    for (let i = 0; i < 3000; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 2 + 1, Math.random() * 2 + 1);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 500;

    // --- Scene ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf5efe6);

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 8);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.5;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // prevent going below floor
    controls.target.set(0, 2, 0);
    controls.update();

    // --- LIGHTING: Studio 3-point setup ---
    // Key light (warm, front-right, strong)
    const keyLight = new THREE.DirectionalLight(0xfff8e8, 3.0);
    keyLight.position.set(4, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 10;
    keyLight.shadow.camera.bottom = -2;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    // Fill light (cool blue-white, front-left, softer)
    const fillLight = new THREE.DirectionalLight(0xe8f0ff, 1.2);
    fillLight.position.set(-6, 5, 3);
    scene.add(fillLight);

    // Rim/Back light (warm gold, from behind, for silhouette)
    const rimLight = new THREE.DirectionalLight(0xffcc44, 1.8);
    rimLight.position.set(0, 6, -8);
    scene.add(rimLight);

    // Hemisphere light (sky/ground ambient, very important for realism)
    const hemiLight = new THREE.HemisphereLight(0xfff5e0, 0xe8d8c0, 0.9);
    scene.add(hemiLight);

    // Ground light (upward bounce, warm sandstone)
    const groundBounce = new THREE.PointLight(0xf0d9b5, 0.6, 12);
    groundBounce.position.set(0, 0.5, 0);
    scene.add(groundBounce);

    // --- FLOOR: Smooth polished marble plane ---
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xede8df,
      roughness: 0.35,
      metalness: 0.08,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0; // floor is at y=0
    floor.receiveShadow = true;
    scene.add(floor);

    // --- PEDESTAL: Stacked layers with marble texture ---
    const marbleTexture = createProceduralMarbleTexture();
    const pedestalMat = new THREE.MeshStandardMaterial({
      map: marbleTexture,
      roughness: 0.12,
      metalness: 0.05,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.15,
      metalness: 0.92,
    });

    const pedestalGroup = new THREE.Group();

    // Layer 1: Wide square plinth base (bottom)
    const plinthGeo = new THREE.BoxGeometry(2.8, 0.2, 2.8);
    const plinth = new THREE.Mesh(plinthGeo, pedestalMat);
    plinth.position.y = 0.1; // sits on floor (floor=0, center at 0.1)
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    pedestalGroup.add(plinth);

    // Layer 2: Gold decorative band
    const band1Geo = new THREE.BoxGeometry(2.6, 0.06, 2.6);
    const band1 = new THREE.Mesh(band1Geo, goldMat);
    band1.position.y = 0.23;
    pedestalGroup.add(band1);

    // Layer 3: Main octagonal body
    const bodyGeo = new THREE.CylinderGeometry(1.1, 1.2, 0.7, 8);
    const body = new THREE.Mesh(bodyGeo, pedestalMat);
    body.position.y = 0.62;
    body.castShadow = true;
    body.receiveShadow = true;
    pedestalGroup.add(body);

    // Layer 4: Top gold trim ring
    const ringGeo = new THREE.TorusGeometry(1.12, 0.04, 8, 32);
    const topRing = new THREE.Mesh(ringGeo, goldMat);
    topRing.rotation.x = Math.PI / 2;
    topRing.position.y = 0.98;
    pedestalGroup.add(topRing);

    // Layer 5: Top cap slab
    const capGeo = new THREE.CylinderGeometry(1.15, 1.1, 0.12, 8);
    const cap = new THREE.Mesh(capGeo, pedestalMat);
    cap.position.y = 1.04;
    cap.castShadow = true;
    cap.receiveShadow = true;
    pedestalGroup.add(cap);

    // PEDESTAL_TOP_Y = 1.04 + 0.06 = 1.10
    const PEDESTAL_TOP_Y = 1.10;

    scene.add(pedestalGroup);

    // --- LOAD MODEL & TEXTURE ---
    let loadedTexture: THREE.Texture | null = null;

    const textureLoader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader();

    /**
     * Force-apply the loaded texture to EVERY mesh in the object tree.
     * Creates a brand new MeshStandardMaterial for each mesh to guarantee texture shows.
     */
    const forceApplyTexture = (obj: THREE.Object3D, tex: THREE.Texture) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.flipY = false; // GLB models expect flipY=false
      tex.needsUpdate = true;

      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          // Always create a fresh MeshStandardMaterial to guarantee texture is applied
          const newMat = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.35,
            metalness: 0.05,
            envMapIntensity: 0.8,
          });
          // Preserve vertex colors if present
          if (child.geometry.attributes.color) {
            newMat.vertexColors = true;
          }
          child.material = newMat;
          child.material.needsUpdate = true;
        }
      });
    };

    const createProceduralFallback = () => {
      setIsUsingFallback(true);
      const fallbackGroup = new THREE.Group();

      const figureMat = new THREE.MeshStandardMaterial({
        map: marbleTexture,
        roughness: 0.25,
        metalness: 0.05,
      });

      if (fallbackType === 'ganesha') {
        // Torso
        const belly = new THREE.Mesh(new THREE.SphereGeometry(0.65, 32, 32), figureMat);
        belly.scale.set(1, 1.15, 0.85);
        belly.position.y = 0.85;
        belly.castShadow = true;
        fallbackGroup.add(belly);
        // Head
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 32), figureMat);
        head.position.set(0, 1.7, 0.1);
        head.castShadow = true;
        fallbackGroup.add(head);
        // Trunk curve
        const trunkPts: THREE.Vector3[] = [];
        for (let i = 0; i < 20; i++) {
          const t = i / 19;
          trunkPts.push(new THREE.Vector3(Math.sin(t * Math.PI * 1.2) * 0.22, 1.75 - t * 0.85, 0.3 + Math.sin(t * Math.PI * 0.5) * 0.38));
        }
        const trunk = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(trunkPts), 20, 0.1, 16, false), figureMat);
        trunk.castShadow = true;
        fallbackGroup.add(trunk);
        // Crown
        const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.28, 0.48, 16), goldMat);
        crown.position.set(0, 2.25, 0.08);
        fallbackGroup.add(crown);
        // Ears
        const earGeo = new THREE.TorusGeometry(0.26, 0.07, 16, 32, Math.PI * 1.5);
        const leftEar = new THREE.Mesh(earGeo, figureMat);
        leftEar.position.set(-0.42, 1.72, 0.1);
        leftEar.rotation.set(0, 0, Math.PI * 0.3);
        fallbackGroup.add(leftEar);
        const rightEar = new THREE.Mesh(earGeo, figureMat);
        rightEar.position.set(0.42, 1.72, 0.1);
        rightEar.rotation.set(0, 0, -Math.PI * 0.8);
        fallbackGroup.add(rightEar);
        // Belt
        const belt = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.022, 8, 32), goldMat);
        belt.rotation.x = Math.PI / 2 + 0.15;
        belt.position.set(0, 0.88, 0);
        fallbackGroup.add(belt);

      } else {
        // Krishna: elegant standing figure with flute
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.35, 1.4, 16), figureMat);
        body.position.y = 0.9;
        body.castShadow = true;
        fallbackGroup.add(body);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), figureMat);
        head.position.set(0.05, 1.85, 0);
        fallbackGroup.add(head);
        const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.22, 0.4, 16), goldMat);
        crown.position.set(0.05, 2.25, 0);
        fallbackGroup.add(crown);
        // Flute
        const flutePts: THREE.Vector3[] = [];
        for (let i = 0; i < 10; i++) {
          const t = i / 9;
          flutePts.push(new THREE.Vector3(-0.3 + t * 0.7, 1.3 - t * 0.05, 0.3 - t * 0.1));
        }
        const flute = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(flutePts), 10, 0.02, 8, false), goldMat);
        fallbackGroup.add(flute);
        // Halo
        const halo = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.018, 8, 48), goldMat);
        halo.position.set(0.05, 1.85, -0.3);
        fallbackGroup.add(halo);
      }

      // Position fallback group ON TOP of pedestal
      fallbackGroup.position.y = PEDESTAL_TOP_Y;
      scene.add(fallbackGroup);
      setLoading(false);
    };

    const loadTexturePromise = (path: string): Promise<THREE.Texture> =>
      new Promise((resolve, reject) => {
        textureLoader.load(path, resolve, undefined, (err: any) => reject(err));
      });

    const loadRealAsset = async () => {
      try {
        setProgress(10);
        
        // 1. Load texture (jpg -> jpeg fallback)
        let texPath = texturePath;
        try {
          loadedTexture = await loadTexturePromise(texPath);
        } catch {
          if (texPath.endsWith('.jpg')) texPath = texPath.slice(0, -4) + '.jpeg';
          else if (texPath.endsWith('.jpeg')) texPath = texPath.slice(0, -5) + '.jpg';
          try {
            loadedTexture = await loadTexturePromise(texPath);
          } catch (e2: any) {
            throw new Error('Texture failed: ' + (e2?.message || String(e2)));
          }
        }
        setProgress(50);

        // 2. Load GLB model
        if (!modelPath.endsWith('.glb') && !modelPath.endsWith('.gltf')) {
          throw new Error('Unsupported model format, expected .glb');
        }

        const gltf = await new Promise<any>((resolve, reject) => {
          gltfLoader.load(
            modelPath,
            (data) => resolve(data),
            (evt) => setProgress(50 + Math.round((evt.loaded / (evt.total || 1)) * 45)),
            (err: any) => reject(new Error('GLB load failed: ' + (err?.message || String(err))))
          );
        });

        setProgress(98);
        const model = gltf.scene as THREE.Object3D;

        // 3. Normalize scale — fit within 2.2 units height
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 2.2 / maxDim;
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // 4. Re-compute bounding box after scaling
        const scaledBox = new THREE.Box3().setFromObject(model);
        const center = scaledBox.getCenter(new THREE.Vector3());
        const scaledMin = scaledBox.min;

        // 5. Position model:
        //    - Center horizontally (X, Z)
        //    - Place BOTTOM of model at PEDESTAL_TOP_Y (so model sits ON TOP of stage)
        model.position.x = -center.x;
        model.position.z = -center.z;
        model.position.y = PEDESTAL_TOP_Y - scaledMin.y;

        // 6. Force-apply texture to all meshes
        forceApplyTexture(model, loadedTexture!);

        scene.add(model);
        setProgress(100);
        setLoading(false);

      } catch (e: any) {
        console.warn('Could not load 3D asset, using procedural fallback. Error:', e.message);
        createProceduralFallback();
      }
    };

    loadRealAsset();

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    let autoRotateAngle = 0;
    let userInteracting = false;

    const onPointerDown = () => { userInteracting = true; };
    const onPointerUp = () => { userInteracting = false; };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const tick = () => {
      const delta = clock.getDelta();

      if (controlsRef.current) controlsRef.current.update();

      // Gently auto-rotate when user isn't interacting
      if (!userInteracting && !loading) {
        autoRotateAngle += delta * 0.18;
        pedestalGroup.rotation.y = autoRotateAngle;
        scene.traverse((child) => {
          if (child instanceof THREE.Group && child !== pedestalGroup) {
            child.rotation.y = autoRotateAngle;
          }
        });
      }

      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(tick);
    };
    tick();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (rendererRef.current) rendererRef.current.dispose();
      if (controlsRef.current) controlsRef.current.dispose();
      scene.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return;
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      });
      marbleTexture.dispose();
      if (loadedTexture) loadedTexture.dispose();
    };
  }, [modelPath, texturePath, fallbackType]);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(0, 2, 0);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* 3D Canvas */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: 'clamp(340px, 50vw, 560px)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          backgroundColor: '#f5efe6',
        }}
      />

      {/* Loading Overlay */}
      {loading && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(245, 239, 230, 0.96)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          borderRadius: '16px',
          zIndex: 10,
        }}>
          <Loader2 size={48} color="var(--gold-color)" style={{ animation: 'spin-slow 2s linear infinite' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-dark)', fontSize: '1.3rem' }}>
            Merging Textures…
          </h3>
          <div style={{ width: '200px', height: '4px', backgroundColor: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--gold-color)', transition: 'width 0.3s ease' }} />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{progress}% Loaded</span>
        </div>
      )}

      {/* Controls overlay */}
      {!loading && (
        <div style={{
          position: 'absolute',
          bottom: '14px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 5,
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <div className="glass-panel" style={{
            padding: '5px 12px',
            borderRadius: '20px',
            fontSize: '0.78rem',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: 'auto',
          }}>
            <Info size={13} color="var(--gold-color)" />
            <span>{isUsingFallback ? 'Procedural Preview (360°)' : 'Texture-Merged 3D Moorti (360°)'}</span>
          </div>
          <button
            onClick={resetCamera}
            style={{
              padding: '6px 14px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              pointerEvents: 'auto',
              fontSize: '0.78rem',
              fontWeight: 600,
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold-color)'; e.currentTarget.style.color = 'var(--gold-color)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          >
            <RotateCcw size={13} />
            Reset View
          </button>
        </div>
      )}

      {/* Fallback notice */}
      {!loading && isUsingFallback && (
        <div style={{
          marginTop: '10px',
          padding: '10px 14px',
          backgroundColor: 'rgba(212, 175, 55, 0.06)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: '8px',
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
        }}>
          <AlertCircle size={16} color="var(--gold-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
            <strong>Upload Guide:</strong> Place your model at{' '}
            <code>/public/assets/models/{fallbackType === 'ganesha' ? 'ganesh.glb' : 'krishna.glb'}</code> and texture at{' '}
            <code>/public/assets/textures/{fallbackType === 'ganesha' ? 'ganesh.jpg' : 'krishna.jpg'}</code>
          </p>
        </div>
      )}
    </div>
  );
};
