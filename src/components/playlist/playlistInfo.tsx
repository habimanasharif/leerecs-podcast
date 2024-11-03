import React, { useCallback, useState } from 'react';
import ShareIcon from '../../../public/icons/ShareIcon';
import PlayMusicIcon from '../../../public/icons/playSingleMusic';
import configuration from '@/config';
import { usePlayer } from '@/lib/usePlayer';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import MyDropzone from '@/lib/myDropzone';
import ContentEditable from 'react-contenteditable';
import PencilIcon from '../../../public/icons/pencilIcon';
import AssignIcon from '../../../public/icons/assignIcon';
import DeleteIcon from '../../../public/icons/deleteIcon';
import { useUpload } from '@/lib/useUpload';
import { useMutation } from '@apollo/client';
import { UPDATEALBUM, UPDATEPLAYLIST } from '@/app/api/graphql/mutation';
import SmallLoader from '../../../public/icons/loaders/smallLoader';
import CloudError from '../../../public/icons/cloudError';
import Done from '../../../public/icons/done';
import ProgressBanner from '../Banners/progressBanner';
import { setShowDeleteAlbum, setShowDeletePlaylist } from '@/redux/data/uiData';
enum PlaylistType{
    "COLOR"= "COLOR",
    "PLAYLIST"= "PLAYLIST",
    "ALBUM"= "ALBUM",
    "LIKE"= "LIKE",
    "HISTORY"= "HISTORY"
}

 interface props{
 cover:string
 title:string
 desc:string
 type:PlaylistType
 userId?:number
 coverId?:number
 playlistId?:string
 canEdit:boolean

 }
const PlaylistInfo:React.FC<props> = (props:props) => {
    const [{playAlbum,playPlaylist}]=usePlayer()
    const {userAuth,userId}=useAppSelector(state=>state.userAuth)
    const [cover,setCover] = useState<string | ArrayBuffer | null>(`${configuration.FILE_STORAGE_LINK}${props.cover}`)
    const [file,setFile]=useState<File>()
    const [title,setTitle] = useState<string>(props.title)
    const [desc,setDesc] = useState<string>(props.desc)
    const [btn,setbtn]=useState(false);
    const [message,setMessage]=useState("loading")
    const [addingstatus,setAddingStatus]=useState(false)
    const [color,setColor]=useState("#7171ff")
    const [width,setWidth]=useState("10%")
    const [icon,setIcon]=useState(<SmallLoader size={24}/>)
    const [status,setStatus]=useState<boolean>(false);
    const [{ upload },] = useUpload("cover-file")
    const dispatch=useAppDispatch()
    const [ UpdatePlaylist] = useMutation(UPDATEPLAYLIST, { errorPolicy: "all" })
    const [UpdateAlbum] = useMutation(UPDATEALBUM, { errorPolicy: "all" })
    const onDropProfile = useCallback((File:File) => {
        setFile(File);
          const reader = new FileReader()
          reader.addEventListener("load",()=>{
            setCover(reader.result)
          })
          reader.readAsDataURL(File)
          
      }, [])
    const handleUpdate=async (e:any)=>{
        e.preventDefault();
        let pId=props.coverId
        setAddingStatus(true)
        setbtn(true)
 
        //intializing
        setStatus(false)
        setMessage("loading ...")
        setColor("#7171ff")
        setWidth("10%")
        setIcon(<SmallLoader size={24}/>)
        setTimeout(() => {
            
        },100);
        if(file){
            const res= await upload('jpeg',file)
            pId=res.id
            console.log(res)
            setWidth("40%")
                setColor("#7171ff")
                setMessage("Uploading Cover File")
        }

       
  if(props.type===PlaylistType.ALBUM){
    const result = await UpdateAlbum({
        variables: {
            cover:pId,
            desc: desc.replace(/&nbsp;/g, ''),
            title: title.replace(/&nbsp;/g, ''),
            playlistId: parseInt(props.playlistId as string),
            
        }
    })
    if(result){
        setWidth("100%")
        setColor("#5DD97C")
        setMessage(`You have successfully updated this album`)
        setIcon(<Done/>) 
        setStatus(true)
        setbtn(false)
        if((props.title !== title)){
            window.location.replace(`/music/album/${title.replaceAll(" ","-").replace(/&nbsp;/g, '').toLowerCase()}`)
          }

    }else{
        setColor("#FF7171")
        setMessage("Server error!")
        setbtn(false)
        setIcon(<CloudError/>) 
    }
    
  }else{
    const result = await  UpdatePlaylist({
        variables: {
            cover:pId,
            desc: desc.replace(/&nbsp;/g, ''),
            title: title.replace(/&nbsp;/g, ''),
            playlistId: parseInt(props.playlistId as string),
            
        }
    })
        if(result){
            setWidth("100%")
            setColor("#5DD97C")
            setMessage(`You have successfully updated this playlist`)
            setIcon(<Done/>) 
            setStatus(true)
            setbtn(false)
            if((props.title !== title)){
                window.location.replace(`/music/playlist/${title.replaceAll(" ","-").replace(/&nbsp;/g, '').toLowerCase()}`)
              }

        }else{
            setColor("#FF7171")
            setMessage("Server error!")
            setbtn(false)
            setIcon(<CloudError/>) 
        }
    }

    }
      
    return (
        <div className="header" style={{ backgroundImage: `linear-gradient(rgba(56, 56, 56, 0.22) 0%, #292929 100%),url("${cover}"`}}>
            {addingstatus &&(<div className="col-10 mx-auto mt-2 loaders">
                <ProgressBanner close={setAddingStatus} message={message} width={width} color={color} icon={icon} status={status}/>
            </div>)}
            {props.canEdit&&(<MyDropzone onDropheader={onDropProfile} className="upload-dropzone"/>)}
        <div className="d-flex justify-content-between">
            <div>
                <div className="panel-title">{props.type}</div>
                <div className="playlist-title">
                                <ContentEditable
                                disabled={!props.canEdit}
                                html={title}
                                onChange={(e)=>{
                                    setTitle(e.target.value)
                                }}
                                className=" mr-3"
                                tagName='span'
                                /> {props.canEdit&&(<PencilIcon/>)}
                                </div>
                                <div className="playlist-desc"><ContentEditable
                                disabled={!props.canEdit}
                                html={desc}
                                onChange={(e)=>{
                                    setDesc(e.target.value)
                                }}
                                className=" mr-3"
                                tagName='span'
                                /> {props.canEdit&&(<PencilIcon/>)}
                                </div>
                                <div className="d-flex">
                               {props.canEdit&&(file||(title!==props.title)||(desc!==props.desc))&&( 
                               <button disabled={btn} className='apdate-btn mt-2 mr-4' onClick={handleUpdate} >Update Playlist</button>
                               )}
                                {userAuth.isAdmin&&( 
                               <div className='mt-2 mr-4' onClick={(e)=>{
                                  e.preventDefault();
                               }} ><AssignIcon/></div>
                               )}
                               {props.canEdit&&( 
                               <div  className=' mt-2 mr-1' onClick={(e)=>{
                                if(props.type===PlaylistType.PLAYLIST){
                                dispatch(setShowDeletePlaylist(parseInt(props.playlistId as string)))
                               }else{
                                dispatch(setShowDeleteAlbum(parseInt(props.playlistId as string)))
                                }
                               }} ><DeleteIcon/></div>
                               )}
                              
                               </div>
                   
            </div>
            <div className="btn-collection">
                <div onClick={()=>{
                    if(props.type===PlaylistType.ALBUM){
                    playAlbum(title)}
                    if(props.type===PlaylistType.PLAYLIST){
                        playPlaylist(title)}
                    }}>
                    <PlayMusicIcon />
                </div>
                <div style={{
                    marginTop: "15px"
                }}
                className='share-btn'
                    >
                    <ShareIcon />
                </div>
                
            </div>
            
        </div>
       
    </div> 
    );
}

export default PlaylistInfo;
