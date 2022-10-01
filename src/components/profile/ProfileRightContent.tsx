import { LensProfile } from '@/types/lens'
import ProfileTab from './ProfileTab'
import { useState, useEffect, useCallback } from 'react'
import { Loading, Spacer } from '@nextui-org/react'
import nftport from '@/common/nftPort'
import type { FavoriteMetadata } from '@/types/tmdb'
import useAddress from '@/hooks/useAddress'
import Router from 'next/router'
import { getPostsByProfileId } from '@/common/lens/post'
import type { LensPost } from '@/types/lens'
import ReviewCard from '@/components/review/ReviewCard'

const tabs = ['Favorties', 'Reviews', 'Gallery', 'Stats']

const ProfileRightContent: React.FC<{ profile: LensProfile | null }> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [favoriteNfts, setFavoriteNfts] = useState<FavoriteMetadata[]>([])
  const [reviews, setReviews] = useState<LensPost[]>([])

  const getFavoriteNfts = useCallback(async () => {
    if (!profile) {
      return
    }
    const nfts = await nftport.getFavorites(profile.ownedBy)
    const metadata = nfts.map((nft) => nft.metadata)
    setFavoriteNfts(metadata)
  }, [profile])

  const getReviews = useCallback(async () => {
    if (!profile) {
      return
    }
    const posts = await getPostsByProfileId(profile.id)
    const lensPosts = (posts?.items || []) as LensPost[]
    setReviews(lensPosts)
  }, [profile])

  useEffect(() => {
    if (activeTab === 'Favorties') {
      getFavoriteNfts()
      return
    }
    if (activeTab === 'Reviews') {
      getReviews()
      return
    }
  }, [activeTab, getFavoriteNfts, getReviews])

  if (!profile) {
    return <></>
  }
  return (
    <>
      <div className="h-full w-[800px] pt-8">
        {/* Tab Options */}
        <div className="flex pl-10 gap-10">
          {tabs.map((tab, index) => (
            <div key={index} onClick={() => setActiveTab(tab)}>
              <ProfileTab text={tab} active={tab === activeTab} />
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="w-full flex justify-center items-center mt-10">
            <Loading size="xl" />
          </div>
        )}

        {activeTab === 'Favorties' && !isLoading && (
          <div className="h-full w-full grid grid-cols-4 gap-10 p-10">
            {favoriteNfts.map((nft, index) => (
              <div
                className="h-[100%] w-[100%] bg-gray-200 rounded-md border border-white cursor-pointer hover:opacity-50"
                key={index}
                onClick={() => Router.push(`/show/${nft.mediaType}/${nft.mediaId}`)}
              >
                <img src={nft.poster} alt={nft.name} className="h-full w-full object-cover rounded-md" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Reviews' && !isLoading && (
          <div className="mb-10">
            {reviews.map((review, index) => (
              <div key={index} className="">
                <ReviewCard review={review} key={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ProfileRightContent
