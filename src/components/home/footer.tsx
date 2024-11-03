import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import '@/sass/home/footer.scss'
import configuration from '@/config';
interface props{
    contentData:any
}
const Footer:React.FC<props> = ({contentData}:props) => {
    const [affiliate,setAffiliate] =useState<any|null>(null);
    const [resource,setResource] =useState<any|null>(null);
    const currentDate = new Date();
    
    useEffect(()=>{
        const fetchAffliate = async () => {
            try {
              const response = await fetch('/api/affiliates/');
              const data = await response.json();
              setAffiliate(data.data);
            } catch (error) {
              
            }
          };
          const fetchResource = async () => {
            try {
              const response = await fetch('/api/resources');
              const data = await response.json();
              setResource(data.data);
            } catch (error) {
              
            }
          };

          fetchAffliate()
          fetchResource()


    },[])
    return (
        <div className="container-fluid" id="footer-section-home">
        <div className="logo-section">
          <div className="logo"></div>
        </div>
        <div className="links-section">
          <div className="first">
            <ul>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Sign Up</Link>
              </li>
              <li>
                <Link href="/request">Request Interview</Link>
              </li>
              <li>
                <Link href="/music">Start Listening</Link>
              </li>
            </ul>
          </div>
          <div className="second">
            <div className="sub-heading">LEGAL</div>
            <ul>
              {contentData?.data?.legalLinks.map((item:any,id:number)=>{
                 return(<li key={id}>
                  <a href={item.url} target="_blank"
                    rel="noreferrer">{item.title}</a>
                </li>)
              })}
              
            </ul>
          </div>
          <div className="third">
            <div className="sub-heading">AFFILIATES</div>
            <ul>
              {affiliate?.data.map((aff:any,id:number)=>(<li key={id} title={aff.description}>
                <a href={aff.url} target="_blank"
                  rel="noreferrer"><FontAwesomeIcon icon={aff.icon} /> {aff.title}</a>
              </li>))}
            </ul>
          </div>
          <div className="third">
            <div className="sub-heading">RESOURCE</div>
            {resource && <ul>
              {resource.data.map((item:any, idx:any) => {
                return (
                  <li key={idx} title={item.description}>
                    <a href={item.url} target="_blank"
                      rel="noreferrer"><FontAwesomeIcon icon={item.icon.split(" ")} /> {item.title}</a>
                  </li>
                )
              })}
            </ul>}
          </div>
        </div>
  
        <div className="social-section">
          <div className="notice copyright-txt">
            {contentData?.data?.betaMessage}
            
          </div>
          <div className="copyright-txt">&copy; {currentDate.getFullYear()} {contentData?.data?.copyright}</div>
          <div className="social-icons">
            <ul>
              {contentData?.data?.footerSocialIcons.map((social:any,id:any)=>(<a key={id} style={{backgroundImage:`url(${configuration.host}${social.icon})`, width:social.width, height:social.height}} href={social.link} target="_blank"
                rel="noreferrer"></a>))}
              
             
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Footer;
