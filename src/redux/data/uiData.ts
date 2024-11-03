import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface shareData {
  shareUrl: string;
  title?: string;
}
interface AssignData {
  name: string;
  id_attach: Number;
}
interface acticityData {
  albumName: string;
  owner: string;
  url: string;
  userId: string|number;
  message: string;
  requester?: string;
  action: "REMOVE" | "ADD" | "CLAIM" | "REQUEST" | "REQUEST-ACTIVITY";
}

interface uiDataState {
  shareData: shareData | null;
  showCreatePlaylist: boolean;
  showCreateAlbum: boolean;
  showFriends: boolean;
  showUpdateAudio: boolean;
  showClaimMusic: boolean;
  showClaimProfile: boolean;
  assignData: AssignData | null;
  showDeletePlaylist: number | null;
  showDeleteAlbum: number | null;
  showPaywall: boolean;
  audioCounter: number;
  isMini: boolean;
  showMusicPayWall: boolean;
  showInfoBanner: boolean;
  showMissingTrackBanner: boolean;
  topic_id: number;
  infoShowPage: string;
  shopActivityData: acticityData | null;
  addToPlaylist: number | null;
  addToAlbum: number | null;
}

const initialState: uiDataState = {
  shareData: null,
  showCreatePlaylist: false,
  showCreateAlbum: false,
  showFriends: false,
  showUpdateAudio: false,
  showClaimMusic: false,
  isMini: false,
  showClaimProfile: false,
  assignData: null,
  showDeletePlaylist: null,
  showDeleteAlbum: null,
  showPaywall: false,
  audioCounter: 0,
  showMusicPayWall: false,
  showInfoBanner: false,
  showMissingTrackBanner: false,
  topic_id: 0,
  infoShowPage: "",
  shopActivityData: null,
  addToPlaylist: null,
  addToAlbum: null,
};

export const uiDataSlice = createSlice({
  name: "uiData",
  initialState,
  reducers: {
    setShareData: (state, action: PayloadAction<shareData | null>) => {
      state.shareData = action.payload;
    },
    showPlaylist: (state) => {
      state.showCreatePlaylist = !state.showCreatePlaylist;
    },
    showAlbum: (state) => {
      state.showCreateAlbum = !state.showCreateAlbum;
    },
    setShowFriends: (state) => {
      state.showFriends = !state.showFriends;
    },
    setShowUpdateAudio: (state, action: PayloadAction<number>) => {
      state.topic_id = action.payload;
      state.showUpdateAudio = !state.showUpdateAudio;
    },
    setShowClaimMusic: (state) => {
      state.showClaimMusic = !state.showClaimMusic;
    },
    setClaimProfile: (state) => {
      state.showClaimProfile = !state.showClaimProfile;
    },
    setAssignData: (state, action: PayloadAction<AssignData | null>) => {
      state.assignData = action.payload;
    },
    setShowDeletePlaylist: (state, action: PayloadAction<number | null>) => {
      state.showDeletePlaylist = action.payload;
    },
    setShowDeleteAlbum: (state, action: PayloadAction<number | null>) => {
      state.showDeleteAlbum = action.payload;
    },
    setShowPaywall: (state) => {
      state.showPaywall = !state.showPaywall;
    },
    setShowMusicPaywall: (state) => {
      state.showMusicPayWall = !state.showMusicPayWall;
    },
    setInfoBanner: (
      state,
      action: PayloadAction<{ state: boolean; page: string }>
    ) => {
      state.showInfoBanner = action.payload.state;
      state.infoShowPage = action.payload.page;
    },
    setMissingTrackBanner: (
      state,
      action: PayloadAction<{ state: boolean; page: string }>
    ) => {
      state.showMissingTrackBanner = action.payload.state;
      state.infoShowPage = action.payload.page;
    },
    setAudioCounter: (state, action: PayloadAction<number>) => {
      state.audioCounter = action.payload;
    },
    setShopActivityData: (
      state,
      action: PayloadAction<acticityData | null>
    ) => {
      state.shopActivityData = action.payload;
    },
    setAddToPlaylist: (state, action: PayloadAction<number | null>) => {
      state.addToPlaylist = action.payload;
    },
    setAddToAlbum: (state, action: PayloadAction<number | null>) => {
      state.addToAlbum = action.payload;
    },
    setIsMini: (state) => {
      state.isMini = !state.isMini;
    },
  },
});

export const {
  setShareData,
  showPlaylist,
  showAlbum,
  setShowFriends,
  setShowUpdateAudio,
  setShowClaimMusic,
  setClaimProfile,
  setAssignData,
  setShowDeletePlaylist,
  setShowDeleteAlbum,
  setShowPaywall,
  setShowMusicPaywall,
  setInfoBanner,
  setMissingTrackBanner,
  setAudioCounter,
  setShopActivityData,
  setAddToPlaylist,
  setAddToAlbum,
  setIsMini,
} = uiDataSlice.actions;

export default uiDataSlice.reducer;
