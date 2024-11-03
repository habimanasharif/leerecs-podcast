import { gql } from "@apollo/client";
export const SIGNUP = gql`
  mutation (
    $fullname: String!
    $username: String!
    $email: String!
    $password: String!
    $token: String!
  ) {
    SignUp(
      signUpData: {
        fullname: $fullname
        username: $username
        email: $email
        password: $password
        token: $token
      }
    ) {
      userId
    }
  }
`;

export const REQUESTINTERVIEW = gql`
  mutation (
    $email: String!
    $name: String!
    $imageId: Int!
    $audioId: Int!
    $title: String!
    $username: String!
    $memberIp: String!
    $dateRegester: Float!
  ) {
    RequestInterview(
      interviewInfo: {
        email: $email
        name: $name
        imageId: $imageId
        audioId: $audioId
        username: $username
        title: $title
        memberIp: $memberIp
        dateRegester: $dateRegester
      }
    ) {
      desc
    }
  }
`;

export const ADDMUSIC = gql`
  mutation (
    $thumbnail: String!
    $file: Int!
    $title: String!
    $category: Int!
    $tag: String!
    $desc: String!
    $userId: Int!
  ) {
    AddMusic(
      musicData: {
        thumbnail: $thumbnail
        file: $file
        title: $title
        category: $category
        tag: $tag
        desc: $desc
        userId: $userId
      }
    ) {
      title
      desc
    }
  }
`;

export const LIKEMUSIC = gql`
  mutation ($music_id: Int!, $userId: Int!) {
    AddMusicLike(musicLikedData: { music_id: $music_id, userId: $userId }) {
      desc
    }
  }
`;

export const UPDATEUSERPROFILE = gql`
  mutation (
    $username: String!
    $title: String!
    $website: String!
    $bio: String!
    $profileImg: Int!
    $headerImg: Int!
    $userId: Int!
  ) {
    UpdateUserProfile(
      profileInfo: {
        username: $username
        title: $title
        website: $website
        bio: $bio
        profileImg: $profileImg
        headerImg: $headerImg
        userId: $userId
      }
    ) {
      desc
    }
  }
`;
export const SHOPACTIVITIES = gql`
  mutation ($shopData: albumToShopData!) {
    ClaimShop(shopData: $shopData) {
      desc
    }
  }
`;
export const UPDATEPLAYLIST = gql`
  mutation ($cover: Int!, $desc: String!, $title: String!, $playlistId: Int!) {
    UpdatePlaylist(
      playlistData: {
        cover: $cover
        desc: $desc
        title: $title
        playlistId: $playlistId
      }
    ) {
      desc
    }
  }
`;

export const DELETEPLAYLIST = gql`
  mutation ($playlistId: Int!) {
    DeletePlaylist(playlistId: $playlistId) {
      desc
    }
  }
`;

export const ADDMUSICTOPLAYLIST = gql`
  mutation (
    $music_file: Int!
    $music_thumbnail: Int!
    $music_artist: Int!
    $playlist_id: Int!
  ) {
    AddMusicToPlaylist(
      musicData: {
        music_file: $music_file
        music_thumbnail: $music_thumbnail
        music_artist: $music_artist
        playlist_id: $playlist_id
      }
    ) {
      desc
    }
  }
`;

export const REMOVEMUSIC = gql`
  mutation (
    $music_file: Int!
    $music_thumbnail: Int!
    $music_artist: Int!
    $playlist_id: Int!
  ) {
    RemoveMusicFromPlaylist(
      musicData: {
        music_file: $music_file
        music_thumbnail: $music_thumbnail
        music_artist: $music_artist
        playlist_id: $playlist_id
      }
    ) {
      desc
    }
  }
`;

export const UPDATEALBUM = gql`
  mutation ($cover: Int!, $desc: String!, $title: String!, $playlistId: Int!) {
    UpdateAlbum(
      albumData: {
        cover: $cover
        desc: $desc
        title: $title
        playlistId: $playlistId
      }
    ) {
      desc
    }
  }
`;

export const ADDMUSICTOALBUM = gql`mutation(
  $music_file:Int!,
  $music_thumbnail:Int!,
  $music_artist:Int!,
  $playlist_id:Int!,
){
AddMusicToAlbum(albumMusicData:{
  music_file:$music_file,
  music_thumbnail:$music_thumbnail,
  music_artist:$music_artist,
  playlist_id:$playlist_id,
}){
  desc
}
}`

export const REMOVEMUSICFROMALBUM = gql`mutation(
  $music_file:Int!,
  $music_thumbnail:Int!,
  $music_artist:Int!,
  $playlist_id:Int!,
){
  RemoveMusicFromAlbum(albumMusicData:{
  music_file:$music_file,
  music_thumbnail:$music_thumbnail,
  music_artist:$music_artist,
  playlist_id:$playlist_id,
}){
  desc
}
}`

export  const DELETEALBUM = gql`mutation($playlistId:Int!,)
{
    DeleteAlbum(albumId: $playlistId,){
        desc
    }
}`

export const CREATEALBUM = gql`
    mutation($title:String!,$desc:String!,$userId:Int!,$cover:Int!){
    CreateAlbum(albumData:{
    title:$title,
    desc:$desc,
    userId:$userId,
    cover:$cover,
    }){
        albumId
        desc
    }
    }`

export  const CREATEPLAYLIST = gql`
mutation($title:String!,$desc:String!,$userId:Int!,$cover:Int!){
CreatePlaylist(playListData:{
title:$title,
desc:$desc,
userId:$userId,
cover:$cover,
}){
    playListId
    desc
}
}`

export const ADDBUDDIE = gql`mutation
    (
        $myId:Int!,
        $myBuddieId:Int!
    ){
        AddBuddie(buddie:{
        myId: $myId,
	    myBuddieId: $myBuddieId,
    }){
        desc
    }
}`
export  const UPDATENOTIFICATION = gql`mutation($user_id:Int!)
{
 update_notification(user_Id:$user_id){
        desc
    }
}`

export const SENDEMAIL = gql`
    mutation (
      $email: String!
      $subject: String!
      $details: String!
      $token: String!
    ) {
      SenddEmail(
        userInfo: {
          email: $email
          subject: $subject
          details: $details
          token: $token
        }
      ) {
        desc
      }
    }
  `;