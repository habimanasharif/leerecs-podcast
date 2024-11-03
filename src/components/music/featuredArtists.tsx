import React, { useState} from 'react';
import ShowMoreComponent from './showMoreComponent';
import Preloader from '../skeletons/preloader';
import { useQuery } from '@apollo/client';
import { ALLARTISTS } from '@/app/api/graphql/queries';
import Previous from '../../../public/icons/previous';
import Next from '../../../public/icons/next';
import '@/sass/music/featuredArtist.scss'
import ArtistElement from './artistElement';
import { usePathname } from 'next/navigation';
interface Artist{
    username:string
        profileImg:string
        userId:string
        criteria:string
}

const FeaturedArtists = () => {
    const [countnumber, setcountnumber] = useState(5)
    const[page,setPage]=useState(1)
    const [next5,setNext5]=useState(0)
    const location=usePathname()
    
    const { loading, data, error } = useQuery(ALLARTISTS,{
        variables: { page:page,limit:5},
      })
    const preloader = () => {
        const i =  Array.from({ length: countnumber }, (_, index) => index);
        return i.map(( item,id) => {
          return <Preloader  key={id}/>;
        });
      };
    return (
        <div id="featured-artists">
             <div className="d-flex justify-content-between">
                    <h3>{location==="/music/allfeatured"?"All Artist":"Trending artists"}</h3>
                    <ShowMoreComponent title="All Featured Artists" link="/music/allfeatured" />
                   
                </div>
                {loading && (
                        <div className='row card-deck '>
                        {preloader()}
                    </div>)}

                    <div className='slider'>
                    {page>1 &&(
                            <div className='previous-5 slider-icon' onClick={(e)=>{
                                e.preventDefault()
                                setPage(page-1)
                            }}><Previous/></div>
                        )}
                        <div className='row card-deck ' style={{transform:`translate3d(${next5}px,0px,0px)`}}>
                        {
                            data && data.AllArtist.map(
                                (item:Artist,index:number)=>(
                                <ArtistElement
                                key={index}
                                artistName={item.username}
                                artistProfile={item.profileImg}
                                userId={parseInt(item.userId)}
                                />
                            ))
                        }
                        </div>

                       
                        <div className='next-5 slider-icon' onClick={(e)=>{
                            e.preventDefault()
                           
                           setPage(page+1)
                            
                        }}> <Next/></div>
                    

                    </div>
 

        </div>
    );
}

export default FeaturedArtists;
