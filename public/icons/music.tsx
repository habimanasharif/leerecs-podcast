import React from 'react'

export default function Music({color}:{color:string}) {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
        <g id="Icon_feather-music" data-name="Icon feather-music" transform="translate(-4 -4)">
          <path id="Path_201" data-name="Path 201" d="M13.5,25.333V7.278L30.167,4.5V22.556" transform="translate(-0.667)" fill="none" stroke={color ?color:"#ffff"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
          <path id="Path_202" data-name="Path 202" d="M12.833,26.667A4.167,4.167,0,1,1,8.667,22.5,4.167,4.167,0,0,1,12.833,26.667Z" transform="translate(0 -1.333)" fill="none" stroke={color ?color:"#ffff"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
          <path id="Path_203" data-name="Path 203" d="M30.833,23.667A4.167,4.167,0,1,1,26.667,19.5,4.167,4.167,0,0,1,30.833,23.667Z" transform="translate(-1.333 -1.111)" fill="none" stroke={color ?color:"#ffff"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        </g>
      </svg>
    </div>
  )
}

