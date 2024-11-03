"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useState } from "react";
import ModalWrapper from "../wrappers/modalWrapper";
import FormInput from "../form/formInput";
import MusicIcon from "../../../public/icons/MusicIcon";
import ImageIcon from "../../../public/icons/ImageIcon";
import { useUpload } from "@/lib/useUpload";
import { FileUpload } from "../form/fileUpload";
import InfoIcon from "../../../public/icons/infoIcon";
import Proceed from "../../../public/icons/proceed";
import "@/sass/modals/addPlaylist.scss";
import { showPlaylist } from "@/redux/data/uiData";
import { useMutation } from "@apollo/client";
import { CREATEPLAYLIST } from "@/app/api/graphql/mutation";
import SmallLoader from "../../../public/icons/loaders/smallLoader";
import Done from "../../../public/icons/done";
import CloudError from "../../../public/icons/cloudError";
import ProgressBanner from "../Banners/progressBanner";

const AddPlaylist = () => {
  const [addingstatus, setAddingStatus] = useState(false);
  const {userId}=useAppSelector(data=>data.userAuth)
  const [message, setMessage] = useState("loading");
  const [color, setColor] = useState("#7171ff");
  const [width, setWidth] = useState("10%");
  const [icon, setIcon] = useState(<SmallLoader size={24} />);
  const [status, setStatus] = useState<boolean>(false);
  const [uploading, setuploading] = useState(false);
  const dispatch = useAppDispatch();
  const { showCreatePlaylist } = useAppSelector((state) => state.uiData);
  const [
    { upload: uploadCover, setfiles: setCoverFile },
    { error: uploadCoverError },
  ] = useUpload("image-file-playlist");
  const [CreatePlaylist, { error }] = useMutation(CREATEPLAYLIST, {
    errorPolicy: "all",
  });
  const value = (id: string) => {
    var inputValue = (document.getElementById(id) as HTMLInputElement).value;
    return inputValue;
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setAddingStatus(true);
    // setbtn(true)

    //intializing
    setStatus(false);
    setMessage("loading ...");
    setColor("#7171ff");
    setWidth("10%");
    setIcon(<SmallLoader size={24} />);
    setTimeout(() => {}, 100);
    const [title, desc] = [value("title"), value("description")];

    //upload playlist thumbnaiil
    try {
      setuploading(!uploading);
      const thumbnail = await uploadCover("playlist");

      if (thumbnail) {
        setuploading(false);
        const result = await CreatePlaylist({
          variables: {
            title: title,
            desc: desc,
            userId: userId,
            cover: thumbnail.id,
          },
        });
        if (result) {
          if (result.data) {
            setWidth("100%");
            setColor("#5DD97C");
            setMessage(
              ` Playlist created successfully <a href='/music/playlist/${title
                .toLocaleLowerCase()
                .replaceAll(" ", "-")}'>click here </a> to add songs`
            );
            setIcon(<Done />);
            setStatus(true);
            // setbtn(false)
          } else {
            setColor("#FF7171");
            setMessage("Internal server error!");
            // setbtn(false)
            setIcon(<CloudError />);
          }
        }
      } else {
        setColor("#FF7171");
        if (uploadCoverError && uploadCoverError !== message) {
          setMessage(uploadCoverError);
        }
        // setbtn(false)
        setIcon(<CloudError />);
      }
    } catch (error) {
      setColor("#FF7171");
      setMessage(e.message);
      // setbtn(false)
      setIcon(<CloudError />);
    }
  };
  const close = () => {
    dispatch(showPlaylist());
  };
  return (
    <>
      {showCreatePlaylist && (
        <ModalWrapper close={close} title="Add Playlist" width="50vw">
          <div id="add-playlist-home">
          {addingstatus && (<div className="row" style={{position:"relative",height:"60px",left:"50px"}}>
              <div className="col-md-12">
                
                  <ProgressBanner
                    close={setAddingStatus}
                    message={message}
                    width={width}
                    color={color}
                    icon={icon}
                    status={status}
                  />
               
              </div>
            </div>
             )}
            <div className="row"></div>
            <div className="row d-flex panel-forms">
              <div className="image-upload col-md-4">
                <div>
                  {setCoverFile && (
                    <FileUpload
                      fileId="image-file-playlist"
                      acceptedFiles={{ "image/*": [".jpeg", ".png"] }}
                      title="Playlist Cover"
                      text="Drag and drop an image"
                      rule1="Add high quality image"
                      rule2="Add image you have right to"
                      icon={<ImageIcon></ImageIcon>}
                      onDropHandler={setCoverFile}
                    />
                  )}
                </div>
              </div>
              <form action="" onSubmit={handleSubmit} className="col-md-8">
                <FormInput
                  placeholder="Playlist Title"
                  icon={<MusicIcon />}
                  id="title"
                  type="text"
                />
                <FormInput
                  placeholder=" Playlsit Description"
                  icon={<InfoIcon />}
                  id="description"
                  type="text"
                  area={true}
                />
                <button className="btn red-btn" type="submit">
                  <div className="d-flex">
                    <Proceed />
                    <div className="title-text">Create Playlist</div>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default AddPlaylist;
