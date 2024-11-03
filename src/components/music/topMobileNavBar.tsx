/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React,{useState} from 'react';
import Search from '../../../public/icons/search';
import MobileNavBarIcon from '../../../public/icons/MobileNavBarIcon';
import configuration from '@/config';

const TopMobileNavBar = () => {
    const isContributor=true
    const [mobile, setmobile] = useState(false)
    return (
        <div>
            <div id="top-mobile-nav-bar" className={`${mobile ?"nav-height":""}`} >
            <div className="row mx-0 d-flex justify-content-between the-nav-bar-wrapper">
                    <Link href="/music/searchResult">
                        <Search />
                    </Link>
                    <Link href="/">
                    <img src={`${configuration.host}/assets/ico/favicon-logo.png`} alt="" className="logo" />
                    </Link>
                    <div onClick={(e) => {
                        e.preventDefault()
                        setmobile(!mobile)
                    }} className="relative">
                        <MobileNavBarIcon />
                    </div>
                </div>

                {
                    mobile &&(
                        <div className="navigator">
                            <div className="cancel" onClick={(e) => {
                            e.preventDefault()
                            setmobile(!mobile)
                        }}></div>
                         <div className="actions">
                         {/* <div className="d-flex">
                                <Link to={data?.UserAuth.isContributor?`/a/${currentData.userInfo.username.replaceAll(" ","-").toLowerCase()}`:('#')} onClick={(e)=>{setmobile(!mobile)}}>
                                    {currentData && (currentData.userInfo.profileImg ? (<div className="rounded-circle" style={{ backgroundImage: `url("${configuration.FILE_STORAGE_LINK}${currentData.userInfo.profileImg}")` }}></div>) : (<div className="rounded-circle" style={{ backgroundImage: `url("https://d2vf2lffk4redv.cloudfront.net/3e64483b-8097-4cad-bc57-0f33018c7293.jfif")` }}></div>))}
                                </Link>
                                {currentData && (<div className="user-name">{currentData.userInfo.username}</div>)}
                            </div> */}
                         </div>
                        </div>
                    )

                }
            </div>
            
        </div>
    );
}

export default TopMobileNavBar;


