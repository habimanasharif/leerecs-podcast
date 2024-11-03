import React from 'react'
import '@/sass/loaders/preloader.scss'

export default function SingleMusicPreloader() {
    const loop=()=>{
        let i=[0,1,2,3,4]
        return i.map((key:number)=>{
            return <div className="single-preloader" key={key}></div>
        })
    }
    return (
        <div id="music-preloader">
            {loop()}
        </div>
    )
}
