import './mobile-nav-toggle.scss';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMobileNavOpen, mobileNavClose } from '../../../../actions/buttons';

function MobileNavToggle() {
  const isOpen = useSelector((state) => state.buttons.isMobileNavOpen);
  const dispatch = useDispatch();

  let cssClass = 'menu-toggle-button';
  let ariaExpanded = 'false';
  if (isOpen) {
    cssClass += ' menu-toggle-button--open';
    ariaExpanded = 'true';
  }

  const buttonRef = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (!buttonRef.current.contains(event.target)) {
        dispatch(mobileNavClose());
      }
    };
    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={cssClass}
      aria-controls="primary-navigation"
      aria-expanded={ariaExpanded}
      type="button"
      onClick={() => {
        dispatch(toggleMobileNavOpen());
      }}
    >
      <svg
        className="menu-toggle-icon"
        viewBox="0 0 100 100"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect className="line top" width="80" height="10" x="10" y="18" rx="5" />
        <rect className="line middle" width="80" height="10" x="10" y="45" rx="5" />
        <rect className="line bottom" width="80" height="10" x="10" y="72" rx="5" />
      </svg>
    </button>
  );
}

// MobileNavToggle.propTypes = {
//   handleButton: PropTypes.func.isRequired,
// };

// == Export
export default MobileNavToggle;
