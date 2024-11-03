import { LIKEMUSIC } from '@/app/api/graphql/mutation';
import { setInfoBanner } from '@/redux/data/uiData';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

const LikeMusic:React.FC<{topicId:number,children:React.ReactNode}> = ({topicId,children}) => {
     const [state, setstate] = useState(false)
     const dispatch = useAppDispatch()
     const path=usePathname()
    let id = state ? "heart-clicked":" "
    const {userId}=useAppSelector(state=>state.userAuth)
    const [AddMusicLike]=useMutation(LIKEMUSIC)
    const handleClick=async (e:any)=>{
        try {
            if(!userId){
               dispatch(setInfoBanner({state:true,page:path}))
                return
            }
            await AddMusicLike({variables:{
                music_id: topicId,
                userId,
            }})
            setstate(true)
            
        } catch (error) {
            
        }

    }
   
    return (
        <div onClick={handleClick} id={`${id}`}>
            {children}
        </div>
    );
}

export default LikeMusic;
