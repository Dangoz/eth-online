import React from 'react'

const GradientText: React.FC<{ text: string; style?: string }> = ({ text, style }) => {
  return (
    <>
      <div
        className={`text-transparent bg-clip-text bg-gradient-to-r from-gradientOne via-gradientTwo to-gradientThree ${style}`}
      >
        {text}
      </div>
    </>
  )
}

export default GradientText
