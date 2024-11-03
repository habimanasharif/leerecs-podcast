/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import configuration from '@/config';
import { useAppSelector } from '@/redux/hook';

interface props{
    title:String
    children: React.ReactNode;
}
const AuthSideBarElement:React.FC<props> = (props) => {
   const {isMini}=useAppSelector(state=>state.uiData)
    const route = useRouter()
    const handleLogOut = (e: any) => {
        e.preventDefault()
        console.log("handle")
        localStorage.removeItem("userId")
        localStorage.removeItem("token")
        localStorage.removeItem("musician")
        localStorage.removeItem("userType")
        localStorage.removeItem("isContributor")
         route.push("/login")
    }
    return (
        <div className="sideElement" >
        <div className={`d-flex head-title align-items-center ${isMini? "justify-content-center":""}`}>
        <Link href="/"><img src={`${configuration.host}/assets/ico/logo.jpeg`} alt="" className="logo mr-3" /></Link>
           {!isMini&&(
            <div  className='d-flex pointer gap-1' style={{marginLeft:"auto"}} onClick={(e) => {
                handleLogOut(e)
            }}>
                {!isMini &&(<div className="text-name head-title   mr-2 mt-1">{props.title}</div>)}
        
        <div className='ml-2' style={{marginTop:"0.1rem"}}>
        {props.children}</div>
        </div>
           )}
           
        </div>
    </div>
    );
}

export default AuthSideBarElement;
