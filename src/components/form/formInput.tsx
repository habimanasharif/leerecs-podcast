import React, { useState } from 'react';
import '@/sass/form/formInput.scss'
interface props {
    placeholder: string;
    icon: JSX.Element;
    id: string;
    value?: any;
    type: "email" | "text" | "password" | "url"|"tel";
    area?: boolean;
}
const FormInput:React.FC<props> = (props)  => {
    const [state, setstate] = useState(props.value)
    const handleChange=(e:any)=>{
        e.preventDefault()
        // let fieldName = e.target.name;
        let fieldVal = e.target.value;
        if(e.target.value===""){
            setstate("some dat")
        }
        setstate(fieldVal)
    }
    return (
        <div id="form-input">
        {props.area ?
            (
                <div className="input-group-form d-flex">
                    {props.icon}
                    <textarea id={props.id} placeholder={props.placeholder} value={state} onChange={handleChange} rows={2} cols={20} ></textarea>
                </div>
            )
            :
            (<div className="input-group-component d-flex">
                {props.icon}
                <input type={props.type} id={props.id} placeholder={props.placeholder} value={state} onChange={handleChange} className="form-control" required/>
            </div>)}
    </div>
    );
}

export default FormInput;
