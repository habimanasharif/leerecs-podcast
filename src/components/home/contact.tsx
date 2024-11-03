'use client'
import configuration from '@/config';
import React,{useRef, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import TextareaAutosize from "react-textarea-autosize";
import '@/sass/home/contact.scss'
import { SENDEMAIL } from '@/app/api/graphql/mutation';
import { useMutation } from '@apollo/client';
import Loading from '../Banners/loading';
import Sucess from '../Banners/success';
import ErrorBanner from '../Banners/Error';
interface props{
    contentData:any
}
const Contact:React.FC<props> = ({contentData}:props) => {
    const reRef = useRef<ReCAPTCHA>(null);
    const [errorData, seterrorData] = useState<string>("");
    const [close, setClose] = useState(false);
    const [SenddEmail, { loading, data, error }] = useMutation(SENDEMAIL, {
      errorPolicy: "all",
    });
    const value = (id: string) => {
      var inputValue = (document.getElementById(id) as HTMLInputElement).value;
      return inputValue;
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = await reRef.current?.executeAsync();
        reRef.current?.reset();

        if (!token) {
          return seterrorData("Not authorized by Google reCAPTCHA");
        }
        if (token) {
          console.log(token)
          const [email, subject, desc] = [
            value("email"),
            value("subject"),
            value("desc"),
          ];
          try {
            const result = await SenddEmail({
              variables: {
                email: email,
                subject: subject,
                details: desc,
                token: token,
              },
            });
            setClose(true)
            if (result) {
              if (data) {
                
              }
            }
            
          } catch (error) { }
        }
      };

    return (
        <div className="container-fluid" id="contact-page-home">
        <div className="d-md-flex justify-content-between">
          <div className="text-items">
            <div>
              <h1 className="text-lg text-light main-title">Contact Us</h1>
              <p className="text-muted description-text">
                Thanks for stopping by, feel free to contact us with any question or
                collaboration proposal using our contact form.
                Cheers!
              </p>
              <div className="owl-img-wrapper"></div>
            </div>
          </div>
          <div className="contact-form ">
            <div className="contact-banner">Contact</div>
            <form onSubmit={handleSubmit}>
              <div style={{minWidth:"100%"}}>
                {loading && <Loading></Loading>}
                {(data&&close) && (
                  <Sucess close={setClose} text="Your request has been sent."></Sucess>
                )}
                {error &&
                  error.graphQLErrors.map(({ message }, index:number) => {
                    return(
                    <ErrorBanner key={index} error={message}></ErrorBanner>
                  )})}
              </div>
              <input
                placeholder="Email"
                type="text"
                className="input-style"
                id="email"
              />
              <br />
              <input
                type="Subject"
                placeholder="Subject"
                className="input-style"
                id="subject"
              />
              <br />
              <TextareaAutosize placeholder="Details" minRows={2} id="desc" />
              <div className="col-md-12 recaptcha">
                <ReCAPTCHA
                  sitekey={configuration.RECAPTCHA_SECRET_KEY}
                  ref={reRef}
                  theme="dark"
                  size="invisible"
                />
              </div>
              <button className="send-button" type="submit">
                <div className="send-txt">Send Message</div>
                <div className="send-icon"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Contact;
