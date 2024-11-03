'use client'
import React, { useState } from 'react';
import Navbar from './navbar';
import Webgl from '../webgl';
import Link from 'next/link';
import ForwardArrow from '../../../public/icons/forwardArrow';
import Radio from '../../../public/icons/radio';
import Music from '../../../public/icons/music';
import Guitor from '../../../public/icons/guitor';
import BackArrow from '../../../public/icons/backArrow';
import LazyBackground from '../wrappers/LazyBackground';
import SmallLoader from '../../../public/icons/loaders/smallLoader';
import PlayMusic from '../../../public/icons/playMusic';
import Share from '../../../public/icons/share';
import '@/sass/home/index.scss'
import { usePlayer } from '@/lib/usePlayer';
import { useAppDispatch } from '@/redux/hook';
import { setShareData } from '@/redux/data/uiData';
import configuration from '@/config';



const Welcome:React.FC<{feedData:any,contentData:any}>= ({feedData,contentData}:{feedData:any,contentData:any}) => {
    const [state, setstate] = useState(0)
    const rand = Math.floor(Math.random() * feedData?.data?.length) + 1;
    const [{playPodcast}]=usePlayer()
    const dispatch=useAppDispatch()
    const manageMusic = () => {
        const onClick=() => {
         // dispatch(playSingle(musicinfo));
        }
        return <>
          {!feedData.data? (<>
          {contentData?.data?.HomeButtons.length!==0 &&(
            <div className="cardPreloader"> <div className='h-100 d-flex justify-content-center align-items-center'><SmallLoader/></div></div>
          
          )}
          
          </>) : (
        <LazyBackground src={feedData?.data[rand].imageUrl} css="currentMusic" onClick={onClick}>
            <div className="HomeShare"
            onClick={()=>{
              dispatch(setShareData({
                  shareUrl:`${configuration.host}/podcast/${feedData?.data[rand].musicName}`,
                  title:feedData?.data[rand].musicName
              }))
          }} 
            ><Share/></div>
                <div onClick={()=>{playPodcast(feedData?.data[rand].musicName)}} >
            <PlayMusic /></div>
          
          </LazyBackground>)
          }
        </>;
      }
    
    return (
        <div className="container-fluid" id="home">
            <Webgl/>
            <Navbar navLinks={contentData?.data?.navLinks} CTA={contentData?.data?.CTA}/>
            {contentData?.data&&(
                 <div className="d-md-flex justify-content-between">
                 <div className="actual-content">
                   <div className="d-md-flex justify-content-md-between">
                     <div className="back-arrow">
                       {(state !== 0) && (<div onClick={() => { setstate(state - 1) }} className="icons">
                         <BackArrow />
                       </div>)}
                     </div>
                     <div className="text-content">
                       <div className="home-adcard">
                       </div>
                       <div className="the-cta-text">
         
                         {(state === 0) && (
                           <div className="welcome-text"><div className="the-fat-text ml13" dangerouslySetInnerHTML={{__html:contentData?.data?.description[0].header}}>
                             
                           </div>
                             <div className="desc-text">
                               <p dangerouslySetInnerHTML={{__html: contentData?.data?.description[0].description}}>
                               </p>
                               <p dangerouslySetInnerHTML={{__html:contentData?.data?.description[0].sub}}>
                               </p>
                             </div>
                           </div>)}
                         {(state === 1) && (
                           <div className="welcome-text"><div className="the-fat-text ml13" dangerouslySetInnerHTML={{__html:contentData?.data?.description[1].header}}>
                           </div>
                             <div className="desc-text">
                               <p dangerouslySetInnerHTML={{__html:contentData?.data?.description[1].description}}>
                               </p>
                             </div>
                           </div>)}
                         {(state === 2) && (
                           <div className="welcome-text"><div className="the-fat-text ml13" dangerouslySetInnerHTML={{__html:contentData?.data?.description[2].header}}>
                           </div>
                             <div className="desc-text">
                               <p dangerouslySetInnerHTML={{__html:contentData?.data?.description[2].description}}>
                               </p>
         
                             </div>
                           </div>)}
                           {contentData?.data?.HomeButtons.length!==0 &&(<div className="bottom-cta">
                           <Link href={contentData.data? contentData.data.HomeButtons[0].url:""}>
                             <div className="listen-to-music-btn music-btn-listen-cta">
                             <div className="single-link d-flex">
                              <div className='px-3'>
                            <Guitor/>
                            </div>
                             
                             
                            {contentData?.data?.HomeButtons[0]?.text}
                               </div>
                             </div>
                           </Link>
                           
                             <div className="bottom-links">
                             <Link href={contentData.data? contentData?.data?.HomeButtons[1]?.url:""}>
                               <div className="non-main-cta">
                                 <div className="single-link d-flex">
                                   <Music color="#fff" />
                                   {contentData?.data?.HomeButtons[1]?.text}
                                 </div>
                               </div>
                               </Link>
                               <a href={contentData?.data?.HomeButtons[2]?.url} target="_blank">
                               <div className="non-main-cta edgeleft">
                                 <div className="single-link d-flex">
                                  <div className='px-3'>
                                   <Radio /> 
                                   </div>
                                   {contentData?.data?.HomeButtons[2]?.text}
                                 </div>
                               </div>
                               </a>
                             </div>
                           
                         </div> )}
                         
                         <div></div>
                       </div>
                     </div>
                     <div id="current-music">
                       {(state === 0) && (
                         <div>
                           {manageMusic()}
                         </div>)}
                       {(state === 1) && (
                         <div className="d-flex">
                           <LazyBackground src={`${configuration.host}${contentData?.data?.description[1].image}`} css="currentMusic"></LazyBackground>
                         </div>)}
                       {(state === 2) && (
                         <div className="d-flex">
                           <LazyBackground src={`${configuration.host}${contentData?.data?.description[2].image}`} css="currentMusic"></LazyBackground>
                         </div>
                       )}
                       {contentData?.data?.HomeButtons.length!==0&&(
                         <div className="carousel-circle">
                         <div className="carousel-container d-flex">
                           <div className={`circle rounded-circle ${(state === 0) && "active"}`} onClick={() => { setstate(0) }}></div>
                           <div className={`circle rounded-circle ${(state === 1) && "active"}`} onClick={() => { setstate(1) }}></div>
                           <div className={`circle rounded-circle ${(state === 2) && "active"}`} onClick={() => { setstate(2) }}></div>
                         </div>
                       </div>
                       )}
                       
                     </div>
                     <div className="forwardarrow">
                       {(state !== 2 &&contentData?.data?.HomeButtons.length!==0) && (<div onClick={() => { setstate(state + 1) }} className="icons">
                         <ForwardArrow />
                       </div>)}
                     </div>
                   </div>
                 </div>
               </div>
            )}
           
        </div>
    );
}

export default Welcome;
