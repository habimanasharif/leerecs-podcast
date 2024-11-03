import { generateDate } from '@/utils/generateDate';
import Link from 'next/link';
import React, { useState } from 'react';
import VerifiedIcon from '../../../public/icons/verifyIcon';
import HeartIcon from '../../../public/icons/HeartIcon';
import EyeIcon from '../../../public/icons/EyeIcon';
import PlayIcon from '../../../public/icons/playIcon';
import FollowIcon from '../../../public/icons/followIcon';
import { useAppSelector } from '@/redux/hook';
interface props{
    img:string,
    name:string
    message:string
    type:string
    music:string| null
    buddie_list:string
    owner_name:string
    date:string
    seen:boolean
    is_verified:boolean
}
enum Action{
    LOADING="LOADING",
    ADDED="ADDED",
   REMOVED="removed"



}

const NotificationCard:React.FC<props> = ({img,name,message,type,music,buddie_list,owner_name,date,seen,is_verified}:props) => {
    const regex = /[?@\/#:\,;%+&=\{\}\[\]\^-]/g
    const {userId}=useAppSelector(state=>state.userAuth)
    const [beFriendStatus,setBeFriendStatus] =useState(buddie_list.includes(userId.toString())?" Unfriend":" Befriend")
    const BefriendAction =(action:Action)=>{
        if(action===Action.LOADING){
            if(beFriendStatus==="Befriend"){
            setBeFriendStatus(" Unfriending...");}
            else{
                setBeFriendStatus(" Befriending...")
            }
        }
      if(action===Action.ADDED){
    setBeFriendStatus(" Unfriend");
    }
 if(action===Action.REMOVED){
    setBeFriendStatus(" Befriend");
 }

    }
    return (
        <div className='d-flex notification align-items-center px-2' style={{backgroundColor:`${!seen?"#282828":"#282828"}`}}>
        {seen &&  <div className='active-note mr-2 '></div>}
        {seen &&  <div className='active-note mr-2 ' style={{backgroundColor:"transparent"}}></div>}

        
         <div className='notification-image'>
        <div><div className="artist"  title={name}>
                 <div className='artist-wrapper'>
                     {is_verified &&(<div className="verified">
                       <VerifiedIcon/>
                     </div>)}
                     
                     <div>
                 <img  src={img} alt="" className='artist-img' loading='lazy' aria-hidden="false"/>
                 </div>
                 </div>
             </div></div>
             </div>
        <div className='notification-msg ml-3'>
         {is_verified&&(<Link href={`/a/${name.replaceAll(" ","-").toLowerCase()}`}>
         <span className='highlight'> {name}&nbsp;</span>
         </Link>)}
         {!is_verified&&(<Link href={`/a/${name.replaceAll(" ","-").toLowerCase()}`}>
         <span className='highlight'> {name}&nbsp;</span>
         </Link>)}
         
         {message.includes("</span>")&&message.split("</span>")[1]}
         {!message.includes("</span>")&&message}
         <div className="date">
             {generateDate(date)}
         </div>
         
         </div>
        
          
     {type==="like" && (
         <Link href={`/a/${owner_name.replaceAll(" ","-").toLowerCase()}/s/${music?.toLowerCase().replaceAll(regex,'').replaceAll(" ","-")}`}>
     <div className='notification-type d-flex justify-content-center align-items-center' style={{backgroundColor:"#F8107D"}}>
     <HeartIcon like={true}/>
     </div>
     </Link>
     ) }
     {type==="view" && (<Link href={`/a/${owner_name}`}><div className='notification-type d-flex justify-content-center align-items-center' style={{backgroundColor:"rgb(122,57,237,1)"}}>
     <EyeIcon/>
     </div></Link>) }
     {type==="play"&&music && (
         <Link href={`/a/${owner_name.replaceAll(" ","-").toLowerCase()}/s/${music.toLowerCase().replaceAll(regex,'').replaceAll(" ","-")}`}>
     <div className='notification-type d-flex justify-content-center align-items-center' style={{backgroundColor:"rgb(245,158,12,1)"}}>
     <PlayIcon/>
     </div>
     </Link>
     ) }
     {type==="new"&&music && (
         <Link href={`/a/${name.replaceAll(" ","-").toLowerCase()}/s/${music.toLowerCase().replaceAll(regex,'').replaceAll(" ","-")}`}>
     <div className='notification-type d-flex justify-content-center align-items-center' style={{backgroundColor:"rgb(245,158,12,1)"}}>
     <PlayIcon/>
     </div>
     </Link>
     ) }
     {type==="friend" && (
         <Link href={`/a/${owner_name}`}>
     <div className='notification-type d-flex justify-content-center align-items-center' style={{backgroundColor:"rgb(33,76,162,1)"}}>
     <FollowIcon/>
     </div>
     </Link>
     ) }
     </div>
    );
}

export default NotificationCard;
