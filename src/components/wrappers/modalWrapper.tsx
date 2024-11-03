import React from 'react';
import CloseIcon from '../../../public/icons/closeIcon';
import '@/sass/modals/index.scss'
interface props{
    title:string;
    close:any
    children:React.ReactNode
    width:string
    showClose?:boolean
}
const ModalWrapper:React.FC<props> = ({title,close,children,width,showClose=true}) => {
    return (
        <div id="modal">
        <div className="panel" style={{width:width}}>
          <div className="d-flex justify-content-between top-button">
            <div className="title">{title}</div>
            {showClose&&(
              <div
              onClick={close}
            >
              <CloseIcon />
            </div>
            )}
            
          </div>
           {children}
          </div>
          </div>
    );
}

export default ModalWrapper;
