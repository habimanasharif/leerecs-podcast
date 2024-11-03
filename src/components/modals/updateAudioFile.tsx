"use client";
import React, { useState } from "react";
import ModalWrapper from "../wrappers/modalWrapper";
import { useUpload } from "@/lib/useUpload";
import { FileUpload } from "../form/fileUpload";
import MusicFileIcon from "../../../public/icons/musicFileIcon";
import Proceed from "../../../public/icons/proceed";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setShowUpdateAudio } from "@/redux/data/uiData";
import axios from "axios";
import configuration from "@/config";
import ErrorBanner from "../Banners/Error";
import Loading from "../Banners/loading";
import Sucess from "../Banners/success";
import "@/sass/modals/addPlaylist.scss";

const UpdateAudioFile = () => {
  const [status, setStatus] = useState("initial");
  const [closebanner, setClose] = useState(false);
  const [{ upload: Music, setfiles: setMusicFile }, { loading, error }] =
    useUpload("audio-file");
  const { showUpdateAudio, topic_id } = useAppSelector((state) => state.uiData);
  const dispatch = useAppDispatch();
  const handleUpdtate = async () => {
    try {
      setStatus("loading");
      setClose(true);
      const file = await Music("audio");
      const form = new FormData();
      form.append("id_attach", topic_id.toString());
      form.append("newFile", file.filename);
      const result = await axios.post(
        `${configuration.BACK_END_HOST}/updateaudio`,
        form
      );
      setStatus("success");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const close = () => {
    dispatch(setShowUpdateAudio(0));
    setClose(false)
  };
  return (
    <>
      {showUpdateAudio && (
        <ModalWrapper close={close} title="Update Audio File" width="500px">
          <div className="row">
            <div className="col-md-12">
              {status === "loading" && <Loading />}
              {status === "success" && closebanner && (
                <Sucess
                  close={setClose}
                  text="  Updated the Audio File successfully!"
                ></Sucess>
              )}
              {error && <ErrorBanner error={error} />}
            </div>
          </div>
          <div id="add-playlist-home">
            <div className="row d-flex panel-forms">
              <div className="image-upload col-md-11 mx-auto">
                <div>
                  {setMusicFile && (
                    <FileUpload
                      fileId="audio-file"
                      acceptedFiles={{
                        "audio/mpeg": [".mp3"],
                        "audio/wav": [".wav"],
                      }}
                      title="New Audio File"
                      text="Drag and drop an audio file"
                      rule3="The file must not be bigger than 10 MB"
                      rule1="Add high quality audio"
                      rule2="Add music you have right to"
                      icon={<MusicFileIcon />}
                      onDropHandler={setMusicFile}
                    />
                  )}
                </div>
                <button className="btn red-btn mt-2" onClick={handleUpdtate}>
                  <div className="d-flex">
                    <Proceed />
                    <div className="title-text">Update Audio File</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default UpdateAudioFile;
