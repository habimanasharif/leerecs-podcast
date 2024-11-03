'use client'
import Ads from '@/components/podcast/ads';
import SelectedPodcastCard from '@/components/podcast/selectedPodcastCard';
import Suggestions from '@/components/podcast/suggestions';
import { setShowPaywall } from '@/redux/data/uiData';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
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

const Page:React.FC<any> = () => { 
  const [feedData, setFeedData] = useState<feed[]>([]);
  const [selected,setSelected] = useState<feed>()
  const [description,setDescription] =useState("")
  const [scrollCount,setScrollCount] = useState(1)
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const {userAuth}=useAppSelector(state=>state.userAuth)
  const dispatch=useAppDispatch()


  useEffect(() => {
      const fetchFeed = async () => {
          try {
            const response = await fetch('/api/podcasts');
            const data = await response.json();
            setFeedData(data.data);
            setSelected(data.data[0])
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
  
      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
  
      // Show modal when scrolling down
      if (!userAuth.isLogedIn&&scrollDirection === "down" && (window.scrollY >= (scrollCount * window.innerHeight) - 1)) {
        setScrollCount(scrollCount + 1);
        dispatch(setShowPaywall());
      }
  
      // Show modal when scrolling up
      if (!userAuth.isLogedIn&&scrollDirection === "up" && (window.scrollY <= ((scrollCount - 1) * window.innerHeight) + 1)) {
        setScrollCount(scrollCount > 1 ? scrollCount - 1 : 1); // Ensure scrollCount does not go below 1
        dispatch(setShowPaywall());
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, lastScrollTop, scrollCount, scrollDirection,userAuth]);
 
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
            artistTitle={selected.musicName}
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
