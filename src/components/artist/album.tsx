import { ALLALBUMBYUSER } from '@/app/api/graphql/queries';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Preloader from '../skeletons/preloader';
import AlbumElement from '../music/albumElement';
interface album {
    title: string;
    cover: string;
    username: string;
  
  }
  interface props {
    userId:number
  }
const Album:React.FC<props> = ({userId}:props) => {
    const [countnumber, setcountnumber] = useState(3);
    const { data, loading, error } = useQuery(ALLALBUMBYUSER, {
        variables: { userId },
      });
    const preloader = () => {
        const i = Array.from({ length: countnumber }, (_, index) => index);
        return i.map((item, id) => {
          return <Preloader key={id} />;
        });
      };
    return (
        <div id="Artist-new-playlist">  
        {loading && (
            <div className='row card-deck'>
                {preloader()}
            </div>)}
            <div className='row card-deck'>
            {data && (data.AllAlbumByUser.map(
            (playlist:album,index:number) =>(<AlbumElement key={index} cover={playlist.cover} title={playlist.title} username={playlist.username} />)))}
        </div>
       
    </div>
    );
}

export default Album;
