import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Comparision from './comparision';
import '@/sass/production/compare.scss'
const Compare:React.FC<any> = ({data}:any) => {
    return (
        <div className="compare-page-wrapper text-lg text-light" id="compare">
        <div className="compare-page-content">
          <div className="compare-title">
            <h1 className="text-lg text-light main-title">
              {data?.data?.compare.title}
            </h1>
            <p>{data?.data?.compare.subTitle}</p>
          </div>
        
          <Carousel showArrows={false} >
            {data?.data?.compare.comparisons.map((result:any,index:number) => {
              return (
                <div className="slider-container" key={index}>
                  <div className="slider-item">
                    <Comparision data={result} />
                  </div>
                </div>
              );
            })}
            
          </Carousel>
        </div>
      </div>
    );
}

export default Compare;
