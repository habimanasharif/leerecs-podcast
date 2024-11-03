import React from 'react';
import BannerLoader from '../../../public/icons/loaders/bannerLoader';

export default function Loading(props:any) {
  return (
      <div className="col-md-12 px-0">
        <div className="btn-loading px-3">
          
            <BannerLoader />
          
          <div className="col-md-10 text-loading">
            <div>{props.text || "loading"} </div>
          </div>
        </div>
      </div>
  );
}
