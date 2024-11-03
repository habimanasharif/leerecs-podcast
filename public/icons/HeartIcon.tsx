import React from 'react'

const HeartIcon:React.FC<{like:boolean,size?:number}>=({like,size})=>{
    return (
      <span >
      {(!like)&&(
        <svg xmlns="http://www.w3.org/2000/svg" width="23.722" height="21.64" viewBox="0 0 23.722 21.64" id="desktop">
        <g id="heart" transform="translate(-1.25 1.25)">
          <path id="Path_111" data-name="Path 111" d="M24.223,9.513A6.611,6.611,0,0,1,22.385,14.1c-2.712,2.812-5.343,5.745-8.156,8.453a1.628,1.628,0,0,1-2.286-.05L3.838,14.1a6.65,6.65,0,0,1,0-9.179,6.2,6.2,0,0,1,8.978,0l.3.3.294-.3a6.2,6.2,0,0,1,8.978,0,6.611,6.611,0,0,1,1.839,4.589Z" transform="translate(0 -3.5)" fill="#fff" stroke="#efe9f8" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
      )}
      {(like)&&(
        <svg xmlns="http://www.w3.org/2000/svg" width="23.722" height="21.64" viewBox="0 0 23.722 21.64" id="desktop">
        <g id="heart" transform="translate(-1.25 1.25)">
          <path id="Path_111" data-name="Path 111" d="M24.223,9.513A6.611,6.611,0,0,1,22.385,14.1c-2.712,2.812-5.343,5.745-8.156,8.453a1.628,1.628,0,0,1-2.286-.05L3.838,14.1a6.65,6.65,0,0,1,0-9.179,6.2,6.2,0,0,1,8.978,0l.3.3.294-.3a6.2,6.2,0,0,1,8.978,0,6.611,6.611,0,0,1,1.839,4.589Z" transform="translate(0 -3.5)" fill="#F8107D" stroke="#efe9f8" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
      )}
  
    </span>
  )
}
export default HeartIcon
