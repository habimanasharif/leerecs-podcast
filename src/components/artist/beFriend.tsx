import React, { useState } from 'react';
import FollowIcon from '../../../public/icons/followIcon';
import AddBaddie from '../wrappers/addBaddie';
import { useAppSelector } from '@/redux/hook';
interface props{
    buddie_list:[string],
    userId:number
}
const BeFriend:React.FC<props> = (props:props) => {
    const { userId}=useAppSelector(data=>data.userAuth)
    const [beFriendStatus,setBeFriendStatus] =useState(props.buddie_list.includes(userId.toString())?"Unfriend":"Befriend")
    
    const BefriendAction =(action: string,status:string)=>{
      
 }

    return (
        <AddBaddie myBuddieId={props.userId} Beaction={BefriendAction}>
        <div className='artist-btn text-center py-1 sider' style={{cursor:"pointer"}} >
      <FollowIcon/>
      <span className='' style={{cursor:'pointer'}}>{beFriendStatus} </span> </div>
          </AddBaddie>
    );
}

export default BeFriend;
