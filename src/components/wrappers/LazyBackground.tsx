/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';

interface props{
  src:string,
  alt:string
  css:string,
  onClick:any
}

const LazyBackground:React.FC<any> = (props:any) => {
  const divRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Adjust the threshold as per your requirements
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  const style = {
    backgroundImage: isVisible ? `url(${props.src})` : ''
  };

  return (<div ref={divRef} style={style}className={props.css} onClick={props.onClick} >
    {props.children}
    </div>);
};

export default LazyBackground;