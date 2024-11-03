'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MainMenuItems,ProductionMenuItems,SharedItems } from './menu';
import MobileMenu from './mobileMenu';
import '@/sass/navbar/menu.scss'
import { useAppSelector } from '@/redux/hook';



const Navbar:React.FC<{navLinks?:any,CTA?:any}> = ({navLinks,CTA}:{navLinks?:any,CTA?:any}) => {
    const location =usePathname()
    const [navClass, setNavClass] = useState('');
    const [menu, setmenu] = useState<boolean>(false);
    const{userAuth}=useAppSelector(state=>state.userAuth)
    const manageLocation = () => {
        switch (location) {
          case "/":
            return <SharedItems />
          case "/production":
    
            return <ProductionMenuItems />
            
          default:
            return <SharedItems />
        }
      }

      const manageTitle=()=>{
        switch (location) {
          case "/":
            return "Request Interview"
          case "/production":
    
            return "Request Review"
    
          default:
            return "Request Interview"
        }
      }


    function changeNavStyle(scrollY: number) {
        if (scrollY > 100) {
          // set the CSS class for the nav element
          setNavClass('scrolled');
        } else {
          // remove the CSS class from the nav element
          setNavClass('');
        }
      }
      // add a scroll event listener
    // window.addEventListener('scroll', () => {
    //     // call the function with the current scroll position
    //     changeNavStyle(window.scrollY);
    //   });
    
    // useEffect(() => {
    //   gsap.registerPlugin(ScrollTrigger);
    //   var timeline = gsap.timeline();
    //   ScrollTrigger.create({
    //     trigger: "#events,#compare",
    //     animation: timeline,
    //     start: "top center+=300px",
    //     end: "top center",
        
    //   });
  
    //   //nav background
   
  
  
    // }, [])
      const handleHide = () => {
        setmenu(false);
      };
    return (
        <div id="menu-main-item" className={`container-fluid fixed-menu ${navClass}`} style={{zIndex:"2000"}}>
      <div className="d-flex justify-content-between mobile-nav">
      {location==='/'?(<a href="#home"
        ><div className="rounded-circle"></div></a>):(<Link href="/"
        ><div className="rounded-circle"></div></Link>)}
        
        <div className="nav-bar d-flex">
          <div></div>
          {manageLocation()}
          <div className="cta d-flex">
            {CTA&&CTA.map((cta:any,index:number)=>(<Link key={index} href={userAuth.isLogedIn?'/music':cta.url}>
              <div className={index==0?"register":"interview"}>
               {cta.text}
              </div>
            </Link>))}
            
            <div
              className={`menu-icon ${menu && "animate-hamburger"}`}
              id="menu-item"
              onClick={(e) => {
                e.preventDefault();
                setmenu(!menu);
              }}
            >
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
            <div className={`d-none ${menu && "d-block"}`}>
              <MobileMenu setMenu={handleHide} />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}


export default Navbar

