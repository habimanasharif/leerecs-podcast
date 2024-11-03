import React, { useState } from 'react';
import Preloader from '../skeletons/preloader';
import ShowMoreComponent from '../music/showMoreComponent';
import { useQuery } from '@apollo/client';
import { RECOMMENDEDMUSIC } from '@/app/api/graphql/queries';
import MusicElement from '../music/musicElement';
import '@/sass/music/newMusic.scss'
interface MusicElement{
    title:string;
    thumbnail:string;
    file:string;
    username:string;
    color_name:string
}
const MoreMusic:React.FC<{id:number,title:string}> = ({id,title}) => {
    const [countnumber, setcountnumber] = useState(5);
    const { loading, data} = useQuery(RECOMMENDEDMUSIC,{variables:{songId:id}})
    const preloader = () => {
        const i =  Array.from({ length: countnumber }, (_, index) => index);
        return i.map(( item,id) => {
          return <Preloader  key={id}/>;
        });
      };
    return (
        <div id="new-music">
            <div className="d-flex justify-content-between">
            <h3>{title}</h3>
              <div>
                <ShowMoreComponent
                  title="Show All Music"
                  link="/music/allmusic"
                />
              </div>
              </div>
              {loading && (
            <div className='row card-deck'>
              {preloader()}
            </div>
          )}
          <div className="slider">
             <div
                className="row card-deck"
              >
                {data&&data.RecommendedMusic.map(
                    (item:MusicElement,index:number)=>(
                    <MusicElement 
                    key={index}
                    title={item.title}
                    thumbnail={item.thumbnail}
                    file={item.file}
                    username={item.username}
                    color_name={item.color_name}

                     />))}


              </div>
              </div>
        </div>
    );
}

export default MoreMusic;
