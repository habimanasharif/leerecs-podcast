'use client'
import React, { useState } from 'react';
import ModalWrapper from '../wrappers/modalWrapper';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useMutation } from '@apollo/client';
import { SHOPACTIVITIES } from '@/app/api/graphql/mutation';
import Sucess from '../Banners/success';
import Loading from '../Banners/loading';
import ErrorBanner from '../Banners/Error';
import { setShopActivityData } from '@/redux/data/uiData';

const ShopActivities = () => {
    const dispatch = useAppDispatch()
    const [loading,setLoading]=useState(false)
    const[status,setStatus]=useState(false)
    const[error,setError]=useState()
    const[close,setClose]=useState(false)
    const [message,setMessage]=useState("")
    const {shopActivityData}=useAppSelector((state)=>state.uiData)
    const [ClaimShop] = useMutation(SHOPACTIVITIES, { errorPolicy: "all" })
    const closeModal=()=>{
     dispatch(setShopActivityData(null))
    }
    const handleClaim=(e:any)=>{
        e.preventDefault()
        setLoading(true)
        setClose(true)
        if(shopActivityData){
        const result =  ClaimShop({
            variables: {
                shopData:{
                albumName:shopActivityData.albumName,
                owner:shopActivityData.owner,
                action:shopActivityData.action,
                message:shopActivityData.message,
                url:shopActivityData.url,    
                userId:shopActivityData.userId,
                requester:shopActivityData.requester?.toString()
               }
            }
        }).then(function (response) {
            if(response.errors){
            console.log(response.errors[0].message)}
             setMessage(response.data.ClaimShop.desc)
             setLoading(false)
             setStatus(true)
             setClose(true)
            
        })}
    }
    return (
        <>{shopActivityData&&(
            <ModalWrapper close={closeModal} title={shopActivityData.action==='ADD'?'ADD TO SHOP': shopActivityData.action==='CLAIM'?"CLAIM SHOP":shopActivityData.action==='REQUEST'?"REQUEST SHOP":shopActivityData.action==='REQUEST-ACTIVITY'?"REQUEST SHOP ACTIVITY":'REMOVE FROM SHOP'} width='300px' >
            <div id="claim-music">
            {close&&loading && <Loading></Loading>}
                {close&&status&& <Sucess text={message} close={setClose}></Sucess>}
                { close&&error && !status&&  <ErrorBanner error={error} close={setClose}></ErrorBanner>}
            {shopActivityData.action==='ADD'&&(
                    <div className="prerequist">
                    <h6 className='fw-bold text-center'>You are about to request start selling this album on the Leerecs shop.</h6>
                    <p className='text-center'>Once you confirm, our team will receive your request and follow up with you.</p>
                        </div>
                 )}
                  {shopActivityData.action==='CLAIM'&&(
                    <div className="prerequist">
                    <h6 className='fw-bold text-center'>You are about to request a shop on the Leerecs shop.</h6>
                    <p className='text-center'>Once you confirm, our team will receive your request and follow up with you.</p>
                        </div>
                 )}
                 {shopActivityData.action==='REQUEST'&&(
                    <div className="prerequist">
                    <h6 className='fw-bold text-center'>You are about to request this artist to add thier shop to Leerecs shop.</h6>
                    <p className='text-center'>Once you confirm, our team will receive your request and follow up .</p>
                        </div>
                 )}

                {shopActivityData.action==='REMOVE'&&(
                    <div className="prerequist">
                    <h6 className='fw-bold text-center'>You are about to remove this album on the Leerecs shop.</h6>
                    <p className='text-center'>Once you confirm, our team will receive your request and follow up with you.</p>
                        </div>
                 )}

                {shopActivityData.action==='REQUEST-ACTIVITY'&&(
                   <div className="prerequist">
                   <h6 className='fw-bold text-center'>You are about to invite  this artist to sell their music on Leerecs shop.</h6>
                   <p className='text-center'>Once you confirm, this artist will receive an email and take action.</p>
                       </div>  
                )} 

               

                
                <div className="claim-music-btn mt-2" onClick={handleClaim} >
                      Comfirm
                </div>
                <div className="claim-music-btn mt-2" style={{backgroundColor:"#2ef9d9",color:"#000"}} onClick={closeModal}>
                      Cancel
                </div>
                </div>
        </ModalWrapper>
        )}</>
        
    );
}

export default ShopActivities;
