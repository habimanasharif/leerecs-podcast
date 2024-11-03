import React from 'react';
import Done from '../../../public/icons/done';
import CloseIcon from '../../../public/icons/closeIcon';

export default function Sucess(props:any) {
  const { text } = props;
  return (
      <div className="col-md-12 px-2">
        <div className="btn-success px-3">
          
            <Done />
          
          <div className="col-md-11 text-sucess-pane">
            <div style={{lineHeight:1.3}}>{text} </div>
           
          </div>
          <div></div>

          <div className='close-icon' onClick={(e)=>{
                 e.preventDefault();
                //  console.log(props.close(false))
                 props.close(false)
            }}>
            <CloseIcon/></div>
        </div>
      </div>
  );
}
