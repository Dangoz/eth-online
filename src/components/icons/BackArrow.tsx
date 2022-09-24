import React from 'react'

const BackArrow: React.FC = () => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 9L21 15M21 15L15 21M21 15H9C7.4087 15 5.88258 14.3679 4.75736 13.2426C3.63214 12.1174 3 10.5913 3 9C3 7.4087 3.63214 5.88258 4.75736 4.75736C5.88258 3.63214 7.4087 3 9 3H12"
          stroke="url(#paint0_linear_272_4996)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_272_4996"
            x1="3"
            y1="3"
            x2="24.3697"
            y2="9.00171"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#85FFC4" />
            <stop offset="0.458333" stopColor="#5CC6FF" />
            <stop offset="0.807292" stopColor="#BC85FF" />
          </linearGradient>
        </defs>
      </svg>
    </>
  )
}

export default BackArrow
