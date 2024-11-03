import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import '@/sass/music/musicElement.scss'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setShopActivityData } from '@/redux/data/uiData';
interface props {
    title:string;
    thumbnail:string;
    vendor:string;
    url:string;
    published?:boolean;
    
}
const ProductElement:React.FC<props> = ({thumbnail,vendor,title,url,published=true}:props) => {
  const dispatch=useAppDispatch()
  const {userId}=useAppSelector(state=>state.userAuth)
  const handlePublish=()=>{
    dispatch(setShopActivityData({
      albumName:title,
      owner:vendor,
      url:`https://leerecs.com/music/album/${title.replaceAll(' ','-').toLowerCase()}`,
      message:'Wants to add his album to the shop',
      action:'ADD',
      userId:userId,
      requester:userId.toString(),
   }))
   
  }
    return (
        <div className="col-md-3 px-2  card  music-e-card  shadow-sm">
        {/* <Link to={`/music/album/${props.albumId}`}> */}
        <div className="cover">
          <div className="cover-wrapper">
            <div>
            <Image
                alt="thumbnail"
                src={thumbnail}
                width={500}
                height={500}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
           
          
        </div>
        {vendor&&(
          <div>
          <Link href={`/a/${vendor.replaceAll(' ','-').toLowerCase()}`}><div className="song-name px-1 mt-2" >{title}</div></Link>
          <Link href={`/a/${vendor.replaceAll(' ','-').toLowerCase()}`}><div className="numbering mb-1 mt-1 px-1">By {vendor}</div></Link>
          {published?( <a href={url}  className='text-white border rounded px-4 text-center d-block ' target="_blank" rel="noopener noreferrer" > Buy </a>):
          (<div className='text-white border rounded px-4 text-center d-block ' 
            style={{cursor:'pointer'}}
          onClick={handlePublish}
          >ADD</div>)}
         
          </div>
        )}
        
      </div>
    );
}

export default ProductElement;
