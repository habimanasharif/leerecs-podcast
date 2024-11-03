/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Footer from '../home/footer';
import Cta from './cta';
import Testimonial from './testimonial';
import '@/sass/production/working.scss'
import configuration from '@/config';


const Workings:React.FC<any> = ({data}:any) => {
  
    return (
        <div className="workings-page-wrapper text-lg text-light" id="process">
        <div className="workings-page-content mb-5">
          <div className="workings-title">
            <h1 className="text-lg text-light main-title">
              {data?.data?.process.title}
            </h1>
            <p>{data?.data?.process.subTitle}</p>
          </div>
  
          <div className="workings-list">
            <div
              className="workings-card-wrapper"
              style={{ backgroundImage: `url('/icons/Group 1.png')` }}
            >
              <div className="workings-icon">
                <img src={`${configuration.host}${data?.data?.process.one.icon}`} alt="icon" />
              </div>
              <h5>{data?.data?.process.one.title}</h5>
              <p>{data?.data?.process.one.description}</p>
            </div>
  
            <div
              className="workings-card-wrapper"
              style={{ backgroundImage: `url('/icons/Group 2.png')` }}
            >
              <div className="workings-icon">
                <img src={`${configuration.host}${data?.data?.process.two.icon}`} alt="icon" />
              </div>
              <h5>{data?.data?.process.two.title}</h5>
              <p>{data?.data?.process.two.description}</p>
            </div>
  
            <div
              className="workings-card-wrapper"
              style={{ backgroundImage: `url('/icons/Group 3.png')` }}
            >
              <div className="workings-icon">
                <img src={`${configuration.host}${data?.data?.process.three.icon}`} alt="icon" />
              </div>
              <h5>{data?.data?.process.three.title}</h5>
              <p>{data?.data?.process.three.description}</p>
            </div>
  
            <div
              className="workings-card-wrapper"
              style={{ backgroundImage: `url('/icons/Group 4.png')` }}
            >
              <div className="workings-icon">
                <img src={`${configuration.host}${data?.data?.process.four.icon}`} alt="icon" />
              </div>
              <h5>{data?.data?.process.four.title}</h5>
              <p>{data?.data?.process.four.description}</p>
            </div>
          </div>
          {/* <Testimonial />
          <Cta /> */}
        </div>
        <Footer contentData={data} />
      </div>
    );
}

export default Workings;
