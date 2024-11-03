import React, { useState } from 'react';
import ShowMoreComponent from '../music/showMoreComponent';
import Preloader from '../skeletons/preloader';
import { useQuery } from '@apollo/client';
import { OTHERARTIST } from '@/app/api/graphql/queries';
import ArtistElement from '../music/artistElement';
import '@/sass/music/featuredArtist.scss'
interface Artist{
    username:string
        profileImg:string
        userId:string
        criteria:string
}
const MoreArtist:React.FC<{id:number,title:string}> = ({id,title}) => {
    const [countnumber, setcountnumber] = useState(5)
    const { data,loading} = useQuery(OTHERARTIST, {
        variables: { userId:id },
      });
    const preloader = () => {
        const i =  Array.from({ length: countnumber }, (_, index) => index);
        return i.map(( item,id) => {
          return <Preloader  key={id}/>;
        });
      };
    return (
        <div id="featured-artists">
            <div className="d-flex justify-content-between">
                    <h3>{title}</h3>
                    <ShowMoreComponent title="All Featured Artists" link="/music/allfeatured" />
                   
                </div>
                {loading && (
                        <div className='row card-deck '>
                        {preloader()}
                    </div>)}
                    <div className='slider'>
                    <div className='row card-deck '>
                    {
                            data && data.MoreArtist.map(
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

                    </div>
            
        </div>
    );
}

export default MoreArtist;
