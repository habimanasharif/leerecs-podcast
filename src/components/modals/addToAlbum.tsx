'use client'
import React, { useState } from 'react';
import ModalWrapper from '../wrappers/modalWrapper';
import Proceed from '../../../public/icons/proceed';
import AddSong from './addSong';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import MusicIcon from '../../../public/icons/MusicIcon';
import { setAddToAlbum, setAddToPlaylist } from '@/redux/data/uiData';
import { ADDMUSICTOALBUM, ADDMUSICTOPLAYLIST, REMOVEMUSIC, REMOVEMUSICFROMALBUM } from '@/app/api/graphql/mutation';
import { useMutation } from '@apollo/client';
import ErrorBanner from '../Banners/Error';
import Sucess from '../Banners/success';
import Loading from '../Banners/loading';
interface song{
    musicId:number,
    memberId:number,
    imageId:number,
}
const AddToAlbum = () => {
    const {userAuth}=useAppSelector(state=>state.userAuth)
    const {addToAlbum}=useAppSelector(state=>state.uiData)
    const dispatch=useAppDispatch()
    const [close,setClose]=useState<boolean>(false)
    const[selectedSongs,setSelectedSongs]=useState<song[]>([])
    const[removedSong,setremovedSong]=useState<song[]>([]);
    const [AddMusicToAlbum, { loading: addMusicLoading, data: addMusicData, error: addMusicerror }] = useMutation(ADDMUSICTOALBUM, { errorPolicy: "all" })
    const [RemoveMusicToAlbum, { loading: removeMusicLoading, data: removeMusicData }] = useMutation(REMOVEMUSICFROMALBUM, { errorPolicy: "all" })
    const appendSong=(song:song)=>{   
        setSelectedSongs([...selectedSongs,song])
        const arr=[...removedSong]
        delete arr[arr.findIndex((s:song)=> s.musicId===song.musicId)]
        setremovedSong(arr.flat())
        
    }
    const pullSong=(song:song)=>{
        const arr=[...selectedSongs]
        delete arr[arr.findIndex((s:song)=> s.musicId===song.musicId)]
        setSelectedSongs(arr.flat())
        setremovedSong([...removedSong,song])
        
    }
    const closeModal = () => {
      dispatch(setAddToAlbum(null))
    }
    const value = (id: string) => {
        var inputValue = (document.getElementById(id) as HTMLInputElement).value
        return inputValue;
    };
    const addMusic=(e:any)=>{
        e.preventDefault()
        const playlistId=value("playlist-id");
         setClose(true)
        try {
            selectedSongs.forEach(async(song)=>{
                const result = await AddMusicToAlbum({variables:{
                    music_file: song.musicId,
                    music_thumbnail: song.imageId,
                    music_artist: song.memberId,
                    playlist_id: parseInt(playlistId as string),
                }})
                if(result){
                    
                    if(addMusicData){
                        // console.log(addMusicData)
                    }
                }
            })
            
            removedSong.forEach(async(song)=>{
                const result = await RemoveMusicToAlbum({variables:{
                    music_file: song.musicId,
                    music_thumbnail: song.imageId,
                    music_artist: song.memberId,
                    playlist_id: parseInt(playlistId as string),
                }})
                // console.log(result)
                if(result){
                    
                    if(addMusicData){
                        //  console.log(addMusicData)
                    }
                }
            })
        } catch (error) {
            
        }
     
    }
    return (
       <>
       {addToAlbum &&(
        <ModalWrapper close={closeModal} title="Update Playlist Music List" width="50vw">
            <div id="choose-playlist">
            <div className="row">
                            <div className="col-md-12">
                                {( close&&(addMusicLoading||removeMusicLoading)) && <Loading></Loading>}
                                { close&&(addMusicData||removeMusicData) && <Sucess close={setClose}  text="Playlist updated successfully "></Sucess>}
                                {close&&addMusicerror &&
                                    (
                                        addMusicerror.graphQLErrors.map(({ message },index:number) => (
                                            <ErrorBanner key={index} close={setClose} error={message}></ErrorBanner>
                                        )))
                                }

                         
                            </div>
                        </div>
        <p  style={{color:"#efe9f8"}}>Add or remove music from your music list, select the album to edit in the dropdown list, and click “update Album” to save your changes.</p>
        <div className="d-flex justify-content-between">
                             {/* <div className="panel-img"></div> */}
                             <div className="image-upload col-md-6">
                             <div>
                             <AddSong id={addToAlbum} type="album" removeSongFunction={pullSong} addSongFunction={appendSong} selectedSongs={selectedSongs}/>
                                     </div>
                             </div>
                             <form action="" onSubmit={addMusic} style={{minWidth:"300px"}}>
                                 {/* {console.log("query",queryData)} */}
                                 {(userAuth.userPlaylist) && (
                                     <div>
                                         {(userAuth.userAlbum.length !==0) && (
                                             <div>
                                                 <div className="input-label">Choose a playlist</div>
                                                 <div id="form-input" >
                                                     <div className="input-group-component d-flex">
                                                         <MusicIcon />
                                                         <select id="playlist-id" className="form-control">
                                                             {(userAuth.userAlbum.map((album: any,index:number) => {
                                                                 return (<option key={index} value={album.albumId} selected={album.albumId===addToAlbum}>{album.title}</option>)
                                                             }))}
                                                         </select>
                                                     </div>
                                                 </div>
                                             </div>
                                         )}
                                     </div>
                                 )}
                                 <div className="input-label mt-3">Create a new one</div>
                                 <div className="create-new-playlist">
                                     <div className="d-flex" onClick={(e:any)=>{
                                         e.preventDefault()
                                         // setplayliststate(true)
                                     }}>
                                         {/* <AddPlaylistIcon /> */}
                                         <div className="create-text">Create A New Playlist</div>
                                     </div>
                                 </div>
                                 <button className="btn red-btn" type="submit">
                                     <div className="d-flex">
                                         <Proceed />
                                         <div className="title-text">Update playlist</div>
                                     </div>
                                 </button>
                             </form>
                         </div>
                         </div>
        </ModalWrapper>
       )}
       
       </>
    );
}

export default AddToAlbum;
