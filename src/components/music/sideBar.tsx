'use client'
import Link from 'next/link';
import React from 'react';
import SongSimple from '../../../public/icons/songSimple';
import Heart from '../../../public/icons/heart';
import Favorite from '../../../public/icons/fevorite';
import HomeSimple from '../../../public/icons/homeSimple';
import AuthSideBarElement from './authSideBarElement';
import Logout from '../../../public/icons/logout';
import Login from '../../../public/icons/login';
import SideBarElement from './sideBarElement';
import UploadMusicIcon from '../../../public/icons/uploadMusicIcon';
import DashboardIcon from '../../../public/icons/dashBoardIcon';
import Search from '../../../public/icons/search';
import AllMusicIcon from '../../../public/icons/allMusicIcon';
import ColorSideBarElement from './colorSideBarEleement';
import DoubleMusicNote from '../../../public/icons/DoubleMusicNote';
import FolderPlus from '../../../public/icons/folderPlus';
import MusicNote from '../../../public/icons/musicNote';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import '@/sass/music/sidebar.scss'
import { showPlaylist,showAlbum } from '@/redux/data/uiData';

const SideBar = () => {
    const {userAuth}=useAppSelector((state)=>state.userAuth)
    const {isMini} = useAppSelector(state=>state.uiData)
    const dispatch =useAppDispatch()
    const {isLogedIn,isContributor,isAdmin,userPlaylist,color,userAlbum}=userAuth
   
  

    return (
        <div>
             <div id="music-side-bar" style={{width:isMini?'6%':'25%'}}>
             {isLogedIn ?(<div className="button logout">
                        <AuthSideBarElement title="Sign Out">
                        <Logout />
                        </AuthSideBarElement>
                    </div>):(<div className="button logout" >
                         
                         <AuthSideBarElement title="Sign In">
                        <Login />
                        </AuthSideBarElement>
                        
                    </div>)}
                    <h3>Main</h3>
                    {isContributor&&(
                        <Link href="/addMusic">
                        <div className='sidebar-upload-btn'>
                        <SideBarElement title="Upload Music">
                            <UploadMusicIcon />
                        </SideBarElement>
                        </div>
                    </Link>
                    )}
                    {isContributor&&(
                        <Link href="/musician">
                            <SideBarElement title="Dashboard(BETA)">
                                <DashboardIcon />
                            </SideBarElement>
                        </Link>
                    )}

                <Link  href="/">
                    <SideBarElement title="Index">
                        <SongSimple />
                    </SideBarElement>
                </Link>

                <Link href="/searchResult">
                    <div>
                        <SideBarElement title="Search">
                            <Search/>
                        </SideBarElement>
                    </div>
                </Link>

                {!isMini&&isLogedIn  && (<h3>Library</h3>)}
                <div>
                    {isContributor&&(
                     <Link href="/mymusic" >
                        <SideBarElement title="My Music">
                          <AllMusicIcon />
                         </SideBarElement>
                         </Link>  
                    )}
                    {isAdmin &&(<Link href="/unassignedmusic" ><SideBarElement title="Unassigned Music">
                    <AllMusicIcon />
                        </SideBarElement>
                        </Link>)}
                    {isLogedIn&&(<Link href="/likedSongs">
                        <SideBarElement title="Liked Songs">
                            <Heart />
                        </SideBarElement>
                    </Link>)}

                    {isLogedIn&&(<Link href="/history">
                        <SideBarElement title="History">
                            <Favorite />
                        </SideBarElement>
                    </Link>)}
                     {!isMini&&(<h3>Listen By Colour</h3>)}
                    
                    <div className="d-flex w-100 colors-element">
                     {color.map((color,index)=>(<Link href={`/colour/${color.title.toLowerCase()}`} key={index}>
                        <div title={color.desc} >
                            <ColorSideBarElement title={color.title}>
                                <DoubleMusicNote color={color.color} />
                            </ColorSideBarElement>
                            </div>
                        </Link>))}
                    </div>

                    {isContributor&&(<h3>ALBUMS</h3>)}
                    {isContributor&&(
                        <div className='cursorPointer'
                        onClick={()=>{
                            console.log("Cursor")
                            dispatch(showAlbum()) 
                        }}
                        ><SideBarElement  title="Create Album">
                                    <FolderPlus />
                                </SideBarElement></div>
                    )}
                     {userAlbum.map((playlist,index)=>(<Link href={`/album/${playlist.title.toLowerCase().replaceAll(" ","-")}`} key={index} >
                                <SideBarElement title={playlist.title}>
                                    <MusicNote />
                                </SideBarElement>
                            </Link>))}
                    

                           

                    {isContributor&&(<h3>PLAYLISTS</h3>)}
                    {isContributor&&(
                        <div className='cursorPointer'
                        onClick={()=>{
                            dispatch(showPlaylist()) 
                        }}
                        ><SideBarElement  title="Create Playlist" >
                                    <FolderPlus />
                                </SideBarElement></div>
                    )}
{userPlaylist.map((playlist,index)=>(<Link href={`/playlist/${playlist.title.toLowerCase().replaceAll(" ","-")}`} key={index} >
                                <SideBarElement title={playlist.title}>
                                    <MusicNote />
                                </SideBarElement>
                            </Link>))}
                    




                </div>

             </div>
             <div id="mobile-nav-bar">
                <div className="nav-bar-wraper">
                    <div className="d-flex justify-content-between">
                        <Link href="/"><SongSimple /></Link>
                        <Link href="/likedSongs"><Heart /></Link>
                        <Link href="/history"><Favorite /></Link>
                        <Link href="/"> <HomeSimple/></Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default SideBar;
