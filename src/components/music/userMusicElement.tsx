/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Player from '../../../public/icons/player';
import Link from 'next/link';
import CardShareIcon from '../../../public/icons/cardShareIcon';
import UserIcon from '../../../public/icons/userIcon';
import MusicIcon from '../../../public/icons/MusicIcon';
import '@/sass/music/musicElement.scss'
import configuration from '@/config';
import { usePlayer } from '@/lib/usePlayer';
import Eye from '../../../public/icons/eye';
import Publish from '../wrappers/publish';
import { useAppDispatch } from '@/redux/hook';
import { setShowUpdateAudio } from '@/redux/data/uiData';
interface props{
    title:string;
    thumbnail:string;
    file:string;
    username:string;
    color_name:string
    approved:boolean;
    topic_id:number,
    musicId:number,
}

const UserMusicElement:React.FC<props> = ({color_name,thumbnail,username,title,file,approved,topic_id,musicId}) => {
    const regex = /[?@\/#:\,;%+&=\{\}\[\]\^-]/g
    // const handleError = (event:any) => {
    //     event.target.src = '/assets/images/default-music.png'; // Replace with your default image URL
    // };
    const dispatch=useAppDispatch()
    
    const [{playMusic}]=usePlayer()
    const currentSong={
         name:title,
         singer: username,
         cover: thumbnail,
         musicSrc:file,
         color:color_name
    }
    return (
        <div className="col-md-3 px-2  card  music-e-card  shadow-sm" >
        <div className="cover shadow-sm">
        <div className='cover-wrapper' style={{backgroundColor:`${color_name}`, border:`2px solid ${color_name}`}}>
           
            <div> 
                <img src={`${configuration.FILE_STORAGE_LINK}${thumbnail}`} alt="" aria-hidden="false" draggable="false"   />
            </div>
            </div>
            <div className='music-play-btn' onClick={()=>{
                playMusic(currentSong)
               
                }}>
            <Player/>
            </div>
            </div>
        <Link href={`/a/${username.replaceAll(" ","-").toLowerCase()}/s/${title.toLowerCase().replaceAll(regex,'').replaceAll(" ","-")}`}><div className="song-name" title={title} ><MusicIcon/> {title}</div></Link>
        <Link href={`/a/${username.replaceAll(" ","-").toLowerCase()}`}><div className="numbering" title={username}><UserIcon/> {username}</div></Link>
        <div className='card-share-btn '><CardShareIcon></CardShareIcon></div>
        <div className='karma'>{(location.pathname ==="/music/mymusic")&&( <Publish music_id={topic_id} ><Eye approved={approved}/></Publish>)} </div>
        <div className='replace-btn' 
        onClick={(e)=>{ 
            e.preventDefault()
            console.log(musicId)
            dispatch(setShowUpdateAudio(musicId))
        }}>
            Replace Audio File
            </div>
               
                 
        
    </div>
    );
}

export default UserMusicElement;
