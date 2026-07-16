import React from 'react';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      color: 'var(--text-secondary)',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem',
      }}>
        {/* Brand Column */}
        <div>
          <div 
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              cursor: 'pointer',
              display: 'inline-flex',
              flexDirection: 'column',
              marginBottom: '1rem',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--primary-dark)',
              lineHeight: 1.1,
            }}>
              MOORTI
            </span>
            <span style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: 'var(--gold-color)',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              by The Differentiator
            </span>
          </div>
          <p style={{
            fontSize: '0.9rem',
            lineHeight: '1.6',
            color: 'var(--text-muted)',
            marginTop: '0.5rem',
          }}>
            Handcrafting divine marble sculptures in Jaipur since generations. We combine legendary Makrana marble with traditional sculpting shastras to create timeless masterworks.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-primary)',
            fontSize: '1.2rem',
            marginBottom: '1.5rem',
            position: 'relative',
            paddingBottom: '0.5rem',
          }}>
            Navigation
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '30px',
              height: '2px',
              backgroundColor: 'var(--gold-color)',
            }} />
          </h4>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            padding: 0,
          }}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'history', label: 'Carving History' },
              { id: 'collection', label: 'Masterworks Collection' },
              { id: 'about', label: 'Artisan Heritage' },
              { id: 'contact', label: 'Commission Inquiry' },
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => {
                    setActivePage(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'var(--transition-fast)',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--gold-color)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-primary)',
            fontSize: '1.2rem',
            marginBottom: '1.5rem',
            position: 'relative',
            paddingBottom: '0.5rem',
          }}>
            The Atelier
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '30px',
              height: '2px',
              backgroundColor: 'var(--gold-color)',
            }} />
          </h4>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: 0,
            fontSize: '0.9rem',
          }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <MapPin size={18} color="var(--gold-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                Khajane Walon Ka Rasta, Bhindon Ka Rasta, Jaipur, Rajasthan 302001, India
              </span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Phone size={18} color="var(--gold-color)" />
              <span>+91 141 2345 6789</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={18} color="var(--gold-color)" />
              <span>atelier@moortidifferentiator.com</span>
            </li>
          </ul>
        </div>

        {/* Social Column */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-primary)',
            fontSize: '1.2rem',
            marginBottom: '1.5rem',
            position: 'relative',
            paddingBottom: '0.5rem',
          }}>
            Follow the Art
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '30px',
              height: '2px',
              backgroundColor: 'var(--gold-color)',
            }} />
          </h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.2rem' }}>
            Watch behind-the-scenes chisel carving videos and workshop highlights.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-color)';
                e.currentTarget.style.color = 'var(--gold-color)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-color)';
                e.currentTarget.style.color = 'var(--gold-color)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom" style={{
        borderTop: '1px solid var(--border-color)',
        paddingTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        justifyContent: 'space-between',
        fontSize: '0.85rem',
      }}>
        <p>&copy; {currentYear} Moorti by The Differentiator. All rights reserved.</p>
        <p style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          color: 'var(--text-muted)',
        }}>
          Handcrafted in Jaipur with <Heart size={12} color="var(--primary-color)" fill="var(--primary-color)" /> by The Differentiator team.
        </p>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row !important;
          }
        }
      `}</style>
    </footer>
  );
};
