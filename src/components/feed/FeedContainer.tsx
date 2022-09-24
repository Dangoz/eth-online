import { useState, useEffect, useCallback } from 'react'
import FeedContent from './FeedContent'
import type { LensPost } from '@/types/lens'
import { exploreLatestPosts, EXPLORE_LATEST_POSTS } from '@/common/lens/post'
import { useQuery } from 'urql'
import { handleError, notifyErrorMessage } from '@/common/notification'
import type { PaginatedResultInfo } from '@/types/generated/types'
import { Button, Spacer, Loading } from '@nextui-org/react'
import useDebounce from '@/hooks/useDebounce'
import Image from 'next/image'
import blurURL from '@/common/blur'

const FeedContainer: React.FC = () => {
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [currentPageInfo, setCurrentPageInfo] = useState<PaginatedResultInfo | null>(null)
  const [reviews, setReviews] = useState<LensPost[]>([])
  const [feedResult, fetchFeedResult] = useQuery({
    query: EXPLORE_LATEST_POSTS,
    variables: {
      cursor: nextCursor,
    },
  })

  useEffect(() => {
    if (feedResult.error) {
      handleError(feedResult.error)
      return
    }
    if (feedResult.fetching) {
      return
    }
    if (feedResult.data) {
      const posts = feedResult.data.explorePublications.items
      console.log('setting review')
      setReviews((reviews) => [...reviews, ...posts])
      setCurrentPageInfo(feedResult.data.explorePublications.pageInfo)
    }
  }, [feedResult])

  const debouncedCursorChange = useDebounce(async (cursor: string) => {
    setNextCursor(cursor)
  }, 1000)

  const handleLoadMore = useCallback(async () => {
    if (!currentPageInfo) {
      return
    }
    if (feedResult.fetching) {
      return
    }
    debouncedCursorChange(currentPageInfo.next)
  }, [currentPageInfo, debouncedCursorChange, feedResult])

  return (
    <>
      <Image
        src="/home-cover.png"
        alt="Default Cover"
        placeholder="blur"
        blurDataURL={blurURL}
        width={1920}
        height={600}
      />

      <FeedContent reviews={reviews} />

      <Spacer y={1} />
      <div className="flex justify-center items-center w-full h-[50px]">
        {currentPageInfo?.totalCount && currentPageInfo.totalCount > reviews.length && !feedResult.fetching && (
          <Button className="gradientBG" onPress={handleLoadMore}>
            Load More
          </Button>
        )}

        {feedResult.fetching && <Loading type="default" size="lg" color={'secondary'} />}
      </div>
      <Spacer y={2} />
    </>
  )
}

export default FeedContainer
