import type { NextPage, GetServerSideProps } from 'next'
import ShowContainer from '@/components/show/ShowContainer'
import type { Media } from '@/types/tmdb'
import tmdb from '@/common/tmdb'

const Show: NextPage<{ media: Media }> = ({ media }) => {
  return (
    <>
      <ShowContainer media={media} />
    </>
  )
}

export default Show

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id as string

  const { media, error } = await tmdb.getDetails(+id, 'tv')
  if (error !== null) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      media,
    },
  }
}
