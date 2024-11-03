'use client'
import React, { useState } from 'react';
import ModalWrapper from '../wrappers/modalWrapper';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setShowDeleteAlbum } from '@/redux/data/uiData';
import { DELETEALBUM } from '@/app/api/graphql/mutation';
import { useMutation } from '@apollo/client';
import Loading from '../Banners/loading';
import Sucess from '../Banners/success';
import ErrorBanner from '../Banners/Error';

const DeleteAlbum = () => {
    const [loading,setLoading]=useState(false)
    const[status,setStatus]=useState(false)
    const[error,setError]=useState()
    const[close,setClose]=useState(false)
    const {showDeleteAlbum}=useAppSelector(state=>state.uiData)
    const dispatch=useAppDispatch()
    const [DeleteAlbum,] = useMutation(DELETEALBUM, { errorPolicy: "all" })
    const HandleDelete = async (e:any)=>{
        setLoading(true)
        setClose(true)
       
        const result =  DeleteAlbum({
            variables: {
                playlistId:showDeleteAlbum,
               
            }
        }).then(function (response) {
            // console.log(response)
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
 dispatch(setShowDeleteAlbum(null) )
    }
    return (
        <>
        {showDeleteAlbum&&(
            <ModalWrapper close={closeModal} title="Delete Album" width="400px">
            <div id="claim-music">
            {close&&loading && <Loading></Loading>}
                {close&&status&& <Sucess text="Deleted successfully" close={setClose}></Sucess>}
                { close&&error && !status&&  <ErrorBanner error={error} close={setClose}></ErrorBanner>}
                
            <div className="prerequist">
                Are you sure you want to delete this album
                    </div>
                    <div className="claim-music-btn mt-2" onClick={HandleDelete}>
                      Delete 
                </div>
                <div className="claim-music-btn mt-2 " style={{backgroundColor:"#007bff"}} onClick={(e)=>{
                        e.preventDefault()
                         dispatch(setShowDeleteAlbum(null))
                    }}>
                      Cancel
                </div>
                </div>

        </ModalWrapper>
        )}
        </>
        
    );
}

export default DeleteAlbum;
