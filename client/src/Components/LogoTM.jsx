import React from 'react';

function LogoTM() {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
      xml:space="preserve"
      width="64px"
      height="64px"
      className="rounded-full w-12 h-12  "
    >
      <g>
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="#2faadc"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
        <polyline
          fill="none"
          stroke="#2faadc"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="16,32 25,44 50,24"
        />
      </g>
    </svg>
  );
}

export default LogoTM;
