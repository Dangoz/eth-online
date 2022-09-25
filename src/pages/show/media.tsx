import type { NextPage, GetServerSideProps } from 'next'
import ShowContainer from '@/components/show/ShowContainer'
import type { Media } from '@/types/tmdb'
import tmdb from '@/common/tmdb'

const Show: NextPage<{ media: Media }> = ({ media }) => {
  return (
    <>
      {/* <ShowContainer media={media} /> */}
      123
    </>
  )
}

export default Show

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const pathArray = context?.params?.media as string[]
//     if (pathArray[0] !== 'movie' && pathArray[0] !== 'tv') {
//       return {
//         notFound: true,
//       }
//     }

//     const { media, error } = await tmdb.getDetails(+pathArray[1], pathArray[0])
//     if (error !== null) {
//       return {
//         notFound: true,
//       }
//     }

//     return {
//       props: {
//         media,
//       },
//     }
//   } catch (err) {
//     const error = err as any
//     console.error(error?.data?.message || error?.message || error)
//     return {
//       notFound: true,
//     }
//   }
// }
