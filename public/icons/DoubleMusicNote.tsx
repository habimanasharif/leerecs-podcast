import React from 'react'
interface props {
    color: string;
   
  }
const DoubleMusicNote: React.FC<props> = (props)=>{
  return (
    <div className='song-simple'>
    <svg width="26" height="26" strokeWidth="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="favorite" transform="translate(-2.002 -6)">
   <g id="Component_4_1" data-name="Component 4 – 1" transform="translate(2.002 6)">
<path d="M20 14V3L9 5V16" stroke={props.color } strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17 19H18C19.1046 19 20 18.1046 20 17V14H17C15.8954 14 15 14.8954 15 16V17C15 18.1046 15.8954 19 17 19Z" stroke={props.color }  strokeLinecap="round" strokeLinejoin="round" />
<path d="M6 21H7C8.10457 21 9 20.1046 9 19V16H6C4.89543 16 4 16.8954 4 18V19C4 20.1046 4.89543 21 6 21Z" stroke={props.color }  strokeLinecap="round" strokeLinejoin="round"/>
</g>
 </g>
</svg>
</div>

  )
}

export default DoubleMusicNote