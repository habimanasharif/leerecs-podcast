/* eslint-disable @next/next/no-img-element */
'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React, { useEffect, useRef, useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import ArrowDownIcon from '../../../public/icons/arrowDownIcon';
import 'react-jinke-music-player/assets/index.css';
import '@/sass/music/musicPlayer.scss'
import { usePathname } from 'next/navigation';
import { setMissingTrackBanner, setShowMusicPaywall,setAudioCounter } from '@/redux/data/uiData';
import Link from 'next/link';
import configuration from '@/config';

 
const regex = /[?@\/#:\,;%+&=\{\}\[\]\^-]/g

const MusicPlayer = () => {
    const path=usePathname();
    const { musicData,playIndex} = useAppSelector((state) => state.musicPlayer);
    const {userAuth}=useAppSelector((state)=>state.userAuth)
    const count=useRef(1)
    const dispatch=useAppDispatch()
    
    const audioList1 = musicData;
    const options = {
      audioLists: audioList1,
      drag: false,
      showReload: false,
      showDownload: false,
      showPlay: true,
      showPlayMode: Boolean(musicData.length - 1),
      showThemeSwitch: false,
      playIndex: playIndex,
      showLyric: false,
      showDestroy: false,
      toggleMode: true,
      clearPriorAudioLists: true,
      autoPlayInitLoadPlayList: true,
      showMiniModeCover: false,
      autoHiddenCover: true,
      bounds: "parent",
      sortPlayList: false,
    };
  
    // const location = useLocation();
    const canIshowPlayer = () => {
      let notAcceptedLocation = ["/login", "/signup", "/request"];
      if (notAcceptedLocation.includes(window.location.href)) {
        return false;
      } else {
        return true;
      }
    };
  

    const [showCover, setToggleCover] = useState(false);
    const [currentMusic, setcurrentMusic] = useState(0);
   
    useEffect(()=>{
      const audioElement = document.querySelector('.music-player-audio') as HTMLAudioElement;;
        const handleTimeUpdate = function() {
        if(!userAuth.isLogedIn){
          if (audioElement.currentTime >= 60 * count.current) {
            audioElement.pause();
            count.current+=1;
            dispatch(setAudioCounter(count.current+1))
            dispatch(setShowMusicPaywall())
          }
        }else{
          // Remove the existing event listener before adding a new one
          audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        }
      
        };
        if (audioElement && !userAuth.isLogedIn) {
          // Remove the existing event listener before adding a new one
          audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      
          // Add the updated event listener
          audioElement.addEventListener('timeupdate', handleTimeUpdate);
        }
      
        // Clean up the event listener when the component unmounts or when count changes
        return () => {
          if (audioElement) {
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
          }
        };
    
    },[count, userAuth, musicData, dispatch])

    return (
        <>
        {musicData.length!==0&&(<>
          <div id="MusicOfficialPlayer">
          {canIshowPlayer() && (
            <div className="top-index">
                <ReactJkMusicPlayer
                  {...options}
                  renderAudioTitle={(audioInfo) =>{ 
                    return(
                    <div>
                      <Link title={audioInfo.name} className='singer-link' href={`/${audioInfo.name}`}>
                        {audioInfo.name}
                      </Link>
                      {" - "}
                      <a title={audioInfo.singer} className='singer-link' href={`${configuration.musicHost}/a/${audioInfo.singer.replaceAll(" ","-").toLowerCase()}`}>
                        {audioInfo.singer}
                      </a>
                    </div>
                  )}}
                  onAudioError={(errMsg,currentPlayId, audioLists, audioInfo)=>{
                    dispatch(setMissingTrackBanner({state:true,page:path}))

                  }}
                  onAudioPlay={(audioInfo) =>{
                    const imgContentElements = document.querySelectorAll('.img-content');
                    imgContentElements.forEach((element) => {
                      (element as HTMLElement).style.border = `2px solid ${audioInfo.color}`;
                      
                  });
                  
                  
                  const audioElement = document.querySelector('.music-player-audio') as HTMLAudioElement;
                  if(count.current>1){
                  audioElement.currentTime=60*(count.current-1);
                  audioElement.play()
                  }
                
                  }}
                  onCoverClick={() => setToggleCover(!showCover)}
                  onModeChange={() => setToggleCover(false)}
                  showMediaSession
                  mode="full"
                >
                 
                  
                </ReactJkMusicPlayer>
            </div>
          )}
        </div>
  
        <div
          className="song-cover"
          style={{ display: showCover ? "flex" : "none" }}
        >
          <div onClick={() => setToggleCover(false)}>
            <ArrowDownIcon />
          </div>
          <img src={musicData[currentMusic].cover} alt="cover" />
        </div>
        </>
        )}
        
      </>
    );
};

export default MusicPlayer;


