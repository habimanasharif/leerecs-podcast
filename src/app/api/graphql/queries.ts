import { gql } from "@apollo/client";

export const GET_MUSIC = gql`
  query {
    MusicHome {
      music {
        title
        thumbnail
        file
        username
        musicId
        imageId
        memberId
        topicId
        anonymous
        messageId
        color_name
      }
    }
  }
`;

export const FEATURED_MUSIC = gql`
  query {
    AllFeaturedMusic {
      title
      thumbnail
      file
      username
      musicId
      imageId
      memberId
      topicId
      anonymous
      messageId
      profile
    }
  }
`;

export const USERAUTH = gql`
  query($userId:Int) {
    UserAuth(userId:$userId) {
      isAdmin
      isContributor
      username
      profileImg
      color {
        title
        color
        id
        desc
      }
      isLogedIn
      userPlaylist {
        title
        desc
        playListId
      }
      userAlbum {
        title
        desc
      }
    }
  }
`;

export const AllMUSIC = gql`
  query($page:Int, $limit:Int) {
    AllMusic(page: $page, limit: $limit) {
      thumbnail
      file
      title
      username
      color_name
    }
  }
`;

export const ALLARTISTS = gql`
  query($page:Int, $limit:Int) {
    AllArtist(page: $page, limit: $limit) {
      username
      profileImg
      userId
      criteria
    }
  }
`;
export const ALLALBUMS = gql`
  query {
    AllAlbums {
      title
      cover
      albumId
      username
    }
  }
`;
export const ALLPLAYLISTS = gql`
  query {
    AllPlaylists {
      title
      cover
      playListId
      username
    }
  }
`;

export const GET_USER_INFO = gql`
  query User($username: String!) {
    UserInfoByusername(username: $username) {
      username
           title
           website
           bio
           profileImg
           headerImg
           profileId
           headerId
           userId
           karma
           buddies
           buddie_list
           id_group
           songTitle
           shop_status
           shop_requests
    }
  }
`;

export const ALLMUSICBYARTIST = gql`query UserMusic($userId:Int!) {
  AllMusicByArist(userId:$userId){
    title
    thumbnail
    file
    username
    musicId
    imageId
    memberId
    topicId
    messageId
    color_name
}
}`;
export const ALLUPLOADEDMUSIC = gql`query UserMusic($userId:Int!) {
  AllMusicByAristUserId(userId:$userId){
    title
    thumbnail
    file
    username
    musicId
    imageId
    memberId
    topicId
    messageId
    activated
    color_name
}
}`;


export const OTHERARTIST = gql`query($userId:Int ){
  MoreArtist(userId:$userId) {
     username
     profileImg
     userId
     criteria
 }
}`

export const SINGLESONGDATA = gql`
query($owner:String!,$songname:String!) {
  SingleSongData(
    profileInfo: { owner:$owner, songname:$songname  }
  ) {
    title
    thumbnail
    file
    username
    musicId
    imageId
    memberId
    topicId
    anonymous
    messageId
    lyrics
    cover_id
    id_msg
    user_id
    albumNo
    playlistNo
    color
    color_name
    owner{
       username
title
website
bio
profileImg
headerImg
profileId
headerId
userId
karma
buddies
buddie_list
id_group
   }    

  }
}
`;

export const ALLPLAYLISTBYUSER =  gql`query($userId:Int!){
  AllPlaylistsByUser(userId:$userId) {
  title
  desc
  username
  cover
  playListId
  }
}`

export const ALLALBUMBYUSER = gql`query($userId:Int!){
  AllAlbumByUser(userId:$userId){
      title
      cover
      albumId
      username
  }
}`
export  const ALLMUSICINALBUM =gql`query($albumId:String!){
   AllMusicInAlbum(albumId:$albumId){
        title
        thumbnail
        desc
        file
        musicId
        username
        imageId
        messageId
        color_name
        topicId
        userId
        order_id
        playlist_id
    }

}`

export const ALBUMDATA = gql`query($album:String!){
  SingleAlbumData(albumId:$album){
      title
    desc
    cover
      userId
      albumId
      coverId
  }
  }`

export const PLAYLISTDATA = gql`query($playListId:String!){
  SinglePlaylistData(playListId:$playListId){
    title
	    desc
	    cover
        playListId
        userId
        coverId
  }
  }`

export const ALLMUSICINPLAYLIST = gql`query($playlistId:String!){
  AllMusicInPlaylist(playlistId:$playlistId){
      title
      thumbnail
      desc
      file
      musicId
      username
      messageId
      topicId
      userId
      color_name
  }
}`

export const ALLMUSICINCOLOR = gql`query($colorId:String!){
  AllMusicInColor(colorId:$colorId){
      id
  title
  music{
      title
      thumbnail
      desc
      file
      musicId
      username
      imageId
      messageId
      topicId
      user_id
      color_name
  }
  }
}`

export const ALLMUSICUSERLOVED = gql`
query($userId:Int!){
  AllMusicUserLoved(userId:$userId){
      title
      thumbnail
      desc
      file
      musicId
      username
      imageId
      messageId
      topicId
      memberId
      color_name
  }
}`
export const HISTORY = gql`
query($userId:Int!){
  AllUserHistory(userId:$userId){
      title
      thumbnail
      desc
      file
      musicId
      username
      imageId
      messageId
      topicId
      memberId
      color_name
  }
}`

export const GETBOARDS = gql`query{
  AllBoards{
     id
     name
 }
}`

export const IMAGEQUERY = gql`query($userId:Int!){
  AllUserImage(userId:$userId){
      filename
  }
}`

export const ALLUSERFRIENDS= gql`query($userId:Int!){
  AllUserFriends(userId:$userId){
     name
     picture
     buddie_list
     userId
      
  }
  }`

export const ALLARTISTWITHMUSIC = gql`query{
  AllArtistWithMusic{
      username
      profileImg
      userId
      criteria
     
  }
}`

export const RECOMMENDEDMUSIC =gql`query($songId:Int!){
  RecommendedMusic(songId:$songId) {
    thumbnail
      file
      title
      username
      color_name
   }
   }`
   export const ISMUSICLIKEDBYUSER = gql`query($topicId:Int!,$userId:Int!){
    IsMusicLikedByUser(likeInfo:{
        userId:$userId,
        musicId:$topicId
    }){
        desc
    }
  }`

export const MUSIC_SEARCH_QUERY = gql`query($searchQuery:String!){
  SearchInAllMusic(query:$searchQuery){
    thumbnail
      file
      title
      username
      color_name
  }
}`;
export const SEARCH_ARTISTS_QUERY = gql`query($searchQuery:String!){
  AllFeaturedArtistSearch(query:$searchQuery){
      username
      profileImg
      userId
      criteria
  }
}`

export const SEARCH_PLAYLIST_QUERY = gql`query($searchQuery:String!){
  AllPlaylistsSearch(query:$searchQuery){
  title
desc
username
cover
  playListId
  }
}`
export const SEARCH_ALBUMS = gql`query($searchQuery:String!){
  AllAlbumsSearch(query:$searchQuery){
      title
    cover
      username
      albumId
    
  }
}`

