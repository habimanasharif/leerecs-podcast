'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React,{useState,useEffect} from 'react';
import PodcastCard from '../podcast/podcastCard';
import '@/sass/home/events.scss'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setShowPaywall } from '@/redux/data/uiData';

interface props{feedData:any,contentData:any}
const MusicianEvents:React.FC<props> = ({feedData,contentData}:props) => {
  const {userAuth}=useAppSelector(state=>state.userAuth)
    const [currentPage, setcurrentPage] = useState<number>(0);
    const [pageCount, setpageCount] = useState<number>(0);
    const [music, setMusic] = useState<any>([]);
    const dispatch= useAppDispatch()
    useEffect(() => {
      var counter = 0;
      var pageCounter = 0;
      var intermediateArray:any = [];
        if(feedData?.data){
            var musicArray:any = [];
            feedData.data.forEach((item:any, idx:number)=>{
 
                  if (counter === 4) {
                    musicArray.push(intermediateArray);
                    counter = 0;
                    pageCounter = pageCounter + 1;
                    intermediateArray = [];
                  }
                  if (counter <= 4) {
                    counter = counter + 1;
                    intermediateArray.push(item);
                  }

            })

            if (musicArray.length > 0 && music.length === 0) {
                setMusic(musicArray);
                setpageCount(musicArray.length);
              } 
        }

    },[feedData, music.length])

    const ListOfMusic = () => {
        return music[currentPage].map((singleMusic:any, idx:number) => {
          return (
            <PodcastCard
            key={idx}
              imageUrl={singleMusic.imageUrl}
              musicUrl={singleMusic.musicUrl}
              artist={singleMusic.artist}
              musicName={singleMusic.musicName}
              dataType={"music"}
            />
          );
        });
      };

    const listOfPages = () => {
        return (
          <div className="pagination-buttons mt-3">
            {Array.from(Array(pageCount).keys()).map((singleCount, idx) => {
              if(idx<3){
              return (
                <div key={idx}
                  onClick={(e) => {
                    
                    if(idx>0 &&!userAuth.isLogedIn){
                      dispatch(setShowPaywall())
                    }else{
                      setcurrentPage(idx);
                    }
                  }}
                  className={`${idx === currentPage && "active"}`}
                >
                </div>
              );}
            })}
          </div>
        );
      };


    return (
        <div className="container-fluid" id="events">
        <div className="header">
          <div className="">
            <h1 className="text-lg text-light main-title">
              {contentData?.data?.spotlight.title}
            </h1>
            <p className="description-text">
            {contentData?.data?.spotlight.description}  
            {!userAuth.isLogedIn&&(<span  onClick={()=>{
              dispatch(setShowPaywall())
            }} className="moreLink"> See all episode <FontAwesomeIcon icon={['fas', 'arrow-right']} /></span>)}
            {userAuth.isLogedIn&&(<Link href="/podcast"><span className="moreLink"> See all episode <FontAwesomeIcon icon={['fas', 'arrow-right']} /></span></Link>)}
            
            </p>
          </div>
  
          <div className="pagination d-flex flex-column justify-content-end">
            {pageCount > 0 && <div className="">{listOfPages()}</div>}
          </div>
        </div>
  
        {music.length > 0 && <div className="box-wrapper m-top">{ListOfMusic()}</div>}
      </div>
    );
}

export default MusicianEvents;
