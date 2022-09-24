import Menu from './Menu'
import RightPanel from './RightPanel'
import { useEffect, useState } from 'react'
import CustomStyle from '@/styles/custom.module.css'

const Navbar: React.FC = () => {
  const [isTop, setIsTop] = useState(true)

  useEffect(() => {
    document.addEventListener('scroll', async () => {
      window.scrollY >= 45 ? setIsTop(false) : setIsTop(true)
    })
  }, [])

  return (
    <>
      <div
        className={`z-50 w-[100%] h-[64px] p-4 top-0 flex justify-between items-center   
        ${!isTop ? `${CustomStyle.blurs} sticky bg-bgBlue bg-opacity-50` : ` relative bg-bgBlue`} 
          ${CustomStyle.blurTransition}`}
      >
        <Menu />
        <RightPanel />
      </div>
    </>
  )
}

export default Navbar
