import React,{useState} from 'react';
import PlusIcon from '../../../public/icons/plusIcon';
import MinusIcon from '../../../public/icons/minusIcon';
interface song{
    musicId:number,
    memberId:number,
    imageId:number
}
interface props{
    title: string;
    music:song
    cover:string;
    audio:string;
    musicId:number;
    color_name:string;
    addSongFunction:any
    selectedSongs:song[]
    removeSongFunction:any
    memberId:number
    imageId:number
    inalbum?:number
    type:string
}

const SingleSong:React.FC<props> = (props) => {
    const [inalbum,setAlbum]=useState(props.inalbum!==undefined?props.inalbum:0)
    
    return (
        <div>
            <div className='  row text-white mt-2 ' style={{columnGap:"5px"}}>
                {(props.selectedSongs.findIndex(s=>s.musicId===props.music.musicId)===-1&&inalbum===0)?(<div className='col-1' onClick={(e)=>{
                e.preventDefault();
                props.addSongFunction(props.music)
                setAlbum(1)
            }}><PlusIcon/></div>):(<div className='col-1' onClick={(e)=>{
                e.preventDefault();
                props.removeSongFunction(props.music)
                setAlbum(0)
            }}><MinusIcon/></div>)}
            <div className='col-2'>
                  <div className="music-thumbnail" style={{ backgroundImage: `url("${props.cover}")`,backgroundColor:`${props.color_name}`,border:`1px solid ${props.color_name}` }}></div>
                  </div> <div className='col-6'> {props.title}</div> 
            </div>
        </div>
    );
}

export default SingleSong;
