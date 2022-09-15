import Menu from './Menu'
import RightPanel from './RightPanel'
import { useEffect, useState } from 'react'
import CustomStyle from '@/styles/custom.module.css'

const Navbar: React.FC = () => {
  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    document.addEventListener('scroll', async () => {
      window.scrollY >= 30 ? setIsTop(false) : setIsTop(true)
    })
  }, [])

  return (
    <>
      <div
        className={`w-[100%] h-[64px] p-4 sticky top-0 flex justify-between items-center   
        ${!isTop && `bg-[rgba(29,29,31,0.7)] ${CustomStyle.blurs} `} ${CustomStyle.blurTransition}`}
      >
        <Menu />
        <RightPanel />
      </div>
    </>
  )
}

export default Navbar
