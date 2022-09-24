import Menu from './Menu'
import RightPanel from './RightPanel'
import { useEffect, useState } from 'react'
import CustomStyle from '@/styles/custom.module.css'
import SearchBar from '../search/SearchBar'

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
        <div className=" basis-1/3">
          <Menu />
        </div>
        <div className=" basis-1/3 flex justify-center">
          <SearchBar />
        </div>
        <div className="basis-1/3">
          <RightPanel />
        </div>
      </div>
    </>
  )
}

export default Navbar
