import configuration from "@/config"
import axios from "axios"
import { useCallback, useState } from "react"



export const useUpload = (domId:string) => {
    const [files, setfiles] = useState<any>(null)
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState(null)
    const [error, seterror] = useState<string|null>(null)
    const upload = useCallback<any>(async (type:string,data?:File) => {
        const file = (document.getElementById(domId) as HTMLFormElement)?.files[0] || data
        
        if (file) {
            setloading(true)
            const form = new FormData()
            const form1 = new FormData()
            form1.append("file", file, file.name)
            form.append("userId", localStorage.getItem("userId") as string)
            form.append("fileExt", type)
            form.append("mimeType", file.type)
            form.append("size", file.size)
            let fileSize = parseInt(file.size) / 1000000
            if (fileSize < 15) {
                try {
                    if (file) {
                       
                        const result1 = await axios.post(`${configuration.BACK_END_HOST}/uploadfile`, form1)
                        
                        if (result1) {
                            form.append("fileTitle", result1.data.title)
                            if(domId ==="image-file"){
                                setdata(result1.data.title)
                                setloading(false)
                                return{
                                    id:0,
                                    filename:result1.data.title
                                }
                            }
                            
                            const result = await axios.post(`${configuration.BACK_END_HOST}/upload`, form)
                            console.log(result)
                            if (result) {
                                setdata(result.data.fileId)
                                setloading(false)
                                return{ 
                                    id:result.data.fileId,
                                    filename:result.data.filename
                                }
                            }
                        }
                    }
                } catch (error:any) {
                    setloading(false)
                    seterror(error.message)
                }
            }
            else {
                seterror("The file must not be bigger than 10 MB")
                throw Error("The file must not be bigger than 10 MB")
            }
        }
        else{
            seterror("Invalid file, Please check the file you are trying to upload")  
            throw Error("Invalid file, Please check the file you are trying to upload")
        }
    }, [domId])


    return [{ upload , setfiles  }, { data, loading, error }]

}
