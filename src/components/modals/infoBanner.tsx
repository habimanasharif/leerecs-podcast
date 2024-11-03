'use client'
import Link from "next/link";
import React, { useEffect } from "react";
import CloseIcon from "../../../public/icons/closeIcon";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setInfoBanner } from "@/redux/data/uiData";
import InfoIcon from "../../../public/icons/infoIcon";
import { usePathname } from "next/navigation";
import '@/sass/modals/info.scss'


const InfoBanner = () => {
    const dispatch =useAppDispatch()
    const path=usePathname()
    const {showInfoBanner,infoShowPage}=useAppSelector((state)=>state.uiData)
    useEffect(()=>{
      if(showInfoBanner && infoShowPage !==path){
        dispatch(setInfoBanner({state:false,page:""}))
      }
      },[dispatch, infoShowPage, path, showInfoBanner])
  return (
    <>
    {showInfoBanner&&(
       <div id="info">
       <div className="w-100 position-relative">
   <div
     className="info-banner mx-auto position-fixed on-top px-2"
     style={{ zIndex: "2000", top: "20px", left: "12.5%" }}
   >
     <div className="btn-success bg-info px-3">
       <InfoIcon />

       <div className="col-md-11 text-sucess-pane">
         <div
           style={{ lineHeight: 1.3 }}
           onClick={() => {
             dispatch(setInfoBanner({state:false,page:""}));
           }}
         >
           Please
           <Link href="/login" className="banner-link">
             log in
           </Link>
           to your account to interact{" "}
         </div>
       </div>
       <div></div>

       <div
         className="close-icon"
         onClick={(e) => {
           e.preventDefault();
           dispatch(setInfoBanner({state:false,page:""}));
         }}
       >
         <CloseIcon />
       </div>
     </div>
   </div>
   </div>
   </div>
    )}
    </>
   
  );
};

export default InfoBanner;
