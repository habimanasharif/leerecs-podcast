import React, { useState } from 'react';
import Preloader from '../skeletons/preloader';
import ShowMoreComponent from './showMoreComponent';
import { useQuery } from '@apollo/client';
import {ALLPLAYLISTS } from '@/app/api/graphql/queries';
import PlaylistElement from './playlistElement';
interface album {
    title: string;
    cover: string;
    username: string;
  
  }
const AllPlaylist:React.FC<{loading:boolean}> = ({loading:isLoading}) => {
    const [countnumber, setcountnumber] = useState(5);
  const { loading, data} = useQuery(ALLPLAYLISTS,{fetchPolicy: 'cache-first',skip:isLoading})
  const preloader = () => {
    const i = Array.from({ length: countnumber }, (_, index) => index);
    return i.map((item, id) => {
      return <Preloader key={id} />;
    });
  };
  return (
    <div id="new-album" className="mt-3">
      <div className="d-flex justify-content-between">
        <h3>Trending Playlists</h3>
        <ShowMoreComponent title="Show More Playlists" link="/music/allplaylist" />
      </div>
      {(isLoading||loading) && <div className="row card-deck">{preloader()}</div>}
      <div className='row card-deck' >
       {data&& data.AllPlaylists.map((item:album,index:number)=>(
        <PlaylistElement
        key={index}
        title={item.title}
        username={item.username}
        cover={item.cover}
        />))}
      </div>
    </div>
  );

}

export default AllPlaylist;
