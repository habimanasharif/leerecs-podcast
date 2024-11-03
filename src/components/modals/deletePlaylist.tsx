'use client'
import React, { useState } from 'react';
import ModalWrapper from '../wrappers/modalWrapper';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setShowDeletePlaylist } from '@/redux/data/uiData';
import { useMutation } from '@apollo/client';
import { DELETEPLAYLIST } from '@/app/api/graphql/mutation';
import Loading from '../Banners/loading';
import Sucess from '../Banners/success';
import ErrorBanner from '../Banners/Error';

const DeletePlaylist = () => {
    const {showDeletePlaylist}=useAppSelector(state=>state.uiData)
    const dispatch=useAppDispatch()
    const [DeletePlaylist] = useMutation(DELETEPLAYLIST, { errorPolicy: "all" })
    const [loading,setLoading]=useState(false)
    const[status,setStatus]=useState(false)
    const[error,setError]=useState()
    const[close,setClose]=useState(false)
    const HandleDelete = async (e:any)=>{
        e.preventDefault()
        
        setLoading(true)
        setClose(true)
       
        const result =  DeletePlaylist({
            variables: {
                playlistId:showDeletePlaylist,
               
            }
        }).then(function (response) {
            setLoading(false) 
            setStatus(true)
            
        })
        .catch(function (error) {
            setLoading(false);
            if(error.response){
              setError(error.response.data.message);
            }
            setStatus(false);
          });
    }
    const closeModal=()=>{
     dispatch(setShowDeletePlaylist(null))
    }
    return (
        <>
        {showDeletePlaylist&&(
            <ModalWrapper close={closeModal} title="Delete Playlist" width="400px">
            <div id="claim-music">
            {close&&loading && <Loading></Loading>}
                {close&&status&& <Sucess text="Deleted successfully" close={setClose}></Sucess>}
                { close&&error && !status&&  <ErrorBanner error={error} close={setClose}></ErrorBanner>}
            <div className="prerequist">
                Are you sure you want to delete this playlist
                    </div>
                    <div className="claim-music-btn mt-2" onClick={HandleDelete}>
                      Delete 
                </div>
                <div className="claim-music-btn mt-2 " style={{backgroundColor:"#007bff"}} onClick={(e)=>{
                        e.preventDefault()
                         dispatch(setShowDeletePlaylist(null))
                    }}>
                      Cancel
                </div>
                </div>

        </ModalWrapper>
        )}
        </>
        
    );
}

export default DeletePlaylist;
