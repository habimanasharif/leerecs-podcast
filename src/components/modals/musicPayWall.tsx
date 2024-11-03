/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react';
import ModalWrapper from '../wrappers/modalWrapper';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import YouTube from 'react-youtube';
import '@/sass/modals/payWall.scss'
import { setShowMusicPaywall } from '@/redux/data/uiData';
enum contentType {
    VIDEO="VIDEO",
    AUDIO="AUDIO",
}

const MusicPayWall = () => {
    const [content, setContent] = useState<any[]>([]);
    const [loaded,setLoaded]=useState(false)
    const[isEnded,setIsEnded]=useState<boolean>(false)
    const dispatch= useAppDispatch()
    const { audioCounter ,showMusicPayWall} = useAppSelector((state) => state.uiData);
    const handleEnded = () => {
        setIsEnded(true)
      };
      const opts = {
        height: '200',
        width: '400',
        playerVars: {
          autoplay: 1, 
        },
      };
    
      const handleVideoEnd = () => {
          handleEnded ()
      };
      const playSong = () => {
        const audioElement = document.querySelector('.music-player-audio') as HTMLAudioElement;
        if (audioElement) {
          audioElement.play();
          // audioElement.currentTime=60.23437456369575;
        }
      };
     

    useEffect(() => {
      
  
      const fetchContent = async () => {
        try {
          const response = await fetch('/api/content');
          const data = await response.json();
          setContent(data.data.adsContent);
        } catch (error) {
          //console.error('Error fetching content:', error);
        }
      }
  
      fetchContent()
      
    }, []);
    
    const close=()=>{
        dispatch(setShowMusicPaywall())
        playSong()
    }
    return (
        <>
        {showMusicPayWall&&(
            <ModalWrapper close={close} showClose={isEnded} title="To listen without advertisement log in or create account" width="450px">
            <div id="paywall">
            <div className="col-md-11 col-lg-10 col-xl-12">
                    <div className="col-md-12 col-xl-12">

{content.length!==0&&content[audioCounter%content.length].type===contentType.AUDIO &&(
    <div>
    <img 
    width="400px"
    height="200px"
    src={content[audioCounter%content?.length].image} alt="" />
  

<audio onEnded={handleEnded} id="myAudio" src={content[audioCounter%content?.length].src} controls autoPlay={true} style={{width:"400px",marginTop:"10px"}}>
 </audio>
</div>
)}
{content.length!==0&&content[audioCounter%content?.length].type===contentType.VIDEO &&(
        <div className="video-container">
        <YouTube
      videoId={content[audioCounter%content?.length].src}
      opts={opts}
      onEnd={handleVideoEnd}
    />
      </div>
    )
}
                    

            <Link href="/login" onClick={()=>{
              document.body.style.overflow = 'auto';
            //   dispatch(setMusicShowPayWall (false)) 
              }}> 
              <h5 style={{
                textAlign:"center",
                color:"#f92e8d",
                marginTop:"10px",
                textDecoration:"underline",
              }}>Login or create a new Account</h5>
              </Link> 
                       
                    </div>
                    </div>

            </div>

        </ModalWrapper>
        )}
        </>
        
    );
}

export default MusicPayWall;
