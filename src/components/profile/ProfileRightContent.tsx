import { LensProfile } from '@/types/lens'
import ProfileTab from './ProfileTab'
import { useState, useEffect, useCallback } from 'react'
import { Loading, Spacer } from '@nextui-org/react'
import nftport from '@/common/nftPort'
import type { FavoriteMetadata } from '@/types/tmdb'
import useAddress from '@/hooks/useAddress'
import Router from 'next/router'

const tabs = ['Favorties', 'Reviews', 'Gallery', 'Stats']

const ProfileRightContent: React.FC<{ profile: LensProfile | null }> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0])
  const [favoriteNfts, setFavoriteNfts] = useState<FavoriteMetadata[]>([])

  const getFavoriteNfts = useCallback(async () => {
    if (!profile) {
      return
    }
    const nfts = await nftport.getFavorites(profile.ownedBy)
    const metadata = nfts.map((nft) => nft.metadata)
    setFavoriteNfts(metadata)
  }, [profile])

  useEffect(() => {
    if (activeTab === 'Favorties') {
      getFavoriteNfts()
    }
  }, [activeTab, getFavoriteNfts])

  if (!profile) {
    return <></>
  }
  return (
    <>
      <div className="h-[100%] w-[800px] pt-8">
        {/* Tab Options */}
        <div className="flex pl-10 gap-10">
          {tabs.map((tab, index) => (
            <div key={index} onClick={() => setActiveTab(tab)}>
              <ProfileTab text={tab} active={tab === activeTab} />
            </div>
          ))}
        </div>

        {activeTab === 'Favorties' && (
          <div className="h-[300px] w-full grid grid-cols-4 gap-10 p-10">
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

        {activeTab === 'Reviews' && <div></div>}
      </div>
    </>
  )
}

export default ProfileRightContent
