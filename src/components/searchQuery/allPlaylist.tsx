import React, { useState } from 'react';
import Preloader from '../skeletons/preloader';
import { useQuery } from '@apollo/client';
import {ALLPLAYLISTS, SEARCH_PLAYLIST_QUERY } from '@/app/api/graphql/queries';
import ShowMoreComponent from '../music/showMoreComponent';
import PlaylistElement from '../music/playlistElement';
interface album {
    title: string;
    cover: string;
    username: string;
  
  }
const SearchPlaylist:React.FC<{loading:boolean,searchQuery:string}> = ({loading:isLoading,searchQuery}) => {
    const [countnumber, setcountnumber] = useState(5);
  const { loading, data} = useQuery(SEARCH_PLAYLIST_QUERY,{fetchPolicy: 'cache-first',skip:isLoading,variables: { searchQuery }})
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
       {data&& data.AllPlaylistsSearch.map((item:album,index:number)=>(
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

export default SearchPlaylist;
