/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import "@/sass/home/physicalMedia.scss"
import configuration from '@/config';
import Rocket from '../../../public/icons/rocket';
import Info from '../../../public/icons/info';
 interface props{
    contentData:any
 }
const PhyiscalMedia:React.FC<props> = ({contentData}:props) => {
    return (
        <div className="container-fluid" id="physical-media">
        <div className="row">
          
          <div className="col-md-6 production-image" style={{ backgroundImage:`url("${configuration.host}${contentData?.data?.physicalMedia?.image}")`}}>
            <div className="title-text">
              Physical Media
            </div>
          </div>
          <div className="col-md-6">
            <div className="main-title">
              {contentData?.data?.physicalMedia.title}
            </div>
           
            
            <div className="text h6" style={{fontSize:"1.2em"}}>
               <span className="learn-more">
               {contentData?.data?.physicalMedia.description}
               
              </span>
              <p className="mt-3">{contentData?.data?.physicalMedia.sub}</p>
              <ol>
              {contentData?.data?.physicalMedia.list.map((item:string,index:number) =>(<li key={index}>{item}</li>))}
              </ol>

            </div>
            <div className="d-flex btn-list">
              <div >
               <Link href={contentData?.data? contentData?.data?.physicalMedia.buttons[0].url:""}>
                <div className="btn btn-white">
                  <div className="d-flex gap-2">
                    <Rocket/>
                    <div className="h5">{contentData?.data?.physicalMedia?.buttons[0].text}</div>
                  </div>
                </div>
                </Link>
              </div>
              <a href={contentData?.data?.physicalMedia.buttons[1].url} target="_self">
                <div className="btn btn-white">
                  <div className="d-flex gap-2">
                    <Info/>
                    <div className="h5 text-capitalize">{contentData?.data?.physicalMedia?.buttons[1].text}</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PhyiscalMedia;
