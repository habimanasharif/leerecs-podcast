'use client'
import React from 'react';
import ModalWrapper from '../wrappers/modalWrapper';
import '@/sass/modals/claimMusic.scss'
import { useAppSelector } from '@/redux/hook';

const ClaimMusic = () => {
    const {showClaimMusic}=useAppSelector((state)=>state.uiData)
    const handleClaim=async (e:any)=>{
        e.preventDefault()

        }
        const close=()=>{

        }

    return (
        <>
        {showClaimMusic&&(
             <ModalWrapper close={close} title="Claim Music" width="500px">
             <div id="claim-music">
             <div className="header-img">
                    </div>
                    <div className="prerequist">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea.
                    </div>
                    <div className="claim-music-btn" onClick={handleClaim}>
                        Claim Music
                    </div>
                    <div className="cancel" onClick={(e) => {
                        e.preventDefault()
                        // dispatch(claimMusic())
                    }}>
                        cancel
                    </div>
             </div>
            </ModalWrapper>
        )}
        
       
        </>
    );
}

export default ClaimMusic;
