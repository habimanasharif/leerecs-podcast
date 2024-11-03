import { ALLMUSICBYARTIST, ALLMUSICINALBUM, ALLMUSICINCOLOR, ALLMUSICINPLAYLIST } from "@/app/api/graphql/queries";
import configuration from "@/config";
import {setMusicData, setPlayIndex } from "@/redux/data/musicPlayer";
import { useAppDispatch } from "@/redux/hook";
import { useQuery } from "@apollo/client";



interface MusicData {
    name: string;
    singer: string;
    cover: string;
    musicSrc: string;
    color: string;
}

export const usePlayer = () => {
    const dispatch = useAppDispatch();
   
    const {refetch } = useQuery(ALLMUSICINCOLOR, {
        variables: { colorId: "" },
        skip: true,
    });
    const { refetch:refetchArtist} = useQuery(ALLMUSICBYARTIST, {
        variables: { userId:0 },
        skip: true,
      });
      const { refetch:refetchPlaylist } = useQuery(ALLMUSICINPLAYLIST, {
        variables: { playlistId:"" },
        skip:true
      });
      const {refetch:refetchAlbum} = useQuery(ALLMUSICINALBUM, {
        variables: { albumId:""},
        skip:true
      });
    

    const playMusic = async (song: MusicData) => {
        const newSong = {
            name: song.name,
            singer: song.singer,
            cover: configuration.FILE_STORAGE_LINK + song.cover,
            musicSrc: configuration.READFILE_LINK + song.musicSrc,
            color: song.color
        };

        const fetchMusic = async () => {
            if (song.color) {
                const result = await refetch({ colorId: song.color });
                const newSongs = result.data?.AllMusicInColor.music.filter((newSong:any)=>(newSong.title!==song?.name)) || [];
                const formattedSongs = newSongs.map((newSong: any) => {
                    return{
                    name: newSong.title,
                    singer: newSong.username,
                    cover: configuration.FILE_STORAGE_LINK + newSong.thumbnail,
                    musicSrc: configuration.READFILE_LINK + newSong.file,
                    color: newSong.color_name
                }});
                dispatch(setPlayIndex(0))
                dispatch(setMusicData([newSong,...formattedSongs]));
            }
        };

        fetchMusic();
    }
    const playSingle= async(data:any,index:number)=>{
        const formattedSongs = data.map((newSong: any) => {
            return{
            name: newSong.title,
            singer: newSong.username,
            cover: configuration.FILE_STORAGE_LINK + newSong.thumbnail,
            musicSrc: configuration.READFILE_LINK + newSong.file,
            color: newSong.color_name
        }});
        dispatch(setPlayIndex(index))
        dispatch(setMusicData(formattedSongs))
    }

    const playColor= async (color: string) => {
        const fetchMusic = async () => {
            if (color) {
                const result = await refetch({ colorId:color });
                const newSongs = result.data?.AllMusicInColor.music
                const formattedSongs = newSongs.map((newSong: any) => {
                    return{
                    name: newSong.title,
                    singer: newSong.username,
                    cover: configuration.FILE_STORAGE_LINK + newSong.thumbnail,
                    musicSrc: configuration.READFILE_LINK + newSong.file,
                    color: newSong.color_name
                }});
                dispatch(setPlayIndex(0))
                dispatch(setMusicData(formattedSongs));
            }
        };

        fetchMusic();
    }

    const playArtist = async (artist: number)=>{
        const fetchArtistMusic = async () => {
            if (artist) {
                const result = await refetchArtist({ userId:artist });
                const newSongs = result.data?.AllMusicByArist || [];
                const formattedSongs = newSongs.map((newSong: any) => {
                    return{
                    name: newSong.title,
                    singer: newSong.username,
                    cover: configuration.FILE_STORAGE_LINK + newSong.thumbnail,
                    musicSrc: configuration.READFILE_LINK + newSong.file,
                    color: newSong.color_name
                }});
                dispatch(setPlayIndex(0))
                dispatch(setMusicData(formattedSongs));
            }
        };
        fetchArtistMusic()

    }

    const playPlaylist = async (playlist: string)=>{
        const fetchPlaylistMusic = async () => {
            if (playlist) {
                const result = await refetchPlaylist({ playlistId:playlist });
                const newSongs = result.data?.AllMusicInPlaylist || [];
                const formattedSongs = newSongs.map((newSong: any) => {
                    return{
                    name: newSong.title,
                    singer: newSong.username,
                    cover: configuration.FILE_STORAGE_LINK + newSong.thumbnail,
                    musicSrc: configuration.READFILE_LINK + newSong.file,
                    color: newSong.color_name
                }});
                dispatch(setPlayIndex(0))
                dispatch(setMusicData(formattedSongs));
            }
        };
        fetchPlaylistMusic()

   
       }
      
       const playAlbum = async (album: string)=>{
        const fetchAlbumMusic = async () => {
            if (album) {
                const result = await refetchAlbum({ albumId:album });
                const newSongs = result.data?.AllMusicInAlbum || [];
                const formattedSongs = newSongs.map((newSong: any) => {
                    return{
                    name: newSong.title,
                    singer: newSong.username,
                    cover: configuration.FILE_STORAGE_LINK + newSong.thumbnail,
                    musicSrc: configuration.READFILE_LINK + newSong.file,
                    color: newSong.color_name
                }});
                dispatch(setPlayIndex(0))
                dispatch(setMusicData(formattedSongs));
            }
        };
        fetchAlbumMusic()

   
       } 

       const playPodcast=async(title:string)=>{
        const fetchFeed = async () => {
              const response = await fetch('/api/podcasts');
              const data = await response.json();
              const newSongs = data.data;
              let playIndex = 0;
              const formattedSongs = newSongs.map((newSong: any,index:number) => {
                if(newSong.musicName==title){
                    playIndex=index
                }
                return{
                name: newSong.musicName,
                singer:newSong.artist,
                cover:  newSong.imageUrl,
                musicSrc:  newSong.musicUrl,
                color: newSong.color_name
            }});
            dispatch(setPlayIndex(playIndex))
            dispatch(setMusicData(formattedSongs));

          };
          fetchFeed()

       }

   


    return [{ playMusic, playArtist,playPlaylist,playAlbum,playColor,playSingle,playPodcast }];
};
