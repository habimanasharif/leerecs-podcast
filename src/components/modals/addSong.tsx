import React,{useState} from 'react';
import SearchIcon from '../../../public/icons/searchIcon';
import Link from 'next/link';
import AllSongs from './allSong';

interface song{
    musicId:number,
    memberId:number,
    imageId:number,
}
interface props{
    addSongFunction:any
    removeSongFunction:any
    selectedSongs:song[]
    type:string
    id:number
}

const AddSong:React.FC<props> = (props) => {
    const [search,setSearch]=useState("")
    
    return (
        <div>
            
                        <div className=""> 
                        <form action="" style={{paddingLeft:"0px"}}>
                        <div className="input-group d-flex " style={{width:"300px"}}>
                            <SearchIcon/>
                        <input type="text" name="" id="" value={search}  onChange={(e)=>setSearch(e.target.value)} style={{width:"200px"}}/>
                        
                        </div>
                        </form>
                        <AllSongs id={props.id} type={props.type} search={search} removeSongFunction={props.removeSongFunction} addSongFunction={props.addSongFunction} selectedSongs={props.selectedSongs}/>
                        <div className="create-new-playlist mt-2 "  style={{height:"50px"}}>
                                    <div className="d-flex" onClick={(e: any) => {
                                        e.preventDefault()
                                    }}>
                                        {/* <AddPlaylistIcon /> */}
                                        <Link href="/music/addMusic">
                                        <div className="create-text">Create A New Song</div>
                                        </Link>
                                    </div>
                                </div>
                        </div>        
        </div>
    );
}

export default AddSong;
