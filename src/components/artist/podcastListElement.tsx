import React from 'react';
import PlayIcon from '../../../public/icons/playIcon';
import Link from 'next/link';
import HeartIcon from '../../../public/icons/HeartIcon';
import configuration from '@/config';
import { usePlayer } from '@/lib/usePlayer';

interface props{
    title:string;
    thumbnail:string;
    username:string;
    count:string;
    color_name:string;
    allData:any
}

const PodcastListElement:React.FC<props> = ({count,thumbnail,color_name,title,username,allData}:props) => {
    const regex = /[?@\/#:\,;%+&=\{\}\[\]'\^-]/g
    const [{playPodcast}]=usePlayer()
    return (
        <div className="the-music">
        <div className="row mx-0 single-music justify-content-between">
            <div className="col-1 px-0 numbering">{count}</div>
            <div className="col-6 px-0 music">
                <div className="d-flex">
                    <div className="music-thumbnail" style={{ backgroundImage: `url("${thumbnail}")`,backgroundColor:`${color_name}`,border:`1px solid ${color_name}` }}></div>
                    <div className="music-info">
                        <Link href={`/a/${username.replaceAll(' ','-').toLowerCase()}/s/${title.replaceAll(regex,'').replaceAll(' ','-').toLowerCase()}`}><div className="music-title">{title}</div></Link>
                        <Link href={`/a/${username.replaceAll(' ','-').toLowerCase()}`} ><div className="music-artist" title={username}>{username}</div></Link>
                    </div>
                </div>
            </div>

            <div className="col-2 px-2 react">
                {/* <HeartIcon/> */}
                </div>
            <div className="col-1 px-0 play">
                <div className="d-flex justify-content-end">
                    <div></div>
                    <div onClick={()=>{playPodcast(title)}}>
                        <PlayIcon />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default PodcastListElement;
