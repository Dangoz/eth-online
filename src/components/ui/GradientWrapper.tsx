import React, { ReactNode } from 'react'

// additional properties such as rounded(border-raidus) need to be passed in within className
interface GradientWrapperProps {
  width?: number
  height?: number
  borderRaidus?: number
  borderWidth?: number
  className?: string
  children?: ReactNode
  hover?: boolean
}

// w-[210px] h-[60px] rounded-[50px]
const GradientWrapper = ({
  width = 210,
  height = 60,
  borderRaidus = 0,
  borderWidth = 5,
  className,
  children,
  hover = true,
}: GradientWrapperProps) => {
  return (
    <div
      className={`${className} flex justify-center items-center bg-gradient-to-r from-purple-400 to-pink-600`}
      style={{ width: `${width}px`, height: `${height}px`, borderRadius: `${borderRaidus}px` }}
    >
      <div
        className={`${className} flex items-center bg-white transition-all duration-1000 ${
          hover ? 'hover:bg-gradient-to-r from-purple-400 to-pink-600' : ''
        }`}
        style={{
          width: `${width - borderWidth}px`,
          height: `${height - borderWidth}px`,
          borderRadius: `${borderRaidus}px`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default GradientWrapper
