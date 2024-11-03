import React from 'react';
import Player from '../../../public/icons/player';
import Link from 'next/link';
import CardShareIcon from '../../../public/icons/cardShareIcon';
import UserIcon from '../../../public/icons/userIcon';
import MusicIcon from '../../../public/icons/MusicIcon';
import Image from 'next/image';
import '@/sass/music/musicElement.scss'
import configuration from '@/config';
import { usePlayer } from '@/lib/usePlayer';
import { useAppDispatch } from '@/redux/hook';
import { setShareData } from '@/redux/data/uiData';
import CustomImage from '../wrappers/customImage';
interface props{
    title:string;
    thumbnail:string;
    file:string;
    username:string;
    color_name:string
}
const MusicElement:React.FC<props> = ({color_name,thumbnail,username,title,file}) => {
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
      <CustomImage
      alt="thumbnail"
      src={`${configuration.FILE_STORAGE_LINK}${thumbnail}`}
      fallbackSrc="https://res.cloudinary.com/dxkrgura6/image/upload/leerecs/default-music.png"
      />
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
            <div className='card-share-btn'
            onClick={()=>{
                dispatch(setShareData({
                    shareUrl:`${configuration.host}/a/${username.replaceAll(" ","-").toLowerCase()}/s/${title.toLowerCase().replaceAll(regex,'').replaceAll(" ","-")}`,
                    title
                }))
            }}
            >
                <CardShareIcon/>
            </div>
                   
                     
            
        </div>
    );
}

export default MusicElement;
