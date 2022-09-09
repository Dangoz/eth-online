import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Menu from '@/components/navigation/Menu'
import Spinner from '@/components/ui/Spinner'
import { Button, Loading, Dropdown } from '@nextui-org/react'
import GradientWrapper from '@/components/ui/GradientWrapper'

const Home: NextPage = () => {
  return (
    <>
      <Menu />
      <div></div>
    </>
  )
}

export default Home
