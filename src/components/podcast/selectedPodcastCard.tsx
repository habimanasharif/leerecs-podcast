import React from 'react'
import ShareIcon from '../../../public/icons/ShareIcon'
import PlayIcon from '../../../public/icons/playIcon'

import '@/sass/podcast/mainCard.scss'
import { usePlayer } from '@/lib/usePlayer'
import { useAppDispatch } from '@/redux/hook'
import { setShareData } from '@/redux/data/uiData'
import configuration from '@/config'

interface props{
    artistImage:string
    artistTitle:string
    artistBio:string
    musicUrl:string
    data:any,
}


const SelectedPodcastCard:React.FC<props> = ({ 
    artistImage,
    artistTitle,
    artistBio,
    data,
}:props) => {
  const [{playPodcast}]=usePlayer()
  const dispatch=useAppDispatch()
    return (
        <div id="playlist_info" style={{ paddingLeft: "15px" }}>
        <div className="row ">
          <div className="col-md-3 pd-l col-12 mr-5">
          <div
            className="   background-img"
            style={{
              backgroundImage: `url("${artistImage}")`,
            }}
          ></div>
          </div>
          <div className="col-md-7 music-details ml-auto" style={{marginLeft:"auto"}}>
            <div className="Playlist-title" style={{ color: "white" }}>
              {artistTitle}
            </div>
            <div className="Playlist-Description" style={{ color: "white" }}>
              {artistBio}
            </div>
            <div className="d-flex  btn-collection">
              <div
                className="btn-custom d-flex"
                style={{ color: "white", background: "#F8107D" }}>
                <div className="icon" onClick={()=>{playPodcast(artistTitle)}}>
                 <PlayIcon/>
                </div>
                <div className="btn-title mx-2 mt-1 ">Play</div>
              </div>
              <div
                className="btn-custom d-flex mx-2"
                style={{ color: "white", background: data.darkVibrant,cursor: "pointer" }}
                onClick={()=>{
                  dispatch(setShareData({
                      shareUrl:`${configuration.podHost}/${artistTitle}`,
                      title:artistTitle
                  }))
              }}
              >
                <div className="icon ">
                  <ShareIcon/>
                </div>
                <div className="btn-title mx-2 mt-1"
                
                >Share</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SelectedPodcastCard;
