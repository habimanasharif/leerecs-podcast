import configuration from '@/config';
import React from 'react';
import '../../sass/production/singleMusic.scss'
import PlayMusicIcon from '../../../public/icons/playSingleMusic';
import { usePlayer } from '@/lib/usePlayer';

interface props{
    image: string,
    idx?:number,
    title:string,
    username:string,
    file:string,
    profile:string,
    color:string
}

const SingleMusic:React.FC<props> = ({
    image,
    idx,
    title,
    username,
    profile,
    file,
    color
  }:props) => {
    const [{playMusic}]=usePlayer()
    return (
        <div
        id="singleFeatureMusic"
        style={{
          backgroundImage: `url("${configuration.FILE_STORAGE_LINK + image}")`,
        }}
      >
        <div className="d-flex justify-content-between">
          <div className="numbering">{idx}</div>
          <div
            className="play-icon"
            onClick={() => {
              playMusic({
                      name: title,
                      singer: username,
                      cover: image,
                      musicSrc: file,
                      color:"green"
                    })
            
            }}
          >
           <PlayMusicIcon/>
          </div>
        </div>
        <div className="description">
          <div className="d-flex justify-content-between align-content-center">
            <div className="description-wrapper">
              <div className="single-feature-title">{title}</div>
              <div className="single-feature-artist">{username}</div>
            </div>
            <a href={`/artist/${username}`} target="_blank" rel="noreferrer">
              <div
                className="rounded-circle"
                style={{
                  backgroundImage: `url("${
                    profile
                      ? configuration.FILE_STORAGE_LINK + profile
                      : ""
                  }")`,
                }}
              ></div>
            </a>
          </div>
        </div>
      </div>
    );
}

export default SingleMusic;
