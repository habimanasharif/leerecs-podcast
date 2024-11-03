'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React, { useEffect } from 'react';
import CloseIcon from '../../../public/icons/closeIcon';
import Info from './infoBanner';
import { setMissingTrackBanner } from '@/redux/data/uiData';
import '@/sass/modals/info.scss'
import { usePathname } from 'next/navigation';

const MissingTrack = () => {
    const {showMissingTrackBanner,infoShowPage}=useAppSelector((state)=>state.uiData)
    const dispatch=useAppDispatch()
    const path =usePathname()
    useEffect(()=>{
      if(showMissingTrackBanner && infoShowPage !==path){
        dispatch(setMissingTrackBanner ({state:false,page:""}))
      }
      },[dispatch, infoShowPage, path, showMissingTrackBanner])
    return (
      <>
      {showMissingTrackBanner&&(
  <div id="info">
  <div className="w-100 position-relative">
<div className="info-banne mx-auto position-fixed on-top px-2" style={{zIndex:"2000",top:"20px",left:"12.5%"}}>
<div className="btn-success bg-danger px-3">
   <Info/>
  <div className="col-md-11 text-sucess-pane">
    <div style={{lineHeight:1.3}}> Oops! unexpected error found with this track.  The author has been notified. </div>
   
  </div>
  <div></div>

  <div className='close-icon' onClick={(e)=>{
         e.preventDefault();
         dispatch(setMissingTrackBanner({state:false,page:""}))
    }}>
    <CloseIcon/></div>
</div>
</div>
</div>
</div>
)
      }
      </>
       
    );
}

export default MissingTrack;
