/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react';
import ModalWrapper from '../wrappers/modalWrapper';
import { ALLUSERFRIENDS } from '@/app/api/graphql/queries';
import { useQuery } from '@apollo/client';
import configuration from '@/config';
import Link from 'next/link';
import BeFriend from '../artist/beFriend';
import { useAppSelector } from '@/redux/hook';
import '@/sass/modals/friends.scss'

const Friends = () => {
    const {userId}=useAppSelector(state=>state.userAuth)
    const {showFriends}=useAppSelector(state=>state.uiData)
    const {data} = useQuery(ALLUSERFRIENDS,{variables:{
        userId
    },skip:!showFriends})
    const close=()=>{

    }
    return (
        <>
        {showFriends&&(
             <ModalWrapper close={close} title="Your Friends" width="500px">
             <div id="friends">
             <div className='friend_list'>
                    {data&&data.AllUserFriends.length===0&&(
                        <div className='text-center text-white'>You have no friends yet</div>
                    )}
                    {data&&data.AllUserFriends.map((user:any,index:number)=>(
                        <div className="row mt-2" key={index}>
                    <div className="col-1 py-2 text-white">{index+1}</div>
                    <div className="col-2">
                  <div className="artist"  title={user.name}>
                    <div className="artist-wrapper">
                      <div>
                        <img
                        style={{height:"100%"}}
                       
                          src={`${configuration.FILE_STORAGE_LINK}${user.picture}`}
                          alt=""
                          className="artist-img"
                          loading="lazy"
                          aria-hidden="false"
                        />
                      </div>
                    </div>
                  </div></div> <div className="col-4"> <Link href={`/a/${user.name.replaceAll(' ','-').toLowerCase()}`}
                  onClick={(e)=>{
                    // dispatch(setShowFriends())
                  }}
                  > <div className='friend-name py-2'>{user.name}</div></Link>
                  </div> <div className='col-5'><BeFriend userId={user.userId} buddie_list={user.buddie_list}/></div></div>
                  
                    ))}
                    
                </div>
                </div>

        </ModalWrapper>
        )}
       
        </>
    );
}

export default Friends;
