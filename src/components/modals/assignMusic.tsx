"use client";
import React, { useState } from "react";
import ModalWrapper from "../wrappers/modalWrapper";
import { useQuery } from "@apollo/client";
import { ALLARTISTWITHMUSIC } from "@/app/api/graphql/queries";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useAppSelector } from "@/redux/hook";
const AssignMusic = () => {
    const {assignData}=useAppSelector(state=>state.uiData)
  const [realName, setRealName] = useState("");
  const { data } = useQuery(ALLARTISTWITHMUSIC,{skip:!assignData});
  const formatResult = (item: any) => {
    return (
      <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
    );
  };

  const handleOnSelect = (item: any) => {
    setRealName(item.name);
  };
  const HandleAssignMusic=()=>{

  }
  return (
    <>
    {assignData&&(
        <ModalWrapper close={close} title="Assign Music" width="400px">
        <div id="claim-music">
          <div className="prerequist">
            Write below the Username of the user You want to assign the Music
          </div>
          <div style={{ width: "100%",cursor:"pointer" }}>
            {data && (
              <ReactSearchAutocomplete
                items={data.AllArtistWithMusic.map((item: any) => {
                  return {
                    id: item.userId,
                    name: item.username,
                  };
                })}
                onSelect={handleOnSelect}
                autoFocus
                styling={{
                  backgroundColor: "#383838",
                  color: "white",
                  hoverBackgroundColor: "#383839",
                }}
                formatResult={formatResult}
              />
            )}
          </div>
          <div className="claim-music-btn mt-2" onClick={HandleAssignMusic}>
                      Assign Music
                  </div>
        </div>
      </ModalWrapper>
    )}
    </>
    
  );
};

export default AssignMusic;
