/* eslint-disable @next/next/no-img-element */
import React from 'react';
import '@/sass/production/landing.scss'
import Carousel from './carousel';

const Landing = () => {
    
    return (
        <div className="landing-page-wrapper" id="landing-production">
        <div className="landing-page-content">
          <div className="row mx-0">
            <div className="col-md-12 col-lg-12 col-xl-12">
              <div className="landing-title">
                <div className="main-title">We Do Slick Music Production</div>
                <div className="services h3">
                  Recording / Arrangement / Mixing / Mastering
                </div>
                <div className="catch-flase h4">
                  Sound like the artist you alway wanted to hear
                </div>
                <div className="text h6">
                  With our top-shelf music production services, you get more than
                  just radio-ready songs. You get songs that you personally love
                  and songs that move and inspire you.
                </div>
  
                <div className="landing-button-wrapper">
                  <a href="#compare">
                    <div className="landing-button">
                      <img src="/icons/volume_icon.svg" alt="hear examples" />
                      Hear Examples
                    </div>
                  </a>
  
                  <a href="/request">
                    <div className="landing-button">
                      <img src="/icons/file_icon.svg" alt="get a free proposal" />
                      Get a proposal
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-xl-12 justify-content-center px-0">
            <Carousel />
          </div>
        </div>
      </div>
    );
}

export default Landing;
