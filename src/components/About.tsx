import React from 'react';
import { Compass, Heart, Award, ArrowRight } from 'lucide-react';

interface AboutProps {
  setActivePage: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ setActivePage }) => {
  return (
    <div className="animate-fade-in section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="badge" style={{ backgroundColor: 'rgba(224, 122, 127, 0.15)', color: 'var(--primary-dark)' }}>The Atelier</div>
        <h2 className="section-title">The Jaipur Heritage</h2>
        <p className="section-subtitle">
          Moorti by The Differentiator is committed to preserving the ancient heritage of Jaipur stone sculpting while delivering elite museum-grade masterworks.
        </p>

        {/* Story Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '4rem',
          alignItems: 'center',
          textAlign: 'left',
          marginBottom: '5rem',
        }} className="about-grid">
          {/* Text Content */}
          <div>
            <h3 style={{
              fontSize: '2rem',
              color: 'var(--primary-dark)',
              fontFamily: 'var(--font-serif)',
              marginBottom: '1.5rem',
            }}>
              Born in the Pink City
            </h3>
            
            <p style={{
              color: 'var(--text-primary)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '1.25rem',
            }}>
              Jaipur's association with marble sculpting dates back to 1727 when Maharaja Sawai Jai Singh II founded the city. He invited master sculptors (Silpakarms) from across northern India to establish their workshops in Jaipur, dedicating entire streets—like the famous <em>Khajane Walon Ka Rasta</em>—to their sacred trade.
            </p>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.6,
              marginBottom: '1.25rem',
            }}>
              At Moorti by The Differentiator, we support these multi-generational artisan families. Each carving chisel stroke carries the memory of ancestors who built the palaces, temples, and cenotaphs of Rajasthan.
            </p>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}>
              We do not mass-produce. We believe every divine form has a unique soul waiting to be uncovered from the marble block. Hence, we limit our atelier's output to only a handful of commission projects each year, ensuring unmatched detail and energetic purity.
            </p>

            <button 
              onClick={() => setActivePage('contact')}
              className="btn btn-primary"
            >
              Commission a Sculpture
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Sourcing Highlight Panel */}
          <div className="glass-panel" style={{
            padding: '3rem',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            backgroundImage: 'linear-gradient(135deg, rgba(224, 122, 127, 0.03), rgba(212, 175, 55, 0.03))',
          }}>
            <h4 style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--gold-color)',
              fontSize: '1.4rem',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              The Makrana Legacy
            </h4>
            <p style={{
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}>
              All our sculptures are chiseled from pure Makrana marble, sourced directly from the historic quarries of Nagaur, Rajasthan. Famous worldwide as the stone used to build the Taj Mahal and Victoria Memorial, Makrana marble has a tightly interlocking crystalline structure that:
            </p>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              textAlign: 'left',
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
            }}>
              {[
                { title: "Translucency", desc: "Allows light to penetrate slightly beneath the surface, giving the sculpture a lifelike glow." },
                { title: "Ageless Luster", desc: "Never yellowing or degrading, it grows more brilliant and smooth as it is touched during worship." },
                { title: "Carving Density", desc: "Supports extremely thin details and drapery folds without fracturing." }
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: 'var(--gold-color)', fontWeight: 'bold' }}>&#10003;</span>
                  <span><strong>{item.title}:</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quality Values Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
        }}>
          {[
            {
              icon: <Award size={24} color="var(--gold-color)" />,
              title: "Museum-Grade Art",
              desc: "Carvings of unparalleled precision, suitable for temples, luxury estates, and public installations."
            },
            {
              icon: <Compass size={24} color="var(--gold-color)" />,
              title: "Shastra Sanctity",
              desc: "Proportions verified by traditional Shilpins to ensure full alignment with ritual guidelines."
            },
            {
              icon: <Heart size={24} color="var(--gold-color)" />,
              title: "Artisan Welfare",
              desc: "We ensure over 70% of commission proceeds go directly to the sculptors who carve the marble."
            }
          ].map((val, idx) => (
            <div 
              key={idx}
              className="glass-panel"
              style={{
                padding: '2rem',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
              }}>
                {val.icon}
              </div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                {val.title}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </div>
  );
};
