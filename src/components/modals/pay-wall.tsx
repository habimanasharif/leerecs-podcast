'use client'
import React, { useEffect, useState } from 'react';
import ModalWrapper from '../wrappers/modalWrapper';
import '@/sass/modals/payWall.scss'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setShowPaywall } from '@/redux/data/uiData';
import Link from 'next/link';
import axios from 'axios';
import configuration from '@/config';
import Loading from '../Banners/loading';
import Sucess from '../Banners/success';
import ErrorBanner from '../Banners/Error';
import { usePathname } from 'next/navigation';

const PayWall = () => {
    const {showPaywall}=useAppSelector((state)=>state.uiData)
    const [homeData, setHomeData] = useState<any | []>([]);
    const [error, seterror] = useState<String>("");
    const [loading, setloading] = useState<Boolean>(false);
    const [success, setsuccess] = useState<Boolean>(false);
    const [closeBanner,setClose] =useState<Boolean>(false);
    const path=usePathname()
    const value = (id: string) => {
      var inputValue = (document.getElementById(id) as HTMLInputElement).value
      return inputValue;
    };
    const dispatch =useAppDispatch()
    useEffect(() => {
      const fetchHomeData = async () => {
        try {
          const response = await fetch('/api/home');
          const data = await response.json();
          setHomeData(data);
        } catch (error) {
          console.error('Error fetching homeData:', error);
        }
      }
      fetchHomeData()
      
    }, []);

    const handleSubmit=async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      setClose(true)
    setloading(true)
    seterror("");
    setsuccess(false);
    const [
      email,
      password,
    ] = [
        value('emailAdress'),
        value('password'),
      ];

      if (password && email) {
        axios.post(`${configuration.BACK_END_HOST}/login?email=${email}&password=${password}`)
        .then(function (response) {
          setsuccess(true);
          setloading(false);
          seterror('');
          localStorage.setItem("userId", response.data.data.user_id)
          localStorage.setItem("token", response.data.data.token?response.data.data.token:"old")
          if ((!(typeof response.data.data.musician === "undefined"))){
            localStorage.setItem("musician", response.data.data.musician)
          }
          localStorage.setItem("isContributor",response.data.data.userGroup)
          localStorage.setItem("usergroupId",response.data.data.usergroupId)

           window.location.href=path
        })
        .catch(function (error) {
          setloading(false);
          if(error.response){
            seterror(error.response.data.message);
          }
          setsuccess(false);
        });
       
      }
    }
    const close=()=>{
     dispatch(setShowPaywall())
    }
    return (
        <>
        {showPaywall&&(
             <ModalWrapper close={close} title="Login to never see this popup" width="500px">
             <div id="paywall" >
               <div className="col-md-12 col-lg-12 col-xl-12" style={{paddingLeft:"20px" }}>
                     <div className="col-md-12 col-xl-12" style={{padding:"0px"}}>
                       <div className="row ">
                       <div className="col-8 px-3 " style={{width:"100%"}}>
                            {closeBanner&&loading && <Loading/>}
                            {closeBanner&&success && <Sucess text="you have succesfully Logged In" close={setClose}></Sucess>}
                            {closeBanner&&error && <ErrorBanner error={error} close={setClose}/>}
                          </div>
                         <form action="" onSubmit={handleSubmit}>
                          
                           <div className="col-md-12 row forms">
                             <div className="col-md-12">
                               <div className="label">Email Address</div>
                               <input className="input-style" type="email" id="emailAdress" />
                             </div>
                             <div className="col-md-12">
                               <div className="label">Password</div>
                               <input
                                 className="input-style"
                                 type="password"
                                 id="password"
                               />
                             </div>
                             <div className="col-md-6">
                               <button
                                 className="btn btn-primary create-btn"
                                 type="submit"
                               >
                                 Log In Account
                               </button>
                             </div>
 
                             <div className="col-md-6">
                               <Link href="/signup">
                                 <div className="btn btn-outline btn-primary login-btn">
                                   Create Account
                                 </div>
                               </Link>
                             </div>
                           </div>
                           <div className="col-md-12 text-center mt-4">
                            <a href={homeData?.data?.miscellaneousLink} target="__blank" style={{color:"#F8107D"}}>
                              Forgot password?
                              </a>
                            </div>
                         </form>
                       </div>
                     </div>
                   </div>
                   </div>
 
         </ModalWrapper>
        )}
       
            
        </>
    );
}

export default PayWall;
