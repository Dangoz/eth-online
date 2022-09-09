import React from 'react'
import Connect from './Connect'

const Menu = () => {
  return (
    <>
      <div className=" m-auto h-[64px] w-[500px] bg-slate-500 sticky top-2 rounded-full flex items-center justify-center z-50">
        <Connect />
      </div>
    </>
  )
}

export default Menu
