import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PencilIcon from '../../public/icons/pencilIcon';
interface props {
    onDropheader:any;
    className:string;
}
const MyDropzone:React.FC<props> = ({onDropheader,className}) => {
    const onDrop = useCallback((acceptedFiles:any) => {
        onDropheader(acceptedFiles[0])
      }, [onDropheader])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <div className={className} {...getRootProps()}>
      <input {...getInputProps()} />
      <PencilIcon/>
    </div>
    );
}

export default MyDropzone;
