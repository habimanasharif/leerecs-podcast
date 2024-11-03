import React from 'react';
import Player from '../../../public/icons/player';
import { useRouter } from 'next/navigation';
import { usePlayer } from '@/lib/usePlayer';
interface props{
    imageUrl:string, 
    musicUrl:string, 
    artist:string, 
    musicName:string,  
}

const SuggetionCard:React.FC<props> = ({imageUrl, musicUrl, artist, musicName}:props) => {
    const route=useRouter()
    const [{playPodcast}]=usePlayer()
    return (
        <div className="card-obj card1" style={{backgroundImage:`url("${imageUrl}")`}} onClick={(e)=>{
            e.preventDefault()
                route.push(`/${musicName}`)
        }}>
            <div className="player d-flex justify-content-end" onClick={()=>{playPodcast(musicName)}} >
                <Player />
            </div>
            <div className="bottom-text-events">
                <div className="music-title-events">
                    {musicName}
                </div>
                <div className="music-artist-events">{artist ?artist:"leerecs"}</div>
            </div>
        </div>
    );
}

export default SuggetionCard;
