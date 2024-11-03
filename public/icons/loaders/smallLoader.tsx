import React from 'react';
import "@/sass/loaders/index.scss"
interface props{
  size?: number;
}
const  SmallLoader:React.FC<props>=({size})=>{
  return (
    <svg
      height={size?size:"50"}
      width={size?size:"50"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      id="loader"
    >
      <g
        fill="none"
        stroke="#D2DED2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      >
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </g>
    </svg>
  );
}

export default SmallLoader;
