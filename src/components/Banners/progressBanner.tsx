import React from 'react';
import CloseIcon from '../../../public/icons/closeIcon';
import '@/sass/loaders/progressBanner.scss'
interface props{
    status:boolean
    icon:React.ReactNode
    close:Function
    message:string
    width:string
    color:string

}
const ProgressBanner:React.FC<props> = ({status,icon,close,message,width,color}) => {
    return (
        <div id="progress_banner">
        <div className=" progress-container px-0">
                    <div className='cont'>
                    <div className={`progress-bar btn-success ${status?"successfull":""}`} style={{width:`${width}`,backgroundColor:`${color}`}}></div>
                    </div>
                    <div className='message fw-bold text-sucess-pane pl-2' style={{fontWeight:"bold"}} > {icon} <span dangerouslySetInnerHTML={{__html:message}}></span>  </div>
                    <div className='close' onClick={(e)=>{close(false)}}> <CloseIcon /></div>
                </div>
    </div>
    );
}

export default ProgressBanner;
