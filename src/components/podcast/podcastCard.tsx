import React from 'react';
import Player from '../../../public/icons/player';
import'@/sass/podcast/card.scss'
import { usePlayer } from '@/lib/usePlayer';
interface props { 
    imageUrl:string, 
    musicUrl:string, 
    artist:string, 
    musicName:string, 
    dataType:string, 
    changeSong?:Function}
   const PodcastCard:React.FC<props> = ({imageUrl, artist, musicName}:props) => {
    const [{playPodcast}]=usePlayer()
    return (
        <div className="card-obj card1" style={{backgroundImage:`url("${imageUrl}")`}} >
            <div className="player d-flex justify-content-end"
            onClick={()=>{playPodcast(musicName)}}
            >
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

export default PodcastCard;
