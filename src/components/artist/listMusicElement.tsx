import React, { useEffect, useState } from 'react';
import PlayIcon from '../../../public/icons/playIcon';
import Link from 'next/link';
import HeartIcon from '../../../public/icons/HeartIcon';
import configuration from '@/config';
import { usePlayer } from '@/lib/usePlayer';
import LikeMusic from '../wrappers/likeMusic';
import { ISMUSICLIKEDBYUSER } from '@/app/api/graphql/queries';
import { useQuery } from '@apollo/client';
import { useAppSelector } from '@/redux/hook';

interface props{
    title:string;
    thumbnail:string;
    username:string;
    count:string;
    color_name:string;
    allData:any,
    topic_id:number
}
const ListMusicElement:React.FC<props> = ({count,thumbnail,color_name,title,username,allData,topic_id}:props) => {
     const regex = /[?@\/#:\,;%+&=\{\}\[\]'\^-]/g
     const [like, setLike] = useState(false);
     const [{playSingle}]=usePlayer()
     const {userId}=useAppSelector(state=>state.userAuth)
     const { data, error } = useQuery(ISMUSICLIKEDBYUSER, {
        variables: { userId, topicId:topic_id },
      });

      useEffect(() => {
        if (data) {
          setLike(true);
        }
        if (error) {
          setLike(false);
        }
      }, [data, error]);
    return (
        <div className="the-music">
        <div className="row mx-0 single-music justify-content-between">
            <div className="col-1 px-0 numbering">{count}</div>
            <div className="col-6 px-0 music">
                <div className="d-flex">
                    <div className="music-thumbnail" style={{ backgroundImage: `url("${configuration.FILE_STORAGE_LINK}${thumbnail}")`,backgroundColor:`${color_name}`,border:`1px solid ${color_name}` }}></div>
                    <div className="music-info">
                        <Link href={`/a/${username.replaceAll(' ','-').toLowerCase()}/s/${title.replaceAll(regex,'').replaceAll(' ','-').toLowerCase()}`}><div className="music-title">{title}</div></Link>
                        <Link href={`/a/${username.replaceAll(' ','-').toLowerCase()}`} ><div className="music-artist" title={username}>{username}</div></Link>
                    </div>
                </div>
            </div>

            <div className="col-2 px-2 react"><LikeMusic topicId={topic_id}> <div onClick={() => {
                    if (userId) {
                      setLike(!like);
                    }
                  }}><HeartIcon like={like}/></div></LikeMusic></div>
            <div className="col-1 px-0 play">
                <div className="d-flex justify-content-end">
                    <div></div>
                    <div onClick={()=>{playSingle(allData,parseInt(count)-1)}}>
                        <PlayIcon />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ListMusicElement;
