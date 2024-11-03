/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import VerifiedIcon from "../../../public/icons/verifyIcon";
import ContentEditable from "react-contenteditable";
import configuration from "@/config";
import MyDropzone from "@/lib/myDropzone";
import CloseIcon from "../../../public/icons/closeIcon";
import Done from "../../../public/icons/done";
import CloudError from "../../../public/icons/cloudError";
import SmallLoader from "../../../public/icons/loaders/smallLoader";
import axios from "axios";
import { useUpload } from "@/lib/useUpload";
import { UPDATEUSERPROFILE } from "@/app/api/graphql/mutation";
import { useMutation } from "@apollo/client";

interface props {
  header: string;
  username: string;
  profile: string;
  id_group: number;
  bio: string;
  website: string;
  songs: number;
  karma: number;
  buddies: number;
  canEdit:boolean
  profileId:number
  headerId:number
  userId:number
}
 const regex = /[?@\/#:\,;%+&=\{\}\[\]'\^-]/g

const HeaderComponent: React.FC<props> = (props: props) => {
 
  const [HeaderFile,setHeaderFile]=useState<File>()
  const [file,setFile]=useState<File>()
  const [profile,setProfile]=useState<string | ArrayBuffer | null>(`${configuration.FILE_STORAGE_LINK}${props.profile}`)
  const [header,setHeader]=useState<string | ArrayBuffer | null>(`${configuration.FILE_STORAGE_LINK}${props.header}`)
  const [username,setUsername]=useState(props.username)
  const [bio,setBio] =useState(props.bio)
  const [website,setWebsite] = useState(props.website)
  const[addingstatus,setAddingStatus]=useState(false)
  const [sucess,setSuccess] =useState(false)
  const [uploading,setUploading]=useState(false)
  const[errordata,setErrorData]=useState(null)
  const [message,setMessage]=useState("loading")
  const [{ upload: uploadHeader, setfiles: setHeadFile }] = useUpload("Header-file")
  const [{ upload: uploadCover, setfiles: setCoverFile }] = useUpload("cover-file")
  const [UpdateUserProfile, { loading, data,error }] = useMutation(UPDATEUSERPROFILE, { errorPolicy: "all" })

  // const handleError = (event: any) => {
  //   event.target.src = "/assets/images/thumb_avatar-default-image.jpg"; // Replace with your default image URL
  // };
  const onDropheader = useCallback((File:File) => {
     setHeaderFile(File);
    const reader = new FileReader()
    reader.addEventListener("load",()=>{
    setHeader(reader.result)
     })
     reader.readAsDataURL(File)
      
  },[])
  useEffect(()=>{
    const progress =document.querySelector(".progress-bar") as HTMLElement
     if(addingstatus){
    if(uploading&& !errordata){
        progress.style.width="30%"
        progress.style.backgroundColor="#7171ff"
       progress.classList.remove('successfull')
        setMessage("loading")
    }
    if(sucess && !errordata){
        progress.style.width="100%"
        progress.style.backgroundColor="#5DD97C"
        progress.classList.add('successfull')
        setMessage("Your profile has been updated successfully")
        
    }
   
        if(errordata){
            setMessage(errordata)
            progress.classList.add('successfull')
            progress.style.backgroundColor ="#FF7171"
        }
         
     }
     return () => {
    };

 },[uploading, sucess, errordata, addingstatus])

  const handleUpdate=async()=>{
    try {
      setAddingStatus(true);
      setUploading(true)
      setErrorData(null);
      setSuccess(false) 
      let pId=props.profileId;
      let hId=props.headerId;
      if(username.match(regex)){  
        throw Error("Usernames can only contain letters, numbers, underscores and dots.")
      }
      if((props.username !== username)){
        const check=new FormData();
        check.append("username",username);
        const checkres = await axios.post(`${configuration.BACK_END_HOST}/checkname`, check)
        if(checkres.data.exists){
            throw Error ("This user already exist ")
        }
    
    }
    if(file && setCoverFile){
      
     const res= await uploadCover('jpeg',file)

     pId=res.id

    }
    if(HeaderFile&&setHeadFile){
      const res= await uploadHeader('jpeg',HeaderFile)
      hId=res.id

    }
    const res= await UpdateUserProfile({ 
      variables: {
          username: username.replace(/&nbsp;/g, ''),
          title: "",
          website:website.replace(/&nbsp;/g, ''),
          bio: bio.replace(/&nbsp;/g, ''),
          profileImg: pId,
          headerImg: hId,
          userId: props.userId,
      }
  })
  setUploading(false)
  setSuccess(true)

  if(res){
      if(data){
          setUploading(false)
          setSuccess(true)
      }
  }

  if((props.username !== username)){
      window.location.replace(`/a/${username.replaceAll(" ","-").toLowerCase()}`)
    }

    } catch (error:any) {
      console.log(error)
      setErrorData(error.message)
    }

  }

  const onDropProfile = useCallback((File:File) => {
    // console.log(acceptedFiles[0]);
    setFile(File);
      const reader = new FileReader()
      reader.addEventListener("load",()=>{
        setProfile(reader.result)
      })
      reader.readAsDataURL(File)
      
  }, [])
  const handleusername=(e:any)=>{
    setUsername(e.target.value)
  }
  const handleBio=(e:any)=>{
    setBio(e.target.value)
  }
  const handleWebsite=(e:any)=>{
    setWebsite(e.target.value)
  }
  return (
    <div>
      <div className="col-10 mx-auto mt-2 loaders">
                {/* {uploading&&(<Loading text="Updating Profile" />)}
                    {sucess&&(<Sucess close={setSuccess}  text="you have succesfully updated your profile"></Sucess>)} */}
                   {addingstatus &&(<div className="col-10 mx-auto mt-2 loaders"><div className=" progress-container px-0">
                        <div className='cont'>
                        <div className='progress-bar btn-success'></div>
                        </div>
                        <div className='message fw-bold text-sucess-pane' style={{fontWeight:"bold"}}> {sucess && !errordata ?<span className='ml-2'> <Done/> {message} </span>:<span className='ml-3'> {uploading && !errordata ?<SmallLoader size={24}/>:<CloudError/>}  {message}</span>}</div>
                        <div className='close' onClick={(e)=>{setAddingStatus(false)}}> <CloseIcon /></div>
                    </div></div>)}
                    </div>
      <div
        className=" artist-cover filter-blur"
        style={{
          backgroundImage: ` linear-gradient(rgba(94, 94, 94, 0) 0%, rgba(15, 15, 15, 0.64) 0%),url("${header}")`,
        }}
      ></div>
      <div className="artist-header">
        {props.canEdit&&(<MyDropzone onDropheader={onDropheader} className="header-upload-dropzone"/>)}
        {(file||HeaderFile||(props.username !== username)||(props.website!==website)||(props.bio !==bio))&&(
                         <div className='edit-profile-btn' onClick={handleUpdate}> Update Profile</div>
                    )}
        <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div className="col-7 col-md-3 mt-5 col-middle">
            <div className="cover-profile">
              <div className="cover-wrapper-profile">
                <img src={profile as string} alt=""  />
              </div>
              {props.canEdit&&(<MyDropzone onDropheader={onDropProfile} className="upload-dropzone"/>)}
            </div>
          </div>
          <div className="col-8">
            <div className=" ">
              <div className="user-details">
                <div
                  className="playlist-title d-flex"
                  style={{ color: "#fff",alignItems:"center" }}
                >
                  <ContentEditable
                      disabled={!props.canEdit}
                      html={username}
                      onChange={handleusername}
                      className="real_name mr-3"
                      tagName='span'
                    />
                  {props.id_group === 9 && <VerifiedIcon />}
                </div>

                <div
                  className="playlist-desc"
                  title={props.bio}
                  style={{ color: "#fff" }}
                >
                 <ContentEditable
                      disabled={!props.canEdit}
                      html={bio===""?"No Bio":bio}
                      onChange={handleBio}
                      className="bio"
                      tagName='div'
                    /> 
                </div>
                {!props.canEdit&&(
                  <a href={props.website} target="_blank" rel="noopener noreferrer">
                  {props.website}
                </a>
                )}
                {props.canEdit&&(<div> <ContentEditable
                             disabled={props.canEdit}
                             html={website===""?"no website":website}
                             onChange={handleWebsite}
                             className="social-icon mt-1"
                             tagName='span'
                             /></div>)}
                
                <div className="playlist-desc mt-2" style={{ color: "#fff" }}>
                  {props.songs} Songs {props.karma} Karma {props.buddies} Buddies
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
