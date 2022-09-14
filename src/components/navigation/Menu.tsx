import Image from 'next/image'
import Link from 'next/link'
import blurURL from '@/common/blur'
import MenuOption, { MenuOptionProps } from './MenuOption'
import Router from 'next/router'
import React from 'react'

const menuOptions: MenuOptionProps[] = [
  {
    title: 'Home',
    onClick: () => {
      Router.push('/')
    },
  },
  {
    title: 'Explore',
    onClick: () => {
      Router.push('/explore')
    },
  },
]

const Menu: React.FC = () => {
  return (
    <div className="flex justify-start items-center gap-8">
      <Link href={'/'} passHref>
        <>
          <Image
            width={200}
            height={45}
            src="/logo-full.svg"
            alt="Default Image"
            className="cursor-pointer"
            placeholder="blur"
            blurDataURL={blurURL}
          />
        </>
      </Link>

      <div className="flex items-center justify-start gap-3">
        {menuOptions.map((option, index) => (
          <MenuOption key={index} title={option.title} icon={option.icon} onClick={option.onClick} />
        ))}
      </div>
    </div>
  )
}

export default Menu
