import React, { useEffect, useState } from 'react';
import SingleMusicPreloader from '../skeletons/singleMusic';
import { ALLMUSICBYARTIST } from '@/app/api/graphql/queries';
import { useQuery } from '@apollo/client';
import ListMusicElement from './listMusicElement';
import PodcastListElement from './podcastListElement';
interface props{
    userId:number
    username:string
    setSongs:any
}
interface Music{
    title:string;
    thumbnail:string;
    username:string;
    count:number;
    color_name:string;
    topicId:number
}
const ArtistMusic:React.FC<props> = ({userId,username,setSongs}:props) => {
    const [podcast,setPodcast]=useState<any>()
    const { data, loading } = useQuery(ALLMUSICBYARTIST, {
        variables: { userId },
      });
      useEffect(()=>{
        const fetchFeed = async () => {
          try {
            const response = await fetch('/api/podcasts');
            const data = await response.json();
            data.data.forEach((item:any,index:number) => {
              const name =item.musicName.split(" with ");
              if(name[1].toLowerCase().includes(username.toLowerCase())) {
                setPodcast(item)
            }
            })
            // setFeedData(data);
          } catch (error) {
            //console.error('Error fetching feed:', error);
          }
        };
        fetchFeed()
      })
      useEffect(()=>{
         if(!loading){
            setSongs(data.AllMusicByArist.length)

         }
      },[data, loading, setSongs])
    return (
        <div className="col-12 col-md-12 col-lg-8  ">
             <div className="table-heading ">
             <div className="row mx-0 single-music-header justify-content-between" style={{ marginLeft:0,marginRight:0,}}>
                 <div className="col-1 px-0 numbering">#</div>
                 <div className="col-5 px-0 music">
                     <div className="d-flex">
                         <div className="music-thumbnail" ></div>
                         <div className="music-info">
                             <div className="music-title">Title</div>
                         </div>
                     </div>
                 </div>
                 <div className="col-2  react">React</div>
                 <div className="col-1 px-0 play">
                     <div className="d-flex justify-content-end">
                         <div></div>
                         <div >
                             Play
                         </div>
                     </div>
                 </div>
             </div>
             <div className="col-md-12 px-0"><hr /></div>
         </div>
         {loading && (<SingleMusicPreloader />)}
         {data&&podcast && (<PodcastListElement
         count={(0).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
        })}
        username={podcast.artist}
        thumbnail={podcast.imageUrl}
        color_name={"#F8107D"}
        title={podcast.musicName}
        allData={[podcast]}
         />)}
         {data&&data.AllMusicByArist.map((music: Music, count: number)=>(
            <ListMusicElement
            key={count} 
            count={(count + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
            })}
            username={music.username}
            thumbnail={music.thumbnail}
            color_name={music.color_name}
            title={music.title}
            allData={data.AllMusicByArist}
            topic_id={music.topicId}
             />
            ))}

            
        </div>
    );
}

export default ArtistMusic;
