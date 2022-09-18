import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export interface MenuOptionProps {
  title: string
  icon?: React.ReactNode
  onClick?: () => void
}

const MenuOption: React.FC<MenuOptionProps> = ({ title, icon, onClick }) => {
  const [isActivePath, setIsActivePath] = useState(false)
  const router = useRouter()

  useEffect(() => {
    title === 'Home'
      ? setIsActivePath(router.pathname === '/')
      : setIsActivePath(router.pathname.slice(1) === title.toLowerCase())
  }, [router, title])

  return (
    <>
      <div
        className={`flex items-center justify-center cursor-pointer hover:bg-bgGrey text-[16px] 
       w-[81px] h-[44px] rounded-[12px] ${
         isActivePath &&
         'text-transparent bg-clip-text bg-gradient-to-r from-gradientOne via-gradientTwo to-gradientThree'
         // `bg-bgGrey`
       }`}
        onClick={onClick}
      >
        {title}
      </div>
    </>
  )
}

export default MenuOption
