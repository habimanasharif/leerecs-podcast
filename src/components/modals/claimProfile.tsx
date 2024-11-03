'use client'
import { useAppSelector } from '@/redux/hook';
import React from 'react';
import ModalWrapper from '../wrappers/modalWrapper';
import FormInput from '../form/formInput';
import UserIcon from '../../../public/icons/userIcon';
import DescriptionIcon from '../../../public/icons/descriptionIcon';
import TagIcon from '../../../public/icons/tagIcon';
import PhoneIcon from '../../../public/icons/phoneIcon';
import EmailIcon from '../../../public/icons/emailIcon';
import '@/sass/modals/claimMusic.scss'

const ClaimProfile = () => {
    const {showClaimProfile}=useAppSelector((state)=>state.uiData)
    const handleClaim=async (e:any)=>{
        e.preventDefault()

        }
        const close=()=>{

        }

    return (
        <>
        {showClaimProfile&&(
             <ModalWrapper close={close} title="Claim Music" width="500px">
             <div id="claim-music">
             <form action="" onSubmit={handleClaim} autoComplete="off">
                <div className="prerequist">
                <div className="mb-2">
                  </div>
                  
                  <div className='container'>
                   <div className="mb-2">
                   <FormInput placeholder="Your Full name" icon={<UserIcon />} id="full_name" type="text" />
                   </div>
                   <div className="mb-2">
                   <FormInput placeholder="Your Email Address" icon={<EmailIcon />} id="email" type="email" />
                   </div>
                   <div className="mb-2">
                   <FormInput placeholder="Your Phone Number" icon={<PhoneIcon />} id="phone" type="tel" />
                   </div>
                   <div className="mb-2">
                   <FormInput placeholder="Your Social Media URL" icon={<TagIcon  />} id="social" type="url" />
                   </div>
                   <div>
                   <FormInput placeholder="Describe any details relevant to your request." icon={<DescriptionIcon  />} id="description" type="text" area={true} />
                   </div>
                   </div>
                  
                </div>
                <button type="submit" className='claim-music-btn'>
                    Claim Account
                </button>
                </form>
             </div>
            </ModalWrapper>
        )}
        
       
        </>
    );
}

export default ClaimProfile;
