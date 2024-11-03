import Link from 'next/link';
import React from 'react'
import AllIcon from '../../../public/icons/allIcon';
import '@/sass/music/showMore.scss'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setShowPaywall } from '@/redux/data/uiData';

interface props{
    title:String;
    link:string;
}



const ShowMoreComponent:React.FC<props> = (props) => {
    const {userAuth}=useAppSelector(data=>data.userAuth)
    const dispatch=useAppDispatch()
    return (
        <div id="show-more">
            {!userAuth.isLogedIn&&props.title==='Show All Music'?(
                <div className="d-flex justify-content-between show-more" style={{cursor:"pointer"}} onClick={()=>{
                    dispatch(setShowPaywall())
                }} >
                
                    <div className="more" style={{color:"#bfbfbf !important"}}>{props.title}</div>
                    
                    <div className="show-more-icon">
                        <AllIcon />
                    </div>
                </div>
               ):( <Link href={props.link}>
                <div className="d-flex justify-content-between show-more">
                
                    <div className="more" style={{color:"#bfbfbf !important"}}>{props.title}</div>
                    
                    <div className="show-more-icon">
                        <AllIcon />
                    </div>
                </div>
                </Link>)}
          
        </div>
    )
}

export default ShowMoreComponent
