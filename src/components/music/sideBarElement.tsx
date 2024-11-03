import { useAppSelector } from '@/redux/hook';
import React from 'react'

interface props{
    title:String
    children: React.ReactNode;
}

const SideBarElement:React.FC<props> = (props) => {
   const {isMini}=useAppSelector(state=>state.uiData)
    return (
        <div className={`${isMini ? "colorSideElement":" sideElement"}`} >
            <div className="d-flex">
                {props.children}
                {!isMini && (
                    <div className="text-name mt-1">{props.title}</div>
                )}
                
            </div>
        </div>
    )
}

export default SideBarElement
