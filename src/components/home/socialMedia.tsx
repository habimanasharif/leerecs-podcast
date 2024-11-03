/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useEffect, useState } from 'react';
import { Box } from './box';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import '@/sass/home/socialmedia.scss'
interface props{
    contentData:any;
}
const SocialMedia:React.FC<props> =  ({contentData}:any) => {
    const [state, setstate] = useState(false)
    const [platiforms,setPlatiforms] =useState<any|null>(null)
    useEffect(() => {
   
        gsap.registerPlugin(ScrollTrigger);
        var timeline = gsap.timeline();
        ScrollTrigger.create({
          trigger: "#social-media-page-home",
          animation: timeline,
          start: "top center+=300px",
          end: "top center",
          onEnter: () => {
            setstate(true)
          },
        });
        
      }, [])
      
    useEffect(()=>{
        const fetchPlatiforms = async () => {
            try {
              const response = await fetch('/api/platforms');
              const data = await response.json();
              setPlatiforms(data.data);
            } catch (error) {
              
            }
          };

          fetchPlatiforms ()

    },[])
   
    return (
        <div className="container-fluid" id="social-media-page-home">
      <div className="header d-flex justify-content-between">
        <div>
          <h1 className="text-lg text-light main-title">
            Distribution
            <br />
            Platforms
          </h1>
          <p className="text-muted description-text">
            Leerecs wants to empower now and independent artists making
            alternative music.
            <br />
            Consider us an ally in your music career, Leerecs will always be on
            the artist's side,
            <br />
            providing a platform where independent original music of quality
            always
            <br />
            goes first... Streaming, Podcast, Talk Radio, Record Publishing and
            more
          </p>
        </div>
        <div className="right-content">
          <div className="big-text-wrapper">
            <div className="music-text">Platforms</div>
          </div>
        </div>
      </div>
      {
        platiforms?.data && (<div className="main-card-wrapper">
          {platiforms.data.map((item:any,idx:number)=>{
            
            return (<Box icon={item.icon} count={state &&item.number} text={item.title} link={item.url} key={idx} title={item.item} />)
          })}
          
        </div>)
      }
    </div>
    );
}

export default SocialMedia;
