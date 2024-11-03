import { ADDBUDDIE } from '@/app/api/graphql/mutation';
import { setInfoBanner } from '@/redux/data/uiData';
import { useAppSelector } from '@/redux/hook';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hook';
import { usePathname } from 'next/navigation';


interface props{
    myBuddieId:Number;
    Beaction:any;
    children:React.ReactNode
}
const AddBaddie:React.FC<props> = ({myBuddieId,Beaction,children}) => {
    const {userId,userAuth}=useAppSelector(state=>state.userAuth)
    const [state, setstate] = useState(false)
    const [Buddie]=useMutation(ADDBUDDIE)
    const dispatch=useAppDispatch()
    const path=usePathname()
    let id = state ? "user-followed":" "
    const handleClick=async()=>{
        try {
           if(userAuth.isLogedIn){
            Beaction("Loading")
            const result=await Buddie({variables:{
                myId:userId,
                myBuddieId: myBuddieId,
            }})
            if (result){
                Beaction(result.data.AddBuddie.desc)
                setstate(true)
            }

           }else{
            dispatch(setInfoBanner({state:true,page:path}))
            return
           }
           
        } catch (error) {
            
        }
    }
    return (
        <div onClick={handleClick} id={`${id}`}>
            {children}
        </div>
    );
}

export default AddBaddie;
