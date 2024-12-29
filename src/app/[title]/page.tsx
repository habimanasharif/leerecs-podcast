'use client'
import Ads from '@/components/podcast/ads';
import SelectedPodcastCard from '@/components/podcast/selectedPodcastCard';
import Suggestions from '@/components/podcast/suggestions';
import React, { useEffect, useState } from 'react';

interface feed{
    imageUrl: string,
    musicUrl: string,
    artist: string,
    musicName: string,
    description: string,
}
const data = {
  "vibrant": "#f90a90",
  "lightVibrant": "#dd9bbb",
  "darkVibrant": "#740532",
  "muted": "#88747c",
  "lightMuted": "#c8bcb4",
  "darkMuted": "#542540"
}

const Page:React.FC<any> = ({ params }: { params: { title: string } }) => {
    
    const [feedData, setFeedData] = useState<feed[]>([]);
    const [selected,setSelected] = useState<feed>()
    const [description,setDescription] =useState("")
      useEffect(() =>{
        
        const filterTitle = (title?:string) => {
      
      if(title){
      const id =decodeURIComponent(title)
          const element = feedData.filter(feed => feed.musicName===id)
          if (element){
            return element[0]
          }
          else return feedData[0]
        }
        else {
          return feedData[0]
        }

          };

      if(Array.isArray(feedData)){
        const details = filterTitle(params.title as string);
        setSelected(details)
      }
      },[params.title,feedData])

    useEffect(() => {
        const fetchFeed = async () => {
            try {
              const response = await fetch('/api/podcasts');
              const data = await response.json();
              setFeedData(data.data);
            } catch (error) {
              //console.error('Error fetching feed:', error);
            }
          };

          const fetchContent = async () => {
            try {
              const response = await fetch('/api/podDesc/');
              const data = await response.json();
              setDescription(data.data.data.content);
            } catch (error) {
              
            }
          }
          fetchFeed()   
          fetchContent()   
        
    },[])
   console.log(selected)
    return (
        <>
        <div
        id="podcast"
        className="container-fluid mt-3"
      >

        <div
          className="row mx-0"
        > 
         <div
            className="col-lg-7 playlist-section p-xl-0"
            style={{
              color: "white",
            }}
          >
            {selected&& (
              <SelectedPodcastCard 
              artistImage={selected.imageUrl}
              artistTitle={selected.artist}
              musicName={selected.musicName}
              musicUrl={selected.musicUrl}
              artistBio={description}
              data={data}
              />
            )}
            

          </div>
          <div className="col-lg-5">
            <Ads adwidth={500} adheight={270}/>
          </div>

          <div
            className="col-lg-12 suggestion-section px-3"
            style={{ background: "rgba(73, 73, 73, 0.47) none repeat scroll 0% 0%", marginTop:"20px"}}
          >
        <Suggestions feedData={feedData}/>    

          </div>
        
        </div>


      </div>
        </>
    );
}

export default Page;
