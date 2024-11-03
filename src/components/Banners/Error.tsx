import React from 'react';
import CloseIcon from '../../../public/icons/closeIcon';
import CloudError from '../../../public/icons/cloudError';

export default function ErrorBanner(props:any) {
  const { error } = props;
  return (
      <div className="col-md-12">
        <div className="btn-error">
          <div className="col-1">
            <CloudError />
          </div>
          <div className="col-md-10 ml-1 text-error-loader">
            <div dangerouslySetInnerHTML={{__html: error}}></div>
            
          </div>
          <div className='close-icon'style={{top:"10px",right:"25px"}} onClick={(e)=>{
                 e.preventDefault();
                 props.close(false)
            }}>
            <CloseIcon/></div>
        </div>
      </div>
  );
}
