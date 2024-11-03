import React, { useState } from "react";
import ShowMoreComponent from "./showMoreComponent";
import Preloader from "../skeletons/preloader";
import { ALLALBUMS } from "@/app/api/graphql/queries";
import { useQuery } from "@apollo/client";
import '@/sass/music/artistAlbums.scss'
import AlbumElement from "./albumElement";
interface album {
    title: string;
    cover: string;
    username: string;
  
  }
const AllAlbums:React.FC<{loading:boolean}> = ({loading:isLoading}) => {
  const [countnumber, setcountnumber] = useState(5);
  const { loading, data, error } = useQuery(ALLALBUMS,{fetchPolicy: 'cache-first',skip:isLoading})
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
       {data&& data.AllAlbums.map((item:album,index:number)=>(
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

export default AllAlbums;
