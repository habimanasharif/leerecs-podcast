import configuration from '@/config';
import React, { useEffect, useRef, useState } from 'react';
interface Ads{
    link:string,
    url:string
}
interface props{
 adwidth:number,
 adheight:number   
}
const Ads:React.FC<props>= ({adwidth,adheight}) => {
    const [info, setInfo] = useState<Ads[]>([]);
    const [count, setCount] = useState(0);
    const intervalIdRef = useRef<any>();
    useEffect(() => {
        const fetchContent = async () => {
            try {
              const response = await fetch('/api/content');
              const data = await response.json();
              setInfo(data.data.adSense);
            } catch (error) {
              //console.error('Error fetching content:', error);
            }
          }
          if (info.length === 0) {
          fetchContent()}
          if (info) {
            let i = 0;
            intervalIdRef.current = setInterval(() => {
              if (i === info.length - 1) {
                i = 0;
              } else {
                i++;
              }
              setCount(i);
            }, 5000);
          }
      
          return () => clearInterval(intervalIdRef.current);
    },[info])
 
    return (
        <div>
      {info.length!==0&& (
        <a href={info[count].url} target="_blank" rel="noreferrer">
          <div
            className="ad-card"
            style={{ backgroundImage: `url(${configuration.host}${info[count].link})` }}
          ></div>
        </a>
      )}
    </div>
    );
}

export default Ads;
