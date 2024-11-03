import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Color {
    title: string;
    color: string;
    id: number;
    desc: string;
  }
  
  interface Playlist {
    title: string;
    desc: string;
    playListId: string;
  }
  
  interface Album {
    title: string;
    desc: string;
  }
  
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
  
  interface UserAuth {
    isAdmin: boolean;
    username:string
    profileImg:string
    isContributor: boolean;
    color: Color[];
    isLogedIn: boolean;
    userPlaylist: Playlist[];
    userAlbum: Album[];
    usernotification: Notification[];
  }

 interface State {
    userAuth: UserAuth;
    userId:number
  }

  const initialState:State = {
    userAuth:{
     username:"",
     profileImg:"",
    isAdmin: false,
    isContributor: false,
    isLogedIn:false,
    color:[],
    userPlaylist:[],
    userAlbum:[],
    usernotification:[],},
    userId:0
  
    }
  export const UserAuth = createSlice({
    name: "UserAuth",
  initialState,
  reducers: {
    setUserAuth(state, action: PayloadAction<UserAuth>){
        state.userAuth=action.payload
        state.userId=typeof localStorage !== 'undefined' ?parseInt(localStorage.getItem("userId")as string):0;
    }
  }
  })

  export const {setUserAuth}=UserAuth.actions;
  export default UserAuth.reducer;