import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sculptureType: 'ganesha',
    sculptureSize: '3ft',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setFormSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      sculptureType: 'ganesha',
      sculptureSize: '3ft',
      details: ''
    });
    setFormSubmitted(false);
  };

  return (
    <div className="animate-fade-in section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="badge" style={{ backgroundColor: 'rgba(224, 122, 127, 0.15)', color: 'var(--primary-dark)' }}>Commission Hub</div>
        <h2 className="section-title">Initiate a Commission</h2>
        <p className="section-subtitle">
          Whether seeking an idol for a home shrine or an architectural temple installation, share your vision and our sculptors will carve it to life.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '4rem',
          alignItems: 'start',
          textAlign: 'left',
          marginTop: '2rem',
        }} className="contact-grid">
          
          {/* Inquiry Form */}
          <div className="glass-panel" style={{
            padding: '3rem',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            position: 'relative',
          }}>
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }} className="form-row-2">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Aravind Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input" 
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. aravind@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input" 
                    />
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }} className="form-row-2">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input" 
                    />
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Sculpture Subject</label>
                    <select 
                      value={formData.sculptureType}
                      onChange={(e) => setFormData({ ...formData, sculptureType: e.target.value })}
                      className="form-input"
                      style={{ height: '49px' }}
                    >
                      <option value="ganesha">Lord Ganesha</option>
                      <option value="radha_krishna">Radha Krishna</option>
                      <option value="hanuman">Lord Hanuman</option>
                      <option value="shiva">Lord Shiva</option>
                      <option value="custom">Other Deity (Custom Request)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Size / Height</label>
                  <select 
                    value={formData.sculptureSize}
                    onChange={(e) => setFormData({ ...formData, sculptureSize: e.target.value })}
                    className="form-input"
                  >
                    <option value="1.5ft">1.5 Feet (Perfect for home altars)</option>
                    <option value="2.5ft">2.5 Feet (Medium temple size)</option>
                    <option value="3ft">3.0 Feet (Traditional standard size)</option>
                    <option value="4ft">4.0 Feet (Large altar/foyer display)</option>
                    <option value="5ft+">5.0 Feet + (Monumental / Temple Sanctuary)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Custom Specifications & Iconography Notes</label>
                  <textarea 
                    placeholder="Describe posture, hand attributes, specific marble preferences, paint/gold leaf details, or shrine placement guidelines..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ alignSelf: 'flex-start', display: 'flex', gap: '8px', alignItems: 'center' }}
                >
                  <Send size={16} />
                  Submit Inquiry
                </button>
              </form>
            ) : (
              /* Success Overlay */
              <div style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                animation: 'fadeIn 0.5s ease-out',
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--gold-color)',
                  color: 'var(--gold-color)',
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>
                    Inquiry Received
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
                    Namaste, {formData.name}. We have registered your commission request for a <strong>{formData.sculptureSize} {formData.sculptureType.replace('_', ' ')} Moorti</strong>. Our chief Silpin will review the specifications and contact you within 24 hours.
                  </p>
                </div>
                <button 
                  onClick={handleReset}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.6rem 1.5rem' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>

          {/* Contact Details & Info Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-panel" style={{
              padding: '2.5rem',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
            }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>
                Visit Our Jaipur Atelier
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Clients are welcome to visit our workshop in the heart of Jaipur to select marble blocks in person and inspect ongoing chiseling.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-color)',
                    flexShrink: 0,
                  }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.95rem', marginBottom: '2px' }}>Atelier Location</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Sculptors Street, Khajane Walon Ka Rasta, Jaipur, Rajasthan 302001
                    </span>
                  </div>
                </li>

                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-color)',
                    flexShrink: 0,
                  }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.95rem', marginBottom: '2px' }}>Direct Phone</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      +91 141 2345 6789 / +91 98290 12345
                    </span>
                  </div>
                </li>

                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-color)',
                    flexShrink: 0,
                  }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.95rem', marginBottom: '2px' }}>Atelier Email</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      atelier@moortidifferentiator.com
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Cultural Note */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(212, 175, 55, 0.04)',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <Sparkles size={24} color="var(--gold-color)" style={{ flexShrink: 0 }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                <strong>Vastu & Temple Design:</strong> If required, our chief sculptor can coordinate directly with your temple Vastu architect to ensure the pedestal (asana) height and exact deity gaze vectors align with Vastu layouts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
          .form-row-2 {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .form-row-2 {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
};
