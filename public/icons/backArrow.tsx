import React from 'react';

export default function BackArrow() {
  return (
    <div>
      <svg
        width="124"
        height="124"
        viewBox="0 0 124 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="62" cy="62" r="60" stroke="white" strokeWidth="4" />
        <path
          d="M87.6667 62L36.3333 62"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M62 87.6667L36.3333 62L62 36.3333"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
