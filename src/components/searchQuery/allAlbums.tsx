import React, { useState } from "react";
import Preloader from "../skeletons/preloader";
import { ALLALBUMS, SEARCH_ALBUMS } from "@/app/api/graphql/queries";
import { useQuery } from "@apollo/client";
import '@/sass/music/artistAlbums.scss'
import ShowMoreComponent from "../music/showMoreComponent";
import AlbumElement from "../music/albumElement";

interface album {
    title: string;
    cover: string;
    username: string;
  
  }
const SearchAlbums:React.FC<{loading:boolean,searchQuery:string}> = ({loading:isLoading,searchQuery}) => {
  const [countnumber, setcountnumber] = useState(5);
  const { loading, data, error } = useQuery(SEARCH_ALBUMS,{fetchPolicy: 'cache-first',skip:isLoading,variables: { searchQuery }})
  const preloader = () => {
    const i = Array.from({ length: countnumber }, (_, index) => index);
    return i.map((item, id) => {
      return <Preloader key={id} />;
    });
  };
  return (
    <div id="new-album" className="mt-3">
      <div className="d-flex justify-content-between">
        <h3>Trending Albums</h3>
        <ShowMoreComponent title="Show More Albums" link="/music/allalbums" />
      </div>
      {(isLoading||loading) && <div className="row card-deck">{preloader()}</div>}
      <div className='row card-deck' >
       {data&& data.AllAlbumsSearch.map((item:album,index:number)=>(
        <AlbumElement
        key={index}
        title={item.title}
        username={item.username}
        cover={item.cover}
        />))}
      </div>
    </div>
  );
};

export default SearchAlbums;
