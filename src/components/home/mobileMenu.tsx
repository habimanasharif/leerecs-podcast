import React from 'react';
import Link from 'next/link';

const MobileMenu:React.FC<{ setMenu:any }> = ({ setMenu }:{ setMenu:any }) => {
    return (
        <div className="container" id="links" data-aos="zoom-out-up">
          <div className="nav" id="navigation">
            <div>
              <div className="link-address" id="home-link-top" onClick={setMenu}>
                <span className="number">/1</span>
                <span
                  className="
                actual-link "
                  id="home-link"
                >
                  <Link href="/login">Login</Link>{" "}
                </span>
              </div>
              <div
                className="link-address"
                id="projects-link-top"
                onClick={setMenu}
              >
                <span className="number">/2</span>
                <span className="actual-link" id="projects-link">
                  <Link href="/signup">Sign Up</Link>
                </span>
              </div>
    
              <div
                className="link-address"
                id="services-link-top"
                onClick={setMenu}
              >
                <span className="number">/3</span>
                <span className="actual-link" id="services-link">
                  <Link href="/request">Request Interview</Link>
                </span>
              </div>
              <div
                className="link-address"
                id="services-link-top"
                onClick={setMenu}
              >
                <span className="number">/4</span>
                <span className="actual-link" id="services-link">
                  <a href="#vent">Spotlight</a>
                </span>
              </div>
              
              <div className="link-address" id="cycle-link-top" onClick={setMenu}>
                <span className="number">/5</span>
                <span className="actual-link" id="cycle-link">
                  <Link href="/music">Music</Link>
                  
                </span>
              </div>
              <div className="link-address" id="tools-link-top" onClick={setMenu}>
                <span className="number">/6</span>
                <span className="actual-link" id="tools-link">
                  <a href="#social-media-page-home">Platforms</a>
                </span>
              </div>
              <div className="link-address" id="tools-link-top" onClick={setMenu}>
                <span className="number">/7</span>
                <span className="actual-link" id="tools-link">
                  <Link href="/production">Production</Link>
                </span>
              </div>
              <div className="link-address" id="clients-link-top" onClick={setMenu}>
                <span className="number">/8</span>
                <span className="actual-link" id="clients-link">
                  <a href="https://shop.leerecs.com" target="_blank" rel="noopener noreferrer">Shop</a>
                </span>
              </div>
              <div className="link-address" id="clients-link-top" onClick={setMenu}>
                <span className="number">/9</span>
                <span className="actual-link" id="clients-link">
                  <a href="#contact-page-home"> Support</a>
                </span>
              </div>
            </div>
          </div>
          <div className="line-art" data-aos="fade-up" />
          <div className="location" id="details-address">
            <div className="text-content-menu">
              <div className="address-location">
                <div className="supporting">
                  <div className="street">119 Pondfield Rd, Suite 924</div>
                  <div className="apartment">Bronxville, New York, 10708</div>
                  <div className="address-real">New York,USA</div>
                </div>
              </div>
              <div className="address-location">
                <div className="supporting">
                  <div>info@leerecs.com</div>
                </div>
              </div>
    
              <div className="address-location social-icon-time">
                <div className="address-items">
                  <a
                    href="https://en-gb.facebook.com/leerecs/shop/?referral_code=page_shop_tab&preview=1&ref=page_internal"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Fb &nbsp; &nbsp;
                  </a>
                </div>
                <div className="address-items">
                  <a
                    href="https://www.instagram.com/leerecs/?hl=en"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ig &nbsp; &nbsp;
                  </a>
                </div>
                <div className="address-items">
                  <a
                    href="https://twitter.com/leerecs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tw &nbsp; &nbsp;
                  </a>
                </div>
                <div className="address-items">
                  <a
                    href="https://www.youtube.com/c/leerecs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Yt &nbsp; &nbsp;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default MobileMenu;
