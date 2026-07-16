import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { LandingIntro } from './components/LandingIntro';
import { History } from './components/History';
import { Collection } from './components/Collection';
import { About } from './components/About';
import { Contact } from './components/Contact';

function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [displayPage, setDisplayPage] = useState<string>('home');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handlePageChange = (newPage: string) => {
    if (newPage === displayPage) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setDisplayPage(newPage);
      setActivePage(newPage);
      setIsTransitioning(false);
      window.scrollTo({ top: 0 });
    }, 350);
  };

  const renderActivePage = () => {
    switch (displayPage) {
      case 'home':
        return <Home setActivePage={handlePageChange} />;
      case 'history':
        return <History />;
      case 'collection':
        return <Collection />;
      case 'about':
        return <About setActivePage={handlePageChange} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActivePage={handlePageChange} />;
    }
  };

  return (
    <>
      <LandingIntro />
      {/* Pinned under the intro veil so the hero stays fixed during greetings + fade */}
      <div id="site-shell" className="site-shell">
        <Header activePage={activePage} setActivePage={handlePageChange} />

        <main
          className={`main-content ${isTransitioning ? 'page-transition-exit-active' : 'page-transition-enter-active'}`}
          style={{
            minHeight: '80vh',
            transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'scale(0.99) translateY(8px)' : 'scale(1) translateY(0)',
          }}
        >
          {renderActivePage()}
        </main>

        <Footer setActivePage={handlePageChange} />
      </div>
    </>
  );
}

export default App;
