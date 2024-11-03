"use client";
import React, { useState } from "react";
import ModalWrapper from "../wrappers/modalWrapper";
import { useUpload } from "@/lib/useUpload";
import { FileUpload } from "../form/fileUpload";
import ImageIcon from "../../../public/icons/ImageIcon";
import FormInput from "../form/formInput";
import MusicIcon from "../../../public/icons/MusicIcon";
import InfoIcon from "../../../public/icons/infoIcon";
import Proceed from "../../../public/icons/proceed";
import "@/sass/modals/addPlaylist.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { showAlbum } from "@/redux/data/uiData";
import SmallLoader from "../../../public/icons/loaders/smallLoader";
import CloudError from "../../../public/icons/cloudError";
import Done from "../../../public/icons/done";
import { useMutation } from "@apollo/client";
import { CREATEALBUM } from "@/app/api/graphql/mutation";
import ProgressBanner from "../Banners/progressBanner";

const AddAlbum = () => {
  const [addingstatus, setAddingStatus] = useState(false);
  const [message, setMessage] = useState("loading");
  const [color, setColor] = useState("#7171ff");
  const [width, setWidth] = useState("10%");
  const [icon, setIcon] = useState(<SmallLoader size={24} />);
  const [status, setStatus] = useState<boolean>(false);
  const [uploading, setuploading] = useState(false);
  const {userId}= useAppSelector(data=>data.userAuth)
  const [
    { upload: uploadCover, setfiles: setCoverFile },
    { error: uploadCoverError },
  ] = useUpload("image-file-album");
  const { showCreateAlbum } = useAppSelector((state) => state.uiData);
  const [CreateAlbum, { error }] = useMutation(CREATEALBUM, {
    errorPolicy: "all",
  });
  const dispatch = useAppDispatch();
  const value = (id: string) => {
    var inputValue = (document.getElementById(id) as HTMLInputElement).value;
    return inputValue;
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setAddingStatus(true);
    setStatus(false);
    setMessage("loading ...");
    setColor("#7171ff");
    setWidth("10%");
    setIcon(<SmallLoader size={24} />);
    const [title, desc] = [value("title"), value("description")];
    try {
      setuploading(!uploading);
      const thumbnail = await uploadCover("album");
      if (thumbnail) {
        setuploading(false);
        const result = await CreateAlbum({
          variables: {
            title: title,
            desc: desc,
            userId: userId,
            cover: thumbnail.id,
          },
        });
        if (result) {
          if (result) {
            if (result.data) {
              setWidth("100%");
              setColor("#5DD97C");
              setMessage(
                ` Album created successfully <a href='/music/album/${title
                  .toLocaleLowerCase()
                  .replaceAll(" ", "-")}'>click here </a> to add songs`
              );
              setIcon(<Done />);
              setStatus(true);
            } else {
              setColor("#FF7171");
              setMessage("Internal server error!");
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
      }
    } catch (error) {}
  };
  const close = () => {
    dispatch(showAlbum());
  };
  return (
    <>
      {showCreateAlbum && (
        <ModalWrapper close={close} title="Create Album" width="50vw">
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
            <div className="row d-flex panel-forms">
              <div className="image-upload col-md-4">
                <div>
                  {setCoverFile && (
                    <FileUpload
                      fileId="image-file-album"
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
                  placeholder="Album Title"
                  icon={<MusicIcon />}
                  id="title"
                  type="text"
                />
                <FormInput
                  placeholder="Description"
                  icon={<InfoIcon />}
                  id="description"
                  type="text"
                  area={true}
                />
                <button className="btn red-btn" type="submit">
                  <div className="d-flex">
                    <Proceed />
                    <div className="title-text">Create Album</div>
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

export default AddAlbum;
