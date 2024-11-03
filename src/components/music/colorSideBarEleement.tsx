import React, { ReactNode } from 'react'

interface props{
    title:String
    children:ReactNode
}

const ColorSideBarElement:React.FC<props> = (props) => {
    return (
        <div className="colorSideElement">
            <div className="d-flex">
                {props.children}
            </div>
        </div>
    )
}

export default ColorSideBarElement