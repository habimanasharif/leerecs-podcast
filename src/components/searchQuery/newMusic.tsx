import React,{useEffect, useState} from 'react';
import Preloader from '../skeletons/preloader';
import Previous from '../../../public/icons/previous';
import Next from '../../../public/icons/next';
import { AllMUSIC, MUSIC_SEARCH_QUERY } from '@/app/api/graphql/queries';
import { useQuery } from '@apollo/client';
import '@/sass/music/newMusic.scss'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setShowPaywall } from '@/redux/data/uiData';
import MusicElement from '../music/musicElement';
import ShowMoreComponent from '../music/showMoreComponent';
interface MusicElement{
    title:string;
    thumbnail:string;
    file:string;
    username:string;
    color_name:string
}
const SearchMusic:React.FC<{setLoading:Function,searchQuery:string}> = ({setLoading,searchQuery}) => {
    const[page,setPage]=useState(1);
    const [countnumber, setcountnumber] = useState(5);
    const { loading, data, error } = useQuery(MUSIC_SEARCH_QUERY,{
      variables: { searchQuery },
    })
    
    const dispatch=useAppDispatch()
    const {userAuth}=useAppSelector(state=>state.userAuth)
   
    useEffect(()=>{
      if(!loading){
        setLoading(false);
      }

    },[loading, setLoading])
    const preloader = () => {
        const i =  Array.from({ length: countnumber }, (_, index) => index);
        return i.map(( item,id) => {
          return <Preloader  key={id}/>;
        });
      };
     
    return (
        <div id="new-music">
            <div className="d-flex justify-content-between">
            <h3>Trending Music</h3>
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
         {page >1 && (
                <div
                  className="previous-5 slider-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page-1)
                  }}
                >
                  <Previous />
                </div>
              )}
              <div
                className={`row card-deck`}
              >
                {data&&data.SearchInAllMusic.map(
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


             { <div
                    className="next-5 slider-icon"
                    onClick={(e) => {
                      e.preventDefault();
                     setPage(page+1)
                     if(!userAuth.isLogedIn){
                      dispatch(setShowPaywall())
                     }
                    }}
                  >
                    <Next />
                  </div>
                }
         </div>

          
        </div>
    );
}

export default SearchMusic;


