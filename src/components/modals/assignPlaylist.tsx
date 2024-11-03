import React, { useState } from 'react';
import ModalWrapper from '../wrappers/modalWrapper';
import { useQuery } from '@apollo/client';
import { ALLARTISTWITHMUSIC } from '@/app/api/graphql/queries';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const AssignPlaylist = () => {
    const [realName, setRealName] = useState("");
  const { data } = useQuery(ALLARTISTWITHMUSIC,{skip:true});
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
        <ModalWrapper close={close} title="Assign Playlist" width="500px">
             <div id="claim-music">
            <div className="prerequist">
                Write below the Username of the user You want to assign the 
            </div>
            <div style={{ width:'100%' }}>
            {
            data&&
            <ReactSearchAutocomplete
            items={data.AllArtistWithMusic.map((item:any) =>{
                return {
                  id:item.userId,
                  name:item.username
                }
            })}
            
            onSelect={handleOnSelect}
            autoFocus
            styling={{backgroundColor:"#383838",color:"white",hoverBackgroundColor: "#383839",}}
            formatResult={formatResult}
          />
         } 
         </div>
         <div className="claim-music-btn mt-2" onClick={HandleAssignMusic}>
                    Assign 
                </div>
                </div>
        </ModalWrapper>
    );
}

export default AssignPlaylist;
