'use client'
import React,{useState} from 'react';
import ModalWrapper from '../wrappers/modalWrapper';
import { useAppSelector ,useAppDispatch} from '@/redux/hook';
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    FacebookMessengerShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WhatsappIcon,
    WorkplaceIcon,
  } from "react-share";
import '@/sass/modals/share.scss'
import SmallBackArrow from '../../../public/icons/smallBackArrow';
import SmallForwardArrow from '../../../public/icons/smallForwardArrow';
import { setShareData } from '@/redux/data/uiData';

const Share = () => {
  const dispatch = useAppDispatch();
  const [copy,setCopy]=useState(false)
  const [state,setstate]=useState(0)
  const{shareData}=useAppSelector((state)=>state.uiData)

 
  
    const close= ()=>{
     dispatch(setShareData(null))
    }
    return (<>
        {shareData&&(
            <ModalWrapper close={close} title='Share Music' width='500px' >
            <div id="share">
             <div className=" desktop">
             <div className="d-md-flex justify-content-between">
            <div className="actual-content">
              <div className="d-flex justify-content-between">
                <div className="back-arrow">
                  {(state !== 0) && (<div onClick={() => { setstate(state - 1) }} className="icons">
                    <div className="arrows">
                    <SmallBackArrow/>
                    </div>
                  </div>)}
                </div>
                <div id="share-icon">
                  {(state === 0) && (
                    <div className=" d-flex sharelist mx-4" style={{}}>
                       <FacebookShareButton
                title={"Facebook"}
                url={shareData.shareUrl}
                hashtag="#Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
              >
                <FacebookIcon size={45} round={true} />
              </FacebookShareButton>
              <EmailShareButton
                title={"Email"}
                url={shareData.shareUrl}
                subject={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                body={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                separator={" "}
              >
                <EmailIcon size={45} round={true} />
              </EmailShareButton>
              <LinkedinShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                summary={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                source={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
              >
                <LinkedinIcon size={45} round={true} />
              </LinkedinShareButton>
              <TwitterShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                via={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                hashtags={[
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                ]}
                related={[
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                ]}
              >
                <TwitterIcon size={45} round={true} />
              </TwitterShareButton>
              <TelegramShareButton
                title={shareData.title}
                url={shareData.shareUrl}
              >
                <TelegramIcon size={45} round={true} />
              </TelegramShareButton>
              <WhatsappShareButton
                title={shareData.title}
                separator=" "
                url={shareData.shareUrl}
              >
                <WhatsappIcon size={45} round={true} />
              </WhatsappShareButton>
                    </div>)}
                  {(state === 1) && (
                    <div className="d-flex sharelist mx-4" style={{}}>
                               <LineShareButton
                title={shareData.title}
                url={shareData.shareUrl}
              >
                <LineIcon size={45} round={true} />
              </LineShareButton>
              <PocketShareButton
                title={shareData.title}
                url={shareData.shareUrl}
              >
                <PocketIcon size={45} round={true} />
              </PocketShareButton>
              <InstapaperShareButton
                title={shareData.title}
                description={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                url={shareData.shareUrl}
              >
                <InstapaperIcon size={45} round={true} />
              </InstapaperShareButton>
              <FacebookMessengerShareButton
                appId={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                title="Facebook Messenger"
                url={shareData.shareUrl}
                redirectUri={shareData.shareUrl}
                to={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
              >
                <FacebookMessengerIcon size={45} round={true} />
              </FacebookMessengerShareButton>
              <ViberShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                separator={" "}
              >
                <ViberIcon size={45} round={true} />
              </ViberShareButton>
              <RedditShareButton
                title={shareData.title}
                url={shareData.shareUrl}
              >
                <RedditIcon size={45} round={true} />
              </RedditShareButton>
                    </div>)}
                  {(state === 2) && (
                    <div className="d-flex sharelist mx-4" style={{}}>
                      
              <PinterestShareButton
                media={shareData.shareUrl}
                title="Pinterest"
                url={shareData.shareUrl}
                description={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
              >
                <PinterestIcon size={45} round={true} />
              </PinterestShareButton>
              <TumblrShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                tags={[
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                ]}
                caption={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                posttype={"link"}
              >
                <TumblrIcon size={45} round={true} />
              </TumblrShareButton>
              <VKShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                image={shareData.shareUrl}
                noParse={true}
                noVkLinks={false}
              >
                <VKIcon size={45} round={true} />
              </VKShareButton>
              <OKShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                description={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                image={shareData.shareUrl}
              >
                <OKIcon size={45} round={true} />
              </OKShareButton>
              <WorkplaceShareButton
                title={"Workplace"}
                url={shareData.shareUrl}
                quote={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                hashtag={
                  "#Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
              >
                <WorkplaceIcon size={45} round={true} />
              </WorkplaceShareButton>
              <HatenaShareButton
                title={shareData.title}
                url={shareData.shareUrl}
              >
                <HatenaIcon size={45} round={true} />
              </HatenaShareButton>
                    </div>
                  )}
                  {/* <div className="carousel-circle">
                    <div className="carousel-container d-flex">
                      <div className={`circle rounded-circle ${(state === 0) && "active"}`} onClick={() => { setstate(0) }}></div>
                      <div className={`circle rounded-circle ${(state === 1) && "active"}`} onClick={() => { setstate(1) }}></div>
                      <div className={`circle rounded-circle ${(state === 2) && "active"}`} onClick={() => { setstate(2) }}></div>
                    </div>
                  </div> */}
                </div>
                <div className="forwardarrow">
                  {(state !== 2) && (<div onClick={() => { setstate(state + 1) }} className="icons">
                    <div className="arrows right-arrow">
                    <SmallForwardArrow />
                    </div>
                  </div>)}
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className=" mobile">
             <div className="d-md-flex justify-content-between">
            <div className="actual-content">
              <div className="d-flex justify-content-between">
                <div className="back-arrow">
                  {(state !== 0) && (<div onClick={() => { setstate(state - 1) }} className="icons">
                    <div className="arrows">
                    <SmallBackArrow/>
                    </div>
                  </div>)}
                </div>
                <div id="share-icon">
                  {(state === 0) && (
                    <div className=" d-flex sharelist mx-4" style={{}}>
                       <FacebookShareButton
                title={"Facebook"}
                url={shareData.shareUrl}
                hashtag="#Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
              >
                <FacebookIcon size={45} round={true} />
              </FacebookShareButton>
              <EmailShareButton
                title={"Email"}
                url={shareData.shareUrl}
                subject={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                body={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                separator={" "}
              >
                <EmailIcon size={45} round={true} />
              </EmailShareButton>
              <LinkedinShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                summary={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                source={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
              >
                <LinkedinIcon size={45} round={true} />
              </LinkedinShareButton>
              
                    </div>)}
                    {(state === 1) && (
                    <div className=" d-flex sharelist mx-4" style={{}}>
              <TwitterShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                via={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                hashtags={[
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                ]}
                related={[
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                ]}
              >
                <TwitterIcon size={45} round={true} />
              </TwitterShareButton>
              <TelegramShareButton
                title={shareData.title}
                url={shareData.shareUrl}
              >
                <TelegramIcon size={45} round={true} />
              </TelegramShareButton>
              <WhatsappShareButton
                title={shareData.title}
                separator=" "
                url={shareData.shareUrl}
              >
                <WhatsappIcon size={45} round={true} />
              </WhatsappShareButton>
                    </div>)}
                  {(state === 2) && (
                    <div className="d-flex sharelist mx-4" style={{}}>
                               <LineShareButton
                title={shareData.title}
                url={shareData.shareUrl}
              >
                <LineIcon size={45} round={true} />
              </LineShareButton>
              <PocketShareButton
                title={shareData.title}
                url={shareData.shareUrl}
              >
                <PocketIcon size={45} round={true} />
              </PocketShareButton>
              <InstapaperShareButton
                title={shareData.title}
                description={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                url={shareData.shareUrl}
              >
                <InstapaperIcon size={45} round={true} />
              </InstapaperShareButton>
              
                    </div>)}
    
                    {(state === 3) && (
                    <div className="d-flex sharelist mx-4" style={{}}>
                               <FacebookMessengerShareButton
                appId={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                title="Facebook Messenger"
                url={shareData.shareUrl}
                redirectUri={shareData.shareUrl}
                to={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
              >
                <FacebookMessengerIcon size={45} round={true} />
              </FacebookMessengerShareButton>
              <ViberShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                separator={" "}
              >
                <ViberIcon size={45} round={true} />
              </ViberShareButton>
              <RedditShareButton
                title={shareData.title}
                url={shareData.shareUrl}
              >
                <RedditIcon size={45} round={true} />
              </RedditShareButton>
                    </div>)}
                  {(state === 4) && (
                    <div className="d-flex sharelist mx-4" style={{}}>
                      
              <PinterestShareButton
                media={shareData.shareUrl}
                title="Pinterest"
                url={shareData.shareUrl}
                description={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
              >
                <PinterestIcon size={45} round={true} />
              </PinterestShareButton>
              <TumblrShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                tags={[
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                ]}
                caption={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                posttype={"link"}
              >
                <TumblrIcon size={45} round={true} />
              </TumblrShareButton>
              <VKShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                image={shareData.shareUrl}
                noParse={true}
                noVkLinks={false}
              >
                <VKIcon size={45} round={true} />
              </VKShareButton>
    
                    </div>
                  )}
    
    {(state === 5) && (
                    <div className="d-flex sharelist mx-4" style={{}}>
              <OKShareButton
                title={shareData.title}
                url={shareData.shareUrl}
                description={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                image={shareData.shareUrl}
              >
                <OKIcon size={45} round={true} />
              </OKShareButton>
              <WorkplaceShareButton
                title={"Workplace"}
                url={shareData.shareUrl}
                quote={
                  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
                hashtag={
                  "#Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam"
                }
              >
                <WorkplaceIcon size={45} round={true} />
              </WorkplaceShareButton>
              <HatenaShareButton
                title={shareData.title}
                url={shareData.shareUrl}
              >
                <HatenaIcon size={45} round={true} />
              </HatenaShareButton>
                    </div>
                  )}
                  {/* <div className="carousel-circle">
                    <div className="carousel-container d-flex">
                      <div className={`circle rounded-circle ${(state === 0) && "active"}`} onClick={() => { setstate(0) }}></div>
                      <div className={`circle rounded-circle ${(state === 1) && "active"}`} onClick={() => { setstate(1) }}></div>
                      <div className={`circle rounded-circle ${(state === 2) && "active"}`} onClick={() => { setstate(2) }}></div>
                    </div>
                  </div> */}
                </div>
                <div className="forwardarrow">
                  {(state !== 5) && (<div onClick={() => { setstate(state + 1) }} className="icons">
                    <div className="arrows right-arrow">
                    <SmallForwardArrow />
                    </div>
                  </div>)}
                </div>
              </div>
            </div>
          </div>
             </div>
             <div className="input-group mb-3 mt-3 px-3" style={{cursor:"pointer",width:"100%"}}>
      <input type="text" className="form-control" disabled placeholder={shareData.shareUrl} aria-label="Recipient's username" aria-describedby="basic-addon2" style={{background:"black",color:"white", borderRight:"none"}}/>
      <span className="input-group-text cpy-btn" id="basic-addon2" style={{background:"black",color:"white",borderRadius:"0px"}} 
      onClick={(e)=>{
        navigator.clipboard.writeText(shareData.shareUrl);
        setCopy(true)
      }
        }>{copy?"Copied":"Copy"}
          </span>
    </div>
             </div>
           </ModalWrapper>
        )}
        </>
       
    );
}

export default Share;
