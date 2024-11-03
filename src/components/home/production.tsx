/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import "@/sass/home/production.scss"
import configuration from '@/config';
import Volume from '../../../public/icons/volume';
import FileIcon from '../../../public/icons/file';

interface props{
    contentData:any
}
const Production:React.FC<props> = ({contentData}:props) => {
    return (
        <div className="container-fluid" id="music-production">
      <div className="row">
        <div className="col-md-6">
          <div className="main-title">
            {contentData?.data?.production?.mainTitle}
          </div>
          <div className="services h3">
          {contentData?.data?.production.services}
          </div>
          <div className="catch-flase h4">
          {contentData?.data?.production.catchFalse}
          </div>
          <div className="text h6" style={{fontSize:"1.2em"}}>
             <span className="learn-more">
             {contentData?.data?.production.text}
              <a href="production#landing-production">{contentData?.data?.production.more}</a>
            </span>
          </div>
          <div className="d-flex btn-list">
            <div 
            // onClick={(e)=>{
            //   e.preventDefault()
            //   //history.push("/production")
            // //   dispatch(redirectElement(true))
            // }}
            >
              <div className="btn btn-white">
                <div className="d-flex">
                  <Volume/>
                  <div className="h5">Hear Examples</div>
                </div>
              </div>
            </div>
            <Link href="/request">
              <div className="btn btn-white">
                <div className="d-flex">
                  <FileIcon/>
                  <div className="h5 text-capitalize">Get a proposal</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-md-6 production-image" style={{ backgroundImage:`url("${configuration.host}/assets/images/guitor.png")`}}>
          <div className="title-text">
            Music
          </div>
        </div>
      </div>
    </div>
    );
}

export default Production;
