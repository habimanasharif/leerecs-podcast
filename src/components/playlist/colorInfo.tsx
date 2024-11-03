import React from 'react';
import PlayMusicIcon from '../../../public/icons/playSingleMusic';
import ShareIcon from '../../../public/icons/ShareIcon';
import { usePlayer } from '@/lib/usePlayer';
interface props{
    color:string
    title:string
    desc:string
    }
const ColorInfo:React.FC<props> = ({color,title,desc}:props) => {
    const [{playColor}]=usePlayer()
    return (
        <div className="header" style={{ background:color }}>
        <div className="d-flex justify-content-between">
            <div>
                <div className="panel-title">Playlist</div>
                <div className="playlist-title">
                    <span className=" mr-3">{title}</span>
                    </div>
                <div className="playlist-desc">
                <span className=" mr-3">{desc}</span>
                    </div>
                    <div className="d-flex">
                   </div>
                   
            </div>
            <div className="btn-collection">
                <div onClick={()=>{
                   playColor(title) 
                }}>
                    <PlayMusicIcon />
                </div>
                <div style={{
                    marginTop: "15px"
                }}
                className='share-btn'
                    >
                    <ShareIcon />
                </div>
                
            </div>
            
        </div>
       
    </div> 
    );
}

export default ColorInfo;
