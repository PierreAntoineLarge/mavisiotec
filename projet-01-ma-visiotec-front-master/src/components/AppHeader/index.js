import { useState, useEffect, useRef } from 'react';
import './appheader.scss';
import AppHeaderNav from './AppHeaderNav/AppHeaderNav';

// == Composant
function AppHeader() {
  const [isHidden, setIsHidden] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position
      const currentScrollY = window.scrollY;
      // Check if current scroll is superior than previous and if current is superior than 0
      // If yes, setheader to be hidden
      if (prevScrollY.current < currentScrollY && currentScrollY > 0) {
        setIsHidden(true);
      }
      else {
        setIsHidden(false);
      }
      // Update previous scroll position
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`primary-header ${isHidden ? 'hidden' : ''}`}>
      <div className="container">
        <AppHeaderNav />
      </div>
    </header>
  );
}

// == Export
export default AppHeader;
