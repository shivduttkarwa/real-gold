import { useState, useEffect } from "react";
import "./Menu.css";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <div className="hamburger-box">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </button>

      {/* Overlay Menu */}
      <nav className={`overlay-menu ${isOpen ? "active" : ""}`}>
        {/* Animated Background Panels */}
        <div className="menu-bg">
          <div className="menu-bg-panel"></div>
          <div className="menu-bg-panel"></div>
          <div className="menu-bg-panel"></div>
          <div className="menu-bg-panel"></div>
        </div>

        <div className="menu-content">
          {/* Navigation */}
          <div className="menu-main">
            <ul className="menu-nav">
              <li className="menu-item">
                <a href="#" className="menu-link" onClick={closeMenu}>
                  <span className="menu-number">01</span>
                  <span className="menu-text">Home</span>
                  <svg
                    className="menu-arrow"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link" onClick={closeMenu}>
                  <span className="menu-number">02</span>
                  <span className="menu-text">Projects</span>
                  <svg
                    className="menu-arrow"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link" onClick={closeMenu}>
                  <span className="menu-number">03</span>
                  <span className="menu-text">About</span>
                  <svg
                    className="menu-arrow"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link" onClick={closeMenu}>
                  <span className="menu-number">04</span>
                  <span className="menu-text">Services</span>
                  <svg
                    className="menu-arrow"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link" onClick={closeMenu}>
                  <span className="menu-number">05</span>
                  <span className="menu-text">Contact</span>
                  <svg
                    className="menu-arrow"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Aside Info */}
          <aside className="menu-aside">
            <div>
              <div className="menu-info-block">
                <div className="menu-info-label">Location</div>
                <p className="menu-info-text">
                  123 Creative Avenue
                  <br />
                  New York, NY 10001
                </p>
              </div>

              <div className="menu-info-block">
                <div className="menu-info-label">Contact</div>
                <p className="menu-info-text">
                  <a href="mailto:hello@realgoldproperties.com">
                    hello@realgoldproperties.com
                  </a>
                  <br />
                  <a href="tel:+12345678900">+1 234 567 8900</a>
                </p>
              </div>
            </div>

            <div className="menu-social">
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
              <a href="#">Dribbble</a>
              <a href="#">LinkedIn</a>
            </div>
          </aside>
        </div>

        {/* Decorative Element */}
        <div className="menu-deco">
          <span className="menu-deco-line"></span>
          <span className="menu-deco-dot"></span>
          <span className="menu-deco-line"></span>
        </div>
      </nav>
    </>
  );
}
