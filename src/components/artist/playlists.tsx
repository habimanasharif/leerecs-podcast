import React, { useEffect, useState } from 'react';
import Preloader from '../skeletons/preloader';
import { ALLPLAYLISTBYUSER } from '@/app/api/graphql/queries';
import { useQuery } from '@apollo/client';
import '@/sass/music/albumElement.scss'
import PodcastCard from '../music/podcastCard';
import PlaylistElement from '../music/playlistElement';
interface album {
    title: string;
    cover: string;
    username: string;
  
  }
  interface props {
    userId:number
    username:string
  }
const Playlists:React.FC<props> = ({userId,username}:props) => {
    const [podcast,setPodcast]=useState<any>()
    const [countnumber, setcountnumber] = useState(3);
    const { data, loading, error } = useQuery(ALLPLAYLISTBYUSER, {
        variables: { userId },
      });
      useEffect(()=>{
        const fetchFeed = async () => {
          try {
            const response = await fetch('/api/podcasts');
            const data = await response.json();
            data.data.forEach((item:any) => {
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
              {data&&podcast&&(
                <PodcastCard  cover={podcast.imageUrl} title={podcast.musicName} username={podcast.artist} />
              )}
            {data && (data.AllPlaylistsByUser.map(
            (playlist:album,index:number) =>(<PlaylistElement key={index} cover={playlist.cover} title={playlist.title} username={playlist.username} />)))}
        </div>
       
    </div>
    );
}

export default Playlists;
