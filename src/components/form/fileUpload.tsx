import configuration from "@/config";
import { useDropzone } from "react-dropzone"
import '@/sass/form/fileUploader.scss'
type AcceptedFilesType = {
    [key: string]: string[];
  };
interface props {
    title: String;
    icon: JSX.Element;
    text: String;
    rule1: String;
    rule2: String;
    rule3?: String;
    music?: String;
    images?:[{filename: String}];
    fileId: string;
    imageSelected?:string
    selectImage?:Function
    acceptedFiles:AcceptedFilesType
    onDropHandler:any
    
}
export const FileUpload: React.FC<props> = (props) => {

    const onDrop = (acceptedFiles:any) => {
        return props.onDropHandler(acceptedFiles[0])
    }

    const { acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps } = useDropzone({ accept: props.acceptedFiles, onDrop });
    const acceptedFileItems = acceptedFiles.map((file:any,index:number) => (
        <li key={index}>
            {(file as any).path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={(file as any).path}>
            {(file as any).path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));
    return (
        <section className="container" id="file-uploader">
            <div className='dropzone' >
                <input {...getInputProps()} id={props.fileId} type="file" />
                <div className="all-upload-data">
                    <div className="title">{props.title}</div>
                    <div>
                        <div className='recent-images-container d-flex'>
                            {props.images&&props.images.map((image:any,index:number)=><div 
                            onClick={(e)=>{
                               e.preventDefault();
                               if(props.selectImage)
                              props.selectImage(image.filename)
                            }}
                            key={index} 
                            className='recent-images' 
                            style={{backgroundImage:`url(${configuration.FILE_STORAGE_LINK}${image.filename})`,border:`${props.imageSelected==image.filename?'2px solid #F8107D':'none'}`}}
                            
                            >

                            </div>
                            )}
                            
                           
                        </div>
                        <div className="file-content" {...getRootProps()}>
                            <div className="mobile-icons">
                                <div className="file-icon-svg">{props.icon}</div>
                                <div className="text">{props.text}, or <span>Browse</span></div>
                            </div>
                            <div className="requirement" >
                                <div className="d-flex">
                                    <div className="rounded-circle"></div>
                                    {props.rule1}
                                </div>
                                
                                <div className="d-flex" >
                                    <div className="rounded-circle"></div>
                                    {props.rule2}
                                </div>
                                <div className="d-flex">
                                    <div className="rounded-circle"></div>
                                    {props.rule3}
                                </div>
                                <h4>Accepted files</h4>
                                <ul>{acceptedFileItems}</ul>
                                <h4>Rejected files</h4>
                                <ul>{fileRejectionItems}</ul>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </section>
    )
}