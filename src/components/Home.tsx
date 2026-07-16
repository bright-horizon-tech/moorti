import React from 'react';
import { Compass, Sparkles, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

interface HomeProps {
  setActivePage: (page: string) => void;
}

// Hawa Mahal hero background with visual effects
const JaipurHeroBg: React.FC = () => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    <img
      src="./assets/images/Hava mahal.png"
      alt=""
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        opacity: 0.88,
        filter: 'brightness(1.12) contrast(1.05) saturate(1.2) sepia(0.08) hue-rotate(-8deg)',
      }}
    />
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(160deg, hsl(38, 50%, 52%) 0%, hsl(22, 48%, 54%) 55%, hsl(38, 55%, 48%) 100%)',
      mixBlendMode: 'multiply',
      opacity: 0.28,
    }} />
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(160deg, rgba(255,210,90,0.28) 0%, rgba(220,140,70,0.12) 55%, rgba(255,200,80,0.32) 100%)',
      mixBlendMode: 'screen',
      opacity: 0.85,
    }} />
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(20,10,5,0.32) 100%)',
    }} />
    <div style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '45%',
      background: 'linear-gradient(to bottom, rgba(40,25,15,0) 0%, var(--bg-color, #f8efe6) 100%)',
    }} />
    <div style={{
      position: 'absolute',
      inset: 0,
      boxShadow: 'inset 0 0 140px rgba(255,200,80,0.22)',
    }} />
  </div>
);

export const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(160deg, hsl(38, 55%, 94%) 0%, hsl(353, 48%, 90%) 60%, hsl(38, 40%, 92%) 100%)',
        borderBottom: '1px solid var(--border-color)',
        paddingTop: '100px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}>
        {/* Rich architectural SVG background */}
        <JaipurHeroBg />

        {/* Gold corner accents */}
        <div style={{ position: 'absolute', top: '100px', left: '24px', width: '48px', height: '48px', borderLeft: '3px solid var(--gold-color)', borderTop: '3px solid var(--gold-color)', opacity: 0.7 }} className="hide-mobile" />
        <div style={{ position: 'absolute', bottom: '30px', right: '24px', width: '48px', height: '48px', borderRight: '3px solid var(--gold-color)', borderBottom: '3px solid var(--gold-color)', opacity: 0.7 }} className="hide-mobile" />

        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          position: 'relative',
          zIndex: 2,
        }}>
           <div className="badge animate-slide-up" style={{
             backgroundColor: 'rgba(212, 175, 55, 0.22)',
             color: 'hsl(42, 90%, 80%)',
             borderColor: 'rgba(212, 175, 55, 0.6)',
             textShadow: '0 1px 6px rgba(0,0,0,0.4)',
           }}>
            <Sparkles size={14} style={{ marginRight: '6px' }} />
            Jaipur Marble Masterpieces
          </div>
           
          <h1 className="animate-slide-up" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            maxWidth: '850px',
            textShadow: '0 2px 18px rgba(0,0,0,0.55)',
          }}>
            Where Sacred Devotion Meets{' '}
            <span
              style={{
                color: 'hsl(45, 100%, 58%)',
                textShadow:
                  '0 0 18px rgba(255, 200, 60, 0.55), 0 2px 12px rgba(0,0,0,0.45)',
              }}
            >
              Jaipur&apos;s Marble
            </span>{' '}
            Artistry
          </h1>
           
          <p className="animate-slide-up" style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: 'hsl(40, 25%, 92%)',
            maxWidth: '650px',
            marginBottom: '2.5rem',
            textShadow: '0 1px 10px rgba(0,0,0,0.5)',
          }}>
            Presenting highly refined Makrana marble moortis and deities, meticulously hand-chiseled by master sculptors of Jaipur. Experience divine beauty in 360 degrees.
          </p>
          
          <div className="animate-slide-up" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <button 
              onClick={() => setActivePage('collection')}
              className="btn btn-primary"
            >
              Explore Collection
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => setActivePage('history')}
              className="btn btn-secondary"
            >
              The Carving Legacy
            </button>
          </div>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="container">
          <div className="badge" style={{ backgroundColor: 'rgba(224, 122, 127, 0.15)', color: 'var(--primary-dark)' }}>Our Philosophy</div>
          <h2 className="section-title">The Differentiator Excellence</h2>
          <p className="section-subtitle">
            What makes our creations stand apart from mass-produced sculptures.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '1rem',
          }}>
            {[
              {
                icon: <ShieldCheck size={28} color="var(--primary-dark)" />,
                title: "100% Makrana Marble",
                desc: "We carve exclusively from the highest quality Makrana marble, famed for its brilliant white luster that lasts for centuries without yellowing."
              },
              {
                icon: <Compass size={28} color="var(--primary-dark)" />,
                title: "Shastra & Iconography Compliant",
                desc: "Every statue conforms perfectly to the strict dimensions and iconographical rules laid out in ancient Shilpa Shastras."
              },
              {
                icon: <HeartHandshake size={28} color="var(--primary-dark)" />,
                title: "Artisan-First Fair Trade",
                desc: "We support Jaipur's multi-generational sculptor families directly, preserving ancestral heritage while providing dignified livelihoods."
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="glass-panel"
                style={{
                  padding: '2.5rem 2rem',
                  borderRadius: '16px',
                  textAlign: 'left',
                  transition: 'var(--transition-smooth)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-surface)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'var(--gold-color)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(224, 122, 127, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 var(--glass-shadow)';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(224, 122, 127, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.4rem',
                  marginBottom: '0.8rem',
                }}>{feature.title}</h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection Teaser */}
      <section className="section" style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div className="container">
          <div className="badge" style={{ backgroundColor: 'rgba(224, 122, 127, 0.15)', color: 'var(--primary-dark)' }}>Featured Masterworks</div>
          <h2 className="section-title">The Divine Gallery</h2>
          <p className="section-subtitle">
            Preview our two premium Jaipur marble sculptures, complete with high-resolution image libraries and 360-degree models.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            maxWidth: '900px',
            margin: '0 auto',
          }} className="featured-grid">
            {/* Ganesha */}
            <div 
              className="glass-panel"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'var(--transition-smooth)',
                border: '1px solid var(--border-color)',
                textAlign: 'left',
                backgroundColor: 'var(--bg-color)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--primary-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <div style={{ height: '420px', overflow: 'hidden', position: 'relative', backgroundColor: '#eae6df' }}>
                <img 
                  src="./assets/images/ganesha.png" 
                  alt="Tejas Ganesha" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '4px 10px',
                  backgroundColor: 'var(--primary-dark)',
                  border: '1px solid var(--gold-color)',
                  borderRadius: '20px',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}>
                  3D View Available
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                  Tejas Ganesha Moorti
                </h3>
                <p style={{ color: 'var(--primary-dark)', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Makrana Marble &bull; 24K Gold Leafing &bull; 2.5 ft
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Carved from a single flawless block of Makrana white marble, featuring exquisite ornament carvings highlighted with genuine gold foil.
                </p>
                <button 
                  onClick={() => setActivePage('collection')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-dark)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: 0,
                  }}
                >
                  View Details & 3D Model <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Krishna */}
            <div 
              className="glass-panel"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'var(--transition-smooth)',
                border: '1px solid var(--border-color)',
                textAlign: 'left',
                backgroundColor: 'var(--bg-color)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--primary-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <div style={{ height: '420px', overflow: 'hidden', position: 'relative', backgroundColor: '#eae6df' }}>
                <img 
                  src="./assets/images/krishna.png" 
                  alt="Ananda Krishna Moorti" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '4px 10px',
                  backgroundColor: 'var(--primary-dark)',
                  border: '1px solid var(--gold-color)',
                  borderRadius: '20px',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}>
                  3D View Available
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                  Ananda Krishna Moorti
                </h3>
                <p style={{ color: 'var(--primary-dark)', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Statuario Marble &bull; Traditional Painting &bull; 3 ft
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  A magnificent single-block white marble representation of Lord Krishna playing his flute, hand-painted with detailed gold borders.
                </p>
                <button 
                  onClick={() => setActivePage('collection')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-dark)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: 0,
                  }}
                >
                  View Details & 3D Model <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Callout */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Jaipur Palace Arch Outline in Callout Background */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          opacity: 0.1,
          color: 'white',
          pointerEvents: 'none'
        }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%" fill="currentColor">
            <path d="M50 0 C22.4 0 0 22.4 0 50 L0 100 L100 100 L100 50 C100 22.4 77.6 0 50 0 Z" />
          </svg>
        </div>

        <div className="container" style={{
          maxWidth: '800px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <div className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid white' }}>The Legacy</div>
          <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem' }}>
            Unveiling Centuries of Chiseling Traditions
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Jaipur's marble sculpting is not just a profession—it is a spiritual discipline passed down through generations. Watch how a raw block of Makrana marble transforms step-by-step into a highly detailed deity.
          </p>
          <button 
            onClick={() => setActivePage('history')}
            className="btn"
            style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--primary-dark)', fontWeight: 700 }}
          >
            Explore Interactive Timeline
          </button>
        </div>
      </section>
    </div>
  );
};
