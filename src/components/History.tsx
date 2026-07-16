import React, { useState } from 'react';
import { Layers, Feather, Hammer, Compass, Sun, Palette } from 'lucide-react';

interface SculptingStep {
  title: string;
  hindiTitle: string;
  icon: React.ReactNode;
  shortDesc: string;
  detailedDesc: string;
  craftDetails: string;
}

export const History: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: SculptingStep[] = [
    {
      title: "Block Selection",
      hindiTitle: "पत्थर चुनाव (Patthar Chunav)",
      icon: <Layers size={24} />,
      shortDesc: "Sourcing the pristine white Makrana marble.",
      detailedDesc: "The process begins at the historical quarries of Makrana, Rajasthan. The sculptor personally selects block of marble, checking for consistency, sound resonance (tapping the marble to listen for internal cracks), and minimal grey veins to ensure a pure white surface.",
      craftDetails: "Makrana marble is 98% calcium carbonate, allowing it to take a high degree of polish and shine, which matures and becomes more lustrous over time."
    },
    {
      title: "Drafting",
      hindiTitle: "लिखाई (Likhai)",
      icon: <Feather size={24} />,
      shortDesc: "Sketching proportional guidelines onto the stone.",
      detailedDesc: "Using charcoal grids or red oxide paint (geru), the master craftsman drafts the proportional guidelines of the deity directly onto the raw marble block. These proportions follow the sacred ratios defined in ancient Shilpa Shastra manuscripts.",
      craftDetails: "Every divine figure has specific dimensional rules. For example, a standing Vishnu is usually 'Nav-Tala' (9 heads tall), while Ganesha has distinct spherical geometries."
    },
    {
      title: "Rough Carving",
      hindiTitle: "घड़ाई (Ghadai)",
      icon: <Hammer size={24} />,
      shortDesc: "Chiseling the broad silhouette of the sculpture.",
      detailedDesc: "Using heavy steel chisels (taanki) and iron mallets (hathoda), the artisan chips away substantial portions of waste marble. The sculptor works from the front, sides, and back simultaneously, slowly establishing the basic silhouette of the figure.",
      craftDetails: "This is physically demanding and high-risk. A single misplaced strike can fracture the stone, ruining months of planning."
    },
    {
      title: "Fine Carving",
      hindiTitle: "चिंताई (Chitai)",
      icon: <Compass size={24} />,
      shortDesc: "Carving expressions, drapery, and details.",
      detailedDesc: "As the shape emerges, the craftsman switches to finer, pointed chisels and hand drills. They carve the delicate curves of the face, hands, feet, drapery folds, and ornamental crowns, giving the deity its expression and grace.",
      craftDetails: "In this phase, the expression of the face (the 'Bhaav') is sculpted. The eyes are considered the final, most delicate step of fine carving before polishing."
    },
    {
      title: "Marble Polishing",
      hindiTitle: "घिसाई (Ghisai)",
      icon: <Sun size={24} />,
      shortDesc: "Sanding to reveal the glass-like Makrana shine.",
      detailedDesc: "Carving leaves the marble rough and dusty. In Ghisai, the sculpture is rubbed with progressively finer abrasive blocks (batti) and water. This manual sanding takes days, slowly smoothing out chisel marks and bringing out the natural crystalline white glaze of the marble.",
      craftDetails: "No chemical glazes are used; the incredible gloss is achieved purely through friction, water, and micro-sanding."
    },
    {
      title: "Gold & Paint Details",
      hindiTitle: "सोना काम व रंगाई (Sona Kaam & Rangai)",
      icon: <Palette size={24} />,
      shortDesc: "Applying 24k gold leaf and natural colors.",
      detailedDesc: "In the final stage, the sculpture is adorned. Master painters apply real 24k gold leaf (Sona Kaam) to the crowns, jewelry, and border lines. Traditional natural pigments or fine acrylics are used to paint the eyes, hair, and clothing details, bringing the idol to life.",
      craftDetails: "Gold leafing is done using specialized tools: a fine squirrel-hair brush is statically charged to lift and lay down the ultra-thin gold sheets onto a resin adhesive layer."
    }
  ];

  return (
    <div className="animate-fade-in section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="badge" style={{ backgroundColor: 'rgba(224, 122, 127, 0.15)', color: 'var(--primary-dark)' }}>Heritage Craft</div>
        <h2 className="section-title">The Jaipur Sculpting Artistry</h2>
        <p className="section-subtitle">
          Explore the traditional 6-stage sculpting process through which a block of raw marble is chiseled into a sacred masterpiece.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          marginTop: '2rem',
        }} className="history-layout">
          {/* Timeline tabs navigation */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            gap: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-color)',
          }} className="timeline-tabs">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 1.5rem',
                    backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--gold-color)' : 'transparent',
                    borderRadius: '12px',
                    color: isActive ? 'var(--gold-color)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    minWidth: '150px',
                    flexShrink: 0,
                    transition: 'var(--transition-smooth)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--primary-dark)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.15)' : 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition-fast)',
                  }}>
                    {step.icon}
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Step 0{index + 1}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active step detail showcase */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            alignItems: 'center',
          }} className="step-content-grid">
            
            {/* Step Text Details */}
            <div className="glass-panel" style={{
              padding: '3rem',
              borderRadius: '20px',
              textAlign: 'left',
              border: '1px solid var(--border-color)',
              animation: 'fadeIn 0.5s ease-out',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{
                  fontSize: '1rem',
                  color: 'var(--primary-color)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  Stage 0{activeStep + 1} of 06
                </span>
                <span style={{
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--gold-color)',
                  fontStyle: 'italic',
                }}>
                  {steps[activeStep].hindiTitle}
                </span>
              </div>

              <h3 style={{
                fontSize: '2.2rem',
                color: 'var(--primary-dark)',
                marginBottom: '1rem',
              }}>
                {steps[activeStep].title}
              </h3>
              
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
                fontWeight: 400,
                lineHeight: 1.7,
              }}>
                {steps[activeStep].detailedDesc}
              </p>

              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(212, 175, 55, 0.05)',
                borderLeft: '4px solid var(--gold-color)',
                borderRadius: '0 8px 8px 0',
              }}>
                <h4 style={{
                  color: 'var(--gold-color)',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                }}>
                  Artisan Secret / Fact
                </h4>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {steps[activeStep].craftDetails}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .timeline-tabs::-webkit-scrollbar {
          height: 6px;
        }
        .timeline-tabs::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .timeline-tabs::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 3px;
        }
        
        @media (min-width: 992px) {
          .timeline-tabs {
            flex-direction: column !important;
            border-bottom: none !important;
            border-right: 1px solid var(--border-color);
            padding-bottom: 0 !important;
            padding-right: 2rem;
            overflow-y: auto;
            max-height: 480px;
          }
          .history-layout {
            grid-template-columns: 250px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
