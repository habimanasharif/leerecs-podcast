import React,{useEffect,useRef} from 'react';
import { gql,useMutation } from "@apollo/client"
import { UPDATENOTIFICATION } from '@/app/api/graphql/mutation';
import { useAppSelector } from '@/redux/hook';
import NotificationIcon from '../../../public/icons/notificationIcon';
import NotificationCard from './notificationCard';
import LottieWrapper from '../wrappers/lottieWrapper';
import configuration from '@/config';
interface Notification {
  music: string | null;
  user_id: number;
  buddie_list: string;
  type: string;
  username: string;
  message: string;
  userProfile: string;
  owner_name: string;
  date: string;
  seen: boolean;
  is_verified: boolean;
}

function useOutsideAlerter(ref:any,userId:number) {
    
          const [updateNotification] = useMutation(UPDATENOTIFICATION, { errorPolicy: "all" })
      useEffect(() => {
        const handleClickOutside= async (event:any)=> {
          const note = document.querySelector("#notification-dropdown") as HTMLLIElement;
          if (ref.current && !ref.current.contains(event.target)) {
            note.style.display="none"
          }
          if(ref.current && ref.current.contains(event.target)){
              note.style.display="block"
              const result= await updateNotification({
                variables:{
                  user_id: userId,
                }
              })
          }
        }
  
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref, updateNotification, userId]);
    }

const NotificationContainer:React.FC<{notification:Notification[]}> = ({notification}) => {
  const wrapperRef = useRef(null);
  const {userId}=useAppSelector((state)=>state.userAuth)
  useOutsideAlerter(wrapperRef,userId);
        
          const countNotification=()=>{
            let count = 0;

           for (let i = 0; i < notification.length; i++) {
                if (!notification[i].seen) {
                count++;
             }
              }
              // console.log(count)
              return count
          }
    return (
        <div id="notification" className='notification-icon mr-4'ref={wrapperRef} >
        {notification&&countNotification()!==0&& (<span className="notification-number">{countNotification()}</span>)}
        <NotificationIcon/>
       
    <div className="dropdown-menu animated" id="notification-dropdown">
                  <div className="dropdown-header">
                    <span className="triangle"></span>
                    <span className="heading">Notifications</span>
                    {notification&&countNotification()!==0&&(<span className="count" id="dd-notifications-count">{countNotification()}</span>)}
                    
                  </div>
                  <div className="dropdown-body">
                    {notification && notification.map((item: Notification,index:number)=>(
                    <NotificationCard 
                    key={index}
                    img={`${configuration.FILE_STORAGE_LINK}${item.userProfile}`} 
                    name={item.username}
                    message={item.message}
                    type={item.type}
                    music={item.music}
                    buddie_list={item.buddie_list}
                    owner_name={item.owner_name}
                    date={item.date}
                    seen={item.seen}
                    is_verified={item.is_verified}
                    />
                    ))}
                    
                    {notification && notification.length===0&&(<div>
                      <LottieWrapper url="https://assets3.lottiefiles.com/packages/lf20_HDck25.json" width="100% " height="34vh" />
                      <div className="text-white no-note-nav-msg">No notifications at this time, go ahead and interact with the community.</div>
                      </div>
                    )}

                  </div>
                </div>
    </div>
    );
}

export default NotificationContainer;
