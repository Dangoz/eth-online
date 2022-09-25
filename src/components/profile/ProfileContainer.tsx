import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import { GET_PROFILE_QUERY } from '@/common/lens/profile'
import type { LensProfile } from '@/types/lens'
import { useEffect, useState } from 'react'
import { handleError } from '@/common/notification'
import { Image } from '@nextui-org/react'
import { parseIpfs } from '@/common/utils'
import ProfileLeftInfo from './ProfileLeftInfo'
import ProfileRightContent from './ProfileRightContent'

const ProfileContainer: React.FC = () => {
  const router = useRouter()
  const [profile, setProfile] = useState<LensProfile | null>(null)
  const [avatar, setAvatar] = useState<string>('/logo.svg')
  const [cover, setCover] = useState<string>('/cover.svg')

  const [profileResult] = useQuery({
    query: GET_PROFILE_QUERY,
    variables: {
      profileId: router.query.identity,
    },
  })

  useEffect(() => {
    if (profileResult.error) {
      return handleError(profileResult.error)
    }
    if (profileResult.fetching) {
      return
    }
    setProfile(profileResult.data.profile)
  }, [profileResult])

  useEffect(() => {
    if (!profile) {
      return
    }

    const avatar = !profile.picture
      ? '/logo.svg'
      : (profile.picture.__typename === 'MediaSet' && profile.picture.original.url) ||
        (profile.picture.__typename === 'NftImage' && profile.picture.uri)
    setAvatar(avatar)

    const cover = !profile.coverPicture
      ? '/cover.svg'
      : (profile.coverPicture.__typename === 'MediaSet' && profile.coverPicture.original.url) ||
        (profile.coverPicture.__typename === 'NftImage' && profile.coverPicture.uri)
    setCover(cover)
  }, [profile])

  return (
    <>
      {/* <div className=""> */}
      <Image
        width={'100%'}
        height={'310px'}
        src={parseIpfs(cover)}
        alt="Cover Image"
        objectFit="cover"
        className=" object-cover"
      />

      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-row w-[1100px]">
          <ProfileLeftInfo profile={profile} avatar={avatar} />
          <ProfileRightContent profile={profile} />
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default ProfileContainer
