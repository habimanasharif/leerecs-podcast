import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MusicData {
    name: string;
    singer: string;
    cover: string;
    musicSrc: string;
    color?: string;
}

interface State {
    musicData: MusicData[];
    playIndex:number
}

const initialState: State = {
    musicData: [],
    playIndex:0,
};

export const musicPlayerData = createSlice({
    name: "musicPlayerData",
    initialState,
    reducers: {
        setMusicData: (state, action: PayloadAction<MusicData[]>) => {
            state.musicData = action.payload;
        },
        addMusic: (state, action: PayloadAction<MusicData>) => {
            state.musicData.push(action.payload);
        },
        setPlayIndex:(state, action: PayloadAction<number>)=>{
            state.playIndex=action.payload
        }

    }
});

export const { setMusicData, addMusic,setPlayIndex } = musicPlayerData.actions;
export default musicPlayerData.reducer;
