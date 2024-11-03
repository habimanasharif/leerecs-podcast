import React, {useState} from 'react'
import axios from "axios"

//helerps
import {gql,useMutation} from "@apollo/client"
import configuration from '@/config';

interface props{
    music_id:Number;
    children:React.ReactNode
}

const Publish: React.FC<props> = (props) => {

    const handleClick=async (e:any)=>{
        e.preventDefault()
        const form = new FormData()
        form.append("song",props.music_id.toString() )
        const result = await axios.post(`${configuration.BACK_END_HOST}/publish`, form)
        if(result){
            console.log(result)
        }
    }
    const [state, setstate] = useState(false)
    
    return (
        <div onClick={handleClick} >
            {props.children}
        </div>
    )
}

export default Publish
