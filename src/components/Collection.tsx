import React, { useState } from 'react';
import { ThreeViewer } from './ThreeViewer';
import { ArrowLeft, Play, Sparkles, Box, User, FileSpreadsheet, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  hindiName: string;
  shortDesc: string;
  longDesc: string;
  mainImage: string;
  gallery: string[];
  videoUrl: string;
  modelPath: string;
  fallbackType: 'ganesha' | 'radha_krishna';
  specs: {
    material: string;
    height: string;
    weight: string;
    finish: string;
    paintingStyle: string;
    sculptor: string;
    carvingTime: string;
  };
}

export const Collection: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [load3D, setLoad3D] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  const products: Product[] = [
    {
      id: "ganesha",
      name: "Tejas Ganesha Moorti",
      hindiName: "तेजस गणेश मूर्ति",
      shortDesc: "Prasthana Ganesha chiseled from single-block white Makrana marble with 24k gold leaf ornamentation.",
      longDesc: "Carved under strict compliance of the Ganesha Upanishad, the Tejas Ganesha Moorti showcases a sitting Lambodara posture. The statue features four arms holding the traditional attributes: a noose, elephant goad, broken tusk, and a bowl of sweet modakas. The surface is hand-sanded for over 80 hours to achieve an ultra-smooth marble texture, adorned with real 24k gold leaf highlighting his crown (mukut), sacred ornaments, and drapery borders.",
      mainImage: "./assets/images/ganesha.png",
      gallery: [
        "./assets/images/ganesha.png"
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hand-carving-a-stone-sculpture-40898-large.mp4", // Premium sample stone carving loop
      modelPath: "./assets/models/ganesh_merged-optimized.glb",
      fallbackType: "ganesha",
      specs: {
        material: "AAA Grade White Makrana Marble",
        height: "30 inches (2.5 feet)",
        weight: "72 kg",
        finish: "Mirror-Polished (Ghisai Finish)",
        paintingStyle: "Traditional Jaipur Gold Leaf Embellishment",
        sculptor: "Pandit Rajkumar Sharma & Sons",
        carvingTime: "45 Days of Manual Crafting"
      }
    },
    {
      id: "radha_krishna",
      name: "Ananda Krishna Moorti",
      hindiName: "आनंद कृष्ण मूर्ति",
      shortDesc: "Divine Lord Krishna sculpted in single-block white Makrana marble with traditional hand-painting and gold details.",
      longDesc: "Representing the ultimate divine plays (celestial leelas), the Ananda Krishna Moorti is chiseled from a single block of pure Makrana marble. Krishna stands in a graceful Tribhanga (three-bend) posture playing his celestial flute with a peacock carved by his side. The statue is adorned with fine jewelry carvings and painted by Jaipur miniature artists using natural color highlights and fine real gold line borders.",
      mainImage: "./assets/images/krishna.png",
      gallery: [
        "./assets/images/krishna.png"
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-artist-painting-details-on-a-clay-statue-41712-large.mp4", // Premium painting detail loop
      modelPath: "./assets/models/krishna_merged-optimized.glb",
      fallbackType: "radha_krishna",
      specs: {
        material: "Premium Single-Block Statuario Makrana Marble",
        height: "36 inches (3.0 feet)",
        weight: "95 kg",
        finish: "Eggshell Satin Polish with traditional Jaipur painting",
        paintingStyle: "Jaipur Miniature & Gold Border Lining Style",
        sculptor: "Ustad Mukhtar Ali & Family",
        carvingTime: "60 Days of Precision Carving"
      }
    }
  ];

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setActiveImageIndex(0);
    setLoad3D(false);
    setIsVideoPlaying(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
    setLoad3D(false);
    setIsVideoPlaying(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in section" style={{ paddingTop: '120px' }}>
      <div className="container">
        {/* LIST VIEW */}
        {!selectedProduct ? (
          <div>
            <div className="badge">Masterwork Series</div>
            <h2 className="section-title">The Masterpieces</h2>
            <p className="section-subtitle">
              We focus on absolute quality over quantity. Explore our two masterworks currently available for custom commission.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              maxWidth: '1000px',
              margin: '0 auto',
            }} className="products-list-grid">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="glass-panel"
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    transition: 'var(--transition-smooth)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                  onClick={() => handleProductSelect(product.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold-color)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 var(--glass-shadow)';
                  }}
                >
                  <div style={{
                    height: '420px',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#0c0e12'
                  }}>
                    <img 
                      src={product.mainImage} 
                      alt={product.name} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                      }}
                      className="product-card-img"
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(14,17,21,0.9), transparent)',
                      padding: '2rem 1.5rem 1.5rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-color)', fontWeight: 700 }}>
                          {product.specs.material.split(' ')[1] || 'Marble'}
                        </span>
                        <h3 style={{ color: 'white', fontSize: '1.5rem', margin: '4px 0 0 0' }}>
                          {product.name}
                        </h3>
                      </div>
                      <span style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--gold-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'black',
                        transition: 'var(--transition-fast)',
                      }} className="card-arrow-btn">
                        <Eye size={20} />
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                      {product.shortDesc}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      <span>Height: {product.specs.height}</span>
                      <span>&bull;</span>
                      <span>Crafting: {product.specs.carvingTime.split(' ')[0]} Days</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* DETAILS VIEW */
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            {/* Back Button */}
            <button 
              onClick={handleBackToList}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '2.5rem',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-color)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <ArrowLeft size={18} />
              Back to Collection
            </button>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '4rem',
              textAlign: 'left',
            }} className="details-grid">
              
              {/* Left Column: Image/Viewer Media */}
              <div>
                {!load3D ? (
                  /* Standard Image Gallery / Video Showcase */
                  <div style={{ position: 'relative' }}>
                    {/* Main Image display */}
                    <div style={{
                      width: '100%',
                      height: '500px',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: '1px solid var(--border-color)',
                      position: 'relative',
                      backgroundColor: '#0c0e12',
                    }}>
                      {isVideoPlaying ? (
                        <video 
                          src={selectedProduct.videoUrl} 
                          controls 
                          autoPlay 
                          loop 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <img 
                          src={selectedProduct.gallery[activeImageIndex]} 
                          alt={selectedProduct.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      )}

                      {/* Video Play Overlay Button */}
                      {!isVideoPlaying && (
                        <button
                          onClick={() => setIsVideoPlaying(true)}
                          style={{
                            position: 'absolute',
                            bottom: '20px',
                            right: '20px',
                            padding: '10px 20px',
                            backgroundColor: 'rgba(14, 17, 21, 0.85)',
                            border: '1px solid var(--gold-color)',
                            borderRadius: '30px',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                            transition: 'var(--transition-fast)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <Play size={16} fill="var(--gold-color)" color="var(--gold-color)" />
                          Watch Detail Video
                        </button>
                      )}

                      {/* Video Close Button */}
                      {isVideoPlaying && (
                        <button
                          onClick={() => setIsVideoPlaying(false)}
                          style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            padding: '6px 12px',
                            backgroundColor: 'rgba(14, 17, 21, 0.85)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '20px',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                          }}
                        >
                          Close Video
                        </button>
                      )}
                    </div>

                    {/* Gallery Thumbnails */}
                    {!isVideoPlaying && (
                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '1.25rem',
                      }}>
                        {selectedProduct.gallery.map((imgUrl, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveImageIndex(idx);
                              setIsVideoPlaying(false);
                            }}
                            style={{
                              width: '90px',
                              height: '90px',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              border: '2px solid',
                              borderColor: activeImageIndex === idx ? 'var(--gold-color)' : 'var(--border-color)',
                              cursor: 'pointer',
                              padding: 0,
                              backgroundColor: '#0c0e12',
                              transition: 'var(--transition-fast)',
                            }}
                          >
                            <img src={imgUrl} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* 3D Model WebGL Viewer */
                  <div>
                    <ThreeViewer 
                      modelPath={selectedProduct.modelPath}
                      fallbackType={selectedProduct.fallbackType}
                    />
                    <button
                      onClick={() => setLoad3D(false)}
                      style={{
                        marginTop: '1rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-dark)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      <ArrowLeft size={12} /> Return to Photo Gallery
                    </button>
                  </div>
                )}

                {/* Interactive Mode CTA */}
                {!load3D && (
                  <div style={{
                    marginTop: '2rem',
                    padding: '2rem',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.25rem',
                    textAlign: 'center',
                  }} className="interactive-3d-box">
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                        Inspect Sculpture in 360&deg;
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                        Load the interactive 3D model with merged high-resolution textures to view fine details from all angles.
                      </p>
                    </div>
                    <button
                      onClick={() => setLoad3D(true)}
                      className="btn btn-gold"
                      style={{ animation: 'goldPulse 2s infinite' }}
                    >
                      <Box size={18} />
                      Load 3D Model
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Descriptions & Details */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="badge" style={{ marginBottom: 0 }}>Jaipur Heritage Work</span>
                  <span style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--gold-color)', fontFamily: 'var(--font-serif)' }}>
                    {selectedProduct.hindiName}
                  </span>
                </div>
                
                <h2 style={{ fontSize: '2.8rem', color: 'var(--primary-dark)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                  {selectedProduct.name}
                </h2>

                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: 'var(--text-primary)',
                  marginBottom: '2rem',
                }}>
                  {selectedProduct.longDesc}
                </p>

                {/* Specs Table */}
                <div className="glass-panel" style={{
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  marginBottom: '2.5rem',
                }}>
                  <div style={{
                    padding: '1.2rem 1.5rem',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <FileSpreadsheet size={16} color="var(--gold-color)" />
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
                      Sculpture Specifications
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                      { icon: <Box size={14} />, label: "Material", val: selectedProduct.specs.material },
                      { icon: <Box size={14} />, label: "Dimensions", val: selectedProduct.specs.height },
                      { icon: <Box size={14} />, label: "Net Weight", val: selectedProduct.specs.weight },
                      { icon: <Box size={14} />, label: "Finish Quality", val: selectedProduct.specs.finish },
                      { icon: <Box size={14} />, label: "Painting Style", val: selectedProduct.specs.paintingStyle },
                      { icon: <User size={14} />, label: "Master Sculptor", val: selectedProduct.specs.sculptor },
                    ].map((spec, sIdx) => (
                      <div 
                        key={sIdx}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '150px 1fr',
                          padding: '1rem 1.5rem',
                          borderBottom: sIdx === 5 ? 'none' : '1px solid var(--border-color)',
                          fontSize: '0.9rem',
                        }}
                      >
                        <span style={{ color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {spec.icon}
                          {spec.label}
                        </span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                          {spec.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commission CTA */}
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(224, 122, 127, 0.05)',
                  border: '1px dashed rgba(224, 122, 127, 0.3)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}>
                  <Sparkles size={20} color="var(--primary-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h5 style={{ color: 'var(--primary-dark)', fontSize: '1rem', marginBottom: '0.25rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                      Interested in commissioning this masterwork?
                    </h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      Each statue is hand-carved to order. Custom sizes (from 1 ft to 8 ft) and specific iconography layouts can be accommodated upon request.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 992px) {
          .details-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
          .interactive-3d-box {
            flex-direction: row !important;
            text-align: left !important;
            justify-content: space-between !important;
          }
        }
      `}</style>
    </div>
  );
};
