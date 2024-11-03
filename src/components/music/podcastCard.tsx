import React from 'react';
import Player from '../../../public/icons/player';
import CardShareIcon from '../../../public/icons/cardShareIcon';
import Link from 'next/link';
import '@/sass/music/albumElement.scss'
import configuration from '@/config';
import Image from 'next/image';
import { usePlayer } from '@/lib/usePlayer';
interface props {
    title: string;
    cover: string;
    username: string;
  
  }

const PodcastCard:React.FC<props> = ({cover,title,username}:props)  => {
    const handleError = (event:any) => {
        event.target.src = `${configuration.host}/assets/images/thumb_avatar-default-image.jpg`; 
    };
    const [{playPodcast}]=usePlayer()
    
    return (
        <div className="col-md-3 px-2  card  music-e-card  shadow-sm">
        <div className="cover">
          <div className="cover-wrapper">
            <div>
            <Image
                alt="thumbnail"
                src={cover}
                width={500}
                height={500}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />

            </div>
          </div>
           <div className="music-play-btn" 
           onClick={()=>{playPodcast(title)}}
           >
  <Player />
  </div>
          
        </div>
        <Link href={`/music/album/${title.toLowerCase().replaceAll(" ","-")}`}>
        <div className="song-name mt-2">{title}</div>
        </Link>
        <Link href={`/a/${username.replaceAll(' ','-').toLowerCase()}`}>
          <div className="numbering mb-1 mt-1">By {username}</div>
        </Link>
  
        <div className='card-share-btn'><CardShareIcon></CardShareIcon></div>
      </div> 
    );
}

export default PodcastCard;
