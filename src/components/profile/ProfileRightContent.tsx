import { LensProfile } from '@/types/lens'
import ProfileTab from './ProfileTab'
import { useState, useEffect, useCallback } from 'react'
import { Loading, Spacer } from '@nextui-org/react'
import nftport from '@/common/nftPort'
import rss3 from '@/common/rss3'
import type { FavoriteMetadata } from '@/types/tmdb'
import Router from 'next/router'
import { getPostsByProfileId } from '@/common/lens/post'
import type { LensPost } from '@/types/lens'
import ReviewCard from '@/components/review/ReviewCard'
import type { Asset } from '@/types/rss3'
import { Button } from '@nextui-org/react'

const tabs = ['Favorties', 'Reviews', 'Gallery', 'Stats']

const ProfileRightContent: React.FC<{ profile: LensProfile | null }> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [favoriteNfts, setFavoriteNfts] = useState<FavoriteMetadata[]>([])
  const [reviews, setReviews] = useState<LensPost[]>([])
  const [assets, setAssets] = useState<Asset[]>([])
  const [assetsTotal, setAssetsTotal] = useState<number>(0)
  const [assetsCursor, setAssetsCursor] = useState<string>('')
  const [assetsLoadingMore, setAssetsLoadingMore] = useState<boolean>(false)

  useEffect(() => {
    import('uni-media')
  }, [])

  const getFavoriteNfts = useCallback(async () => {
    if (!profile) {
      return
    }
    const nfts = await nftport.getFavorites(profile.ownedBy)
    const metadata = nfts.map((nft) => nft.metadata).filter((nft) => nft)
    setFavoriteNfts(metadata)
    setIsLoading(false)
  }, [profile])

  const getReviews = useCallback(async () => {
    if (!profile) {
      return
    }
    const posts = await getPostsByProfileId(profile.id)
    const lensPosts = (posts?.items || []) as LensPost[]
    setReviews(lensPosts)
    setIsLoading(false)
  }, [profile])

  const getGallery = useCallback(
    async (cursor: string = '') => {
      if (!profile) {
        return
      }
      if (cursor === '') {
        setAssets([])
      }
      const result = await rss3.getAssets(profile.ownedBy, cursor, 12)
      const assets = result?.assets || []
      setAssets((prev) => [...prev, ...assets])
      setAssetsTotal((prev) => (prev > 0 ? prev : result?.total || 0))
      setAssetsCursor(result?.cursor || '')
      setIsLoading(false)
      setAssetsLoadingMore(false)
    },
    [profile],
  )

  useEffect(() => {
    setIsLoading(true)
    if (activeTab === 'Favorties') {
      getFavoriteNfts()
    }
    if (activeTab === 'Reviews') {
      getReviews()
    }
    if (activeTab === 'Gallery') {
      getGallery()
    }
  }, [activeTab, getFavoriteNfts, getReviews, getGallery])

  const handleMoreAssets = async () => {
    setAssetsLoadingMore(true)
    await getGallery(assetsCursor)
  }

  if (!profile) {
    return <></>
  }
  return (
    <>
      <div className="h-full w-[800px] py-8">
        {/* Tab Options */}
        <div className="flex pl-10 gap-10">
          {tabs.map((tab, index) => (
            <div key={index} onClick={() => setActiveTab(tab)}>
              <ProfileTab text={tab} active={tab === activeTab} />
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="w-full flex justify-center items-center mt-52">
            <Loading size="xl" color="secondary" />
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

        {activeTab === 'Gallery' && !isLoading && (
          <>
            <div className="h-full w-full grid grid-cols-4 gap-10 p-10 ">
              {assets.map((asset, index) => (
                <a target="_blank" href={asset.related_urls[0]} key={index} rel="noreferrer">
                  <div
                    className="h-[100%] w-[100%] rounded-md border border-white cursor-pointer hover:opacity-50"
                    onClick={() => {}}
                  >
                    <uni-media
                      alt={asset.title}
                      title={asset.description}
                      src={asset.image}
                      width="100%"
                      height="100%"
                      style={{ borderRadius: '4px', objectFit: 'cover' }}
                    />
                  </div>
                </a>
              ))}
            </div>
            {assets.length < assetsTotal && (
              <div className=" w-full flex justify-center items-center">
                {assetsLoadingMore ? (
                  <Loading size="xl" color="secondary" />
                ) : (
                  <Button className="gradientBG" onPress={handleMoreAssets}>
                    Load More
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default ProfileRightContent
