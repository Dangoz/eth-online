import type { NextPage, GetServerSideProps } from 'next'
import ShowContainer from '@/components/show/ShowContainer'

const Show: NextPage = () => {
  return (
    <>
      <ShowContainer />
    </>
  )
}

export default Show

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pathArray = context?.params?.media as string[]
  if (pathArray[0] !== 'movie' && pathArray[0] !== 'tv') {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
  }
}
