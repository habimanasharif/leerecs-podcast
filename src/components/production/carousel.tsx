import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FEATURED_MUSIC} from '@/app/api/graphql/queries';
import { useKeenSlider } from "keen-slider/react";
import BackwardIcon from '../../../public/icons/backwardIcon';
import SingleMusic from './singleMusic';
import ForwardIcon from '../../../public/icons/forwardIcon';
import "../../sass/production/carousel.scss"
import "../../../node_modules/keen-slider/keen-slider.min.css"

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  const { data } = useQuery(FEATURED_MUSIC);
    return (
     
      <>
      {data && (
        <>
          {data.AllFeaturedMusic.length !== 0 && (
            <>
              <div id="carousel-wrapper">
                <div className="d-flex">
                  {data.AllFeaturedMusic.length - 1 !== 0 &&
                    loaded &&
                    instanceRef.current && (
                      <div id="arrow-left">
                        <div
                          onClick={(e:any) => {
                            e.stopPropagation() || instanceRef.current?.prev();
                          }}
            
                        >
                          <BackwardIcon />
                        </div>
                      </div>
                    )}

                  <div
                    ref={sliderRef}
                    className="keen-slider"
                    id="carousel-element"
                    style={{}}
                  >
                    {data &&
                      data.AllFeaturedMusic.map((item:any,index:number) => {
                        return (
                          <div
                          key={index}
                            className="keen-slider__slide number-slide1"
                            style={{
                              minWidth: "100%!important",
                              maxWidth: "100%!important",
                            }}
                          >
                            <SingleMusic
                              image={item.thumbnail}
                              title={item.title}
                              file={item.file}
                              username={item.username}
                              profile={item.profile}
                              color={item.color}
                            />
                          </div>
                        );
                      })}
                  </div>
                  {data.AllFeaturedMusic.length - 1 !== 0 &&
                    loaded &&
                    instanceRef.current && (
                      <div id="arrow-right">
                        <div
                          onClick={(e:any) =>
                            e.stopPropagation() || instanceRef.current?.next()
                          }
                          
                        >
                          <ForwardIcon />
                        </div>
                      </div>
                    )}
                </div>
                {data.AllFeaturedMusic.length - 1 !== 0 &&
                  loaded &&
                  instanceRef.current && (
                    <div className="dots">
                      {[...Array.from({ length: data.AllFeaturedMusic.length }, (_, i) => i)].map(
                        (idx) => {
                          return (
                            <div
                              key={idx}
                              onClick={() => {
                                instanceRef.current?.moveToIdx(idx);
                              }}
                              className={
                                "dot" + (currentSlide === idx ? " active" : "")
                              }
                            ></div>
                          );
                        }
                      )}
                    </div>
                  )}
              </div>
            </>
          )}
        </>
      )}
    </>   
    );
}

export default Carousel;
