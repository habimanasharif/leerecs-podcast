/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import PlayIcon from "../../../public/icons/playIcon";
import ShareIcon from "../../../public/icons/ShareIcon";
import configuration from "@/config";
import { usePlayer } from "@/lib/usePlayer";
import { useDropzone } from "react-dropzone";
import PencilIcon from "../../../public/icons/pencilIcon";
import ContentEditable from "react-contenteditable";
import HeartIcon from "../../../public/icons/HeartIcon";
import LikeMusic from "../wrappers/likeMusic";
import { ISMUSICLIKEDBYUSER } from "@/app/api/graphql/queries";
import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import AddPlaylistIcon from "../../../public/icons/addPlaylistIcon";
import { setShareData } from "@/redux/data/uiData";

interface props {
  color_name: string;
  cover: string;
  title: string;
  username: string;
  playlistNo: number;
  albumNo: number;
  file: string;
  canEdit: boolean;
  setCover: Function;
  setFile: Function;
  setTitle: Function;
  topicId: number;
  colorId: number;
  setColor: Function;
}
const Header: React.FC<props> = ({
  color_name,
  cover,
  title,
  username,
  playlistNo,
  albumNo,
  file,
  canEdit,
  setCover,
  setFile,
  setTitle,
  topicId,
  colorId,
  setColor,
}: props) => {
  const regex = /[?@\/#:\,;%+&=\{\}\[\]\^-]/g;
  const [like, setLike] = useState(false);
  const dispatch = useAppDispatch();
  const [{ playMusic }] = usePlayer();
  const { userId, userAuth } = useAppSelector((state) => state.userAuth);
  const { data, error } = useQuery(ISMUSICLIKEDBYUSER, {
    variables: { userId, topicId },
  });
  const onDrop = useCallback((acceptedFiles: any[]) => {
    setFile(acceptedFiles[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setCover(reader.result);
    });
    reader.readAsDataURL(acceptedFiles[0]);
  }, [setCover, setFile]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".png"] },
    multiple: false,
    onDrop,
  });
  const handleError = (event: any) => {
    event.target.src = `${configuration.host}/assets/images/default-music.png`; // Replace with your default image URL
  };
  const handleTitle = (e: any) => {
    setTitle(e.target.value.replace(/&nbsp;/g, ""));
  };
  const handleColor = (e: any) => {
    setColor(parseInt(e.target.value));
  };
  useEffect(() => {
    if (data) {
      setLike(true);
    }
    if (error) {
      setLike(false);
    }
  }, [data, error]);

  const currentSong = {
    name: title,
    singer: username,
    cover: cover,
    musicSrc: file,
    color: color_name,
  };
  return (
    <div className="artist-header">
      <div className="row">
        <div className="col-7 col-sm-5 col-md-4  mt-5 col-lg-3">
          <div className="cover-single">
            <div
              className="cover-wrapper-single"
              style={{
                backgroundColor: `${color_name}`,
                border: `1px solid ${color_name}`,
              }}
            >
              <img src={cover} alt="" onError={handleError} />
            </div>
            {canEdit && (
              <div className="upload-dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <PencilIcon />
              </div>
            )}
          </div>
        </div>
        <div className="col-auto">
          <div>
            <div
              className="playlist-title-single mt-4"
              style={{ color: "#fff" }}
            >
              <ContentEditable
                disabled={!canEdit}
                html={title}
                tagName="span"
                onChange={handleTitle}
              />
              {canEdit && <PencilIcon />}
            </div>
            <Link href={`/a/${username.replaceAll(" ", "-").toLowerCase()}`}>
              <div
                className="panel-title "
                style={{ color: "#fff", fontSize: "20px" }}
              >
                {username}
              </div>
            </Link>
            <div className="playlist-desc d-flex" style={{ color: "#fff" }}>
              <div
                className="px-4 py-1 mx-1 btn-single"
                title="play"
                onClick={() => {
                  playMusic(currentSong);
                }}
              >
                <PlayIcon /> Play
              </div>
              <LikeMusic topicId={topicId}>
                <div
                  className="px-4 btn-single py-1 mx-1"
                  title="Like"
                  onClick={() => {
                    if (userId) {
                      setLike(!like);
                    }
                  }}
                >
                  <HeartIcon like={like} /> {like ? "Unlike" : "Like"}
                </div>
              </LikeMusic>
              <div
                className="px-4 py-1 mx-1 btn-single"
                title="Share"
                onClick={() => {
                  dispatch(
                    setShareData({
                      shareUrl: `${configuration.host}/a/${username
                        .replaceAll(" ", "-")
                        .toLowerCase()}/s/${title
                        .toLowerCase()
                        .replaceAll(regex, "")
                        .replaceAll(" ", "-")}`,
                      title,
                    })
                  );
                }}
              >
                <ShareIcon /> Share
              </div>
            </div>
            <div className="mt-1 text-white text-bold">
              {" "}
              {playlistNo} Playlist {albumNo} Albums
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {userId && (
                <div>
                  <AddPlaylistIcon />
                </div>
              )}

              <div id="form-input">
                {canEdit && (
                  <div
                    className="input-group-component d-flex mt-1"
                    style={{ width: "150px" }}
                  >
                    <select
                      id="category"
                      className="form-control"
                      onChange={handleColor}
                    >
                      {userAuth.color.map(
                        (color: { id: number; title: string },index:number) => {
                          return (
                            <option
                            key={index}
                              selected={colorId === color.id ? true : false}
                              value={color.id}
                            >
                              {color.title}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
