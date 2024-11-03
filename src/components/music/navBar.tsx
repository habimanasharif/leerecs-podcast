'use client'
import React, { useState, useEffect } from 'react';
import Mini from '../../../public/icons/Mini';
import Max from '../../../public/icons/max';
import Link from 'next/link';
import Contribute from '../../../public/icons/contribute';
import '@/sass/music/navBar.scss'
import '@/sass/music/topNavBar.scss'
import TopMobileNavBar from './topMobileNavBar';
import { useAppSelector } from '@/redux/hook';
import { useAppDispatch } from '@/redux/hook';
import { setIsMini } from '@/redux/data/uiData';
import configuration from '@/config';
import NotificationContainer from '../notification/notificationContainer';


const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const {isMini} = useAppSelector(state => state.uiData);
    const {userAuth} = useAppSelector(state => state.userAuth);
    const dispatch = useAppDispatch();
    const {isContributor, isLogedIn, username, profileImg, usernotification} = userAuth;

    useEffect(() => {
        const scroller = document.getElementById('scroller');
        const handleScroll = () => {
            
            if (scroller) {
                if (scroller.scrollTop > 0) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            }
        };

        scroller&&scroller.addEventListener('scroll', handleScroll);
        return () => {
            scroller&&scroller.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-between px-2 py-2" 
                 id="music-nav-bar" 
                 style={{
                     width: isMini ? '95%' : '75%',
                     backgroundColor: isScrolled ? '#171717' : 'transparent'
                 }}>
                <div className="minimizer d-flex align-items-center justify-content-center shadow-lg" 
                     onClick={() => {
                         dispatch(setIsMini());
                     }}
                     style={{
                         width: "40px",
                         height: "40px",
                         backgroundColor: "#0f0f0f",
                         padding: "10px",
                         borderRadius: "50%",
                     }}>
                    {isMini ? <Mini /> : <Max />}
                </div>

                <div className="user-button d-flex gap-1">
                    {isLogedIn && !isContributor && (
                        <Link href="/music/becomeContributor">
                            <div className="become-contributor-btn d-flex justify-content-between">
                                <Contribute />
                                Become Contributor
                            </div>
                        </Link>
                    )}
                    
                    {isContributor && (
                        <>
                            <NotificationContainer notification={usernotification} />
                            <div style={{width: "15px"}}></div>
                            {profileImg ? (
                                <Link href={`/a/${username.replaceAll(" ", "-").toLowerCase()}`}>
                                    <div className="rounded-circle" style={{ backgroundImage: `url("${configuration.FILE_STORAGE_LINK}${profileImg}")` }}></div>
                                </Link>
                            ) : (
                                <Link href={`/a/${username.replaceAll(" ", "-").toLowerCase()}`}>
                                    <div className="rounded-circle" style={{ backgroundImage: `url("https://leerecs.net/backend/storage/app/attachments/thumb_avatar-default-image.jpg")` }}></div>
                                </Link>
                            )}
                        </>
                    )}
                    
                    <div className="view-public-profile logout">
                        {isContributor && isLogedIn && (location.pathname !== `/a/${username.replaceAll(' ', '-').toLowerCase()}`) && (
                            <Link className='view-profile' href={`/a/${username.replaceAll(" ", "-").toLowerCase()}`}>
                                <div style={{marginBottom: '5px'}}>{username}</div>
                                <div className='view-profile-text' style={{color: "#d9d9d9"}}>View Public Profile</div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <TopMobileNavBar />
        </div>
    );
}

export default NavBar;
