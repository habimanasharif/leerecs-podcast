/* eslint-disable @next/next/no-img-element */
import { OTHERARTIST } from '@/app/api/graphql/queries';
import configuration from '@/config';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

interface props {
    userId:number
}
interface artist {
    profileImg:string
    username:string
}
const MoreArtists:React.FC<props> = ({userId}:props) => {
    const { data} = useQuery(OTHERARTIST, {
        variables: { userId },
      });

     
    return (
        <div className="col-sm-12 col-md-12   col-lg-4 mb-5">
    <h5 className='mt-3' style={{color:"#fff",fontSize:"bold"}}>More Artist</h5>
        { data &&(data.MoreArtist.map((artist:artist,index:number)=>{
            if(index<3)
            {return( <div className='row song-owner py-2 mt-1' style={{ marginLeft:0,marginRight:0,}} key={index}>
            <div className='col-2 col-md-2 col-sm-2 col-lg-4'>
            <div className="artist"  title={artist.username}>
                    <div className='artist-wrapper'>
                        <div>
                    <img  src={`${configuration.FILE_STORAGE_LINK}${artist.profileImg}`} alt="" className='artist-img' loading='lazy' aria-hidden="false"/>
                    </div>
                    </div>
                </div>
                </div>
                <div className='col-6 mt-lg-2 mt-md-3 mt-sm-3'>
                   <Link style={{color:"#fff"}} href={`/a/${artist.username.replaceAll(' ','-').toLowerCase()}`}> <div className='artist-name ' title={artist.username}>{artist.username}</div></Link>
                    <div className='artist-title'>Musician</div>
                </div>
        </div>)}})
       )}
       </div>
    );
}

export default MoreArtists;
