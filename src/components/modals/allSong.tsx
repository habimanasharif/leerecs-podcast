import React from 'react';
import { useQuery, gql } from "@apollo/client"
import configuration from '@/config';
import SingleSong from './singleSong';
import { useAppSelector } from '@/redux/hook';
interface song{
    musicId:number,
    memberId:number,
    imageId:number
}

interface props{
    search: string;
    addSongFunction:any
    removeSongFunction:any
    selectedSongs:song[]
    type:string
    id:number
}
const AllSongs:React.FC<props> = (props) => {
    const {userAuth,userId}=useAppSelector((state=>state.userAuth))
    const QUERY= props.type==='playlist'||userAuth.isAdmin?(gql`query{
        AllMusicForPlaylist(playlistId:${props.id}){
            title
            thumbnail
            file
            username
            musicId
            imageId
            memberId
            topicId
            anonymous
            messageId
            color_name
            inplaylist
            
        }
        }`
    ):(gql`query{
        AllMusicByArtistForAlbum(userId:${userId},albumId:${props.id}) {
             title
             thumbnail
             file
             username
             musicId
             imageId
             memberId
             topicId
             messageId
             activated
             color_name
             inalbum
         }
         }`)
     const { data } = useQuery(QUERY/*, { pollInterval: 500 }*/)  
    return (
        <>
       {props.type==="playlist"||userAuth.isAdmin ?<div className="song-list mt-2 mb-1 py-3">
            {data && data.AllMusicForPlaylist.map((music:any,id:number)=>{
                         if(music.title.indexOf(props.search)===-1){
                            return
                         }
                         else
                         return <SingleSong 
                         selectedSongs={props.selectedSongs}
                         music={{musicId:music.musicId,memberId:music.memberId,imageId:music.imageId}}
                          memberId={music.memberId} 
                          imageId={music.imageId}
                          removeSongFunction={props.removeSongFunction} 
                          addSongFunction={props.addSongFunction} 
                          color_name={music.color_name} key={id} 
                          title={music.title} musicId={music.musicId} 
                          cover={`${configuration.FILE_STORAGE_LINK}${music.thumbnail}`}
                           audio={music.file}
                           inalbum={music.inplaylist}
                           type={props.type}
                           />
                        })}
        </div>:
       <div className="song-list mt-2 mb-1 py-3 text-white">
            { data && data.AllMusicByArtistForAlbum.length===0 && (<div> <h1>Empty Songs</h1>
            <p>Create songs first and a them to this album</p></div>)}
            {data && data.AllMusicByArtistForAlbum.map((music:any,id:number)=>{
                         if(music.title.indexOf(props.search)===-1){
                            return
                         }
                         else
                         return <SingleSong 
                         selectedSongs={props.selectedSongs}
                         music={{musicId:music.musicId,memberId:music.memberId,imageId:music.imageId}}
                          memberId={music.memberId} 
                          imageId={music.imageId}
                          removeSongFunction={props.removeSongFunction} 
                          addSongFunction={props.addSongFunction} 
                          color_name={music.color_name} key={id} 
                          title={music.title} musicId={music.musicId} 
                          cover={`${configuration.FILE_STORAGE_LINK}${music.thumbnail}`}
                           audio={music.file}
                           inalbum={music.inalbum}
                           type={props.type}
                           />
                           
                        })}
        </div>}
        
        </>
    );
}

export default AllSongs;
