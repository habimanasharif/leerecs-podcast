'use client'
import { ReactNode } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../../lib/fontawesome';
import { usePathname } from 'next/navigation';
import MusicSibar from './musicSibar';
import SideBar from '../music/sideBar';
import MusicBody from './musicBody';
import NavBar from '../music/navBar';

config.autoAddCss = false;

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }:Props) => {
    const location=usePathname()
    console.log(location)
    const isAuthPage = location === '/login' || location === '/signup';
  return (
    <>
    {!isAuthPage&&(
        <div className="container-fluid px-0" id="music-home-page">
        <div className="row mx-0">
          <MusicSibar>
            <SideBar></SideBar>
          </MusicSibar>
  
  
          <MusicBody>
  
            <NavBar ></NavBar>
            <div id="content-container" className="px-4 bg-color">
              {children}
            </div>
  
  
          </MusicBody>
        </div>
      </div>
    )}
    {isAuthPage&&(<>
        {children}
    </>)}
    </>
    
  );
};

export default LayoutWrapper;