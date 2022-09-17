import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import { GET_PROFILE_QUERY } from '@/common/lens/profile'
import type { LensProfile } from '@/types/lens'
import { useEffect, useState } from 'react'
import { handleError } from '@/common/notification'
import { Image } from '@nextui-org/react'
import { parseIpfs } from '@/common/ipfs'

const ProfileContainer: React.FC = () => {
  const router = useRouter()
  const [profile, setProfile] = useState<LensProfile | null>(null)
  const [avatar, setAvatar] = useState<string>('/avatar.svg')
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

  return (
    <>
      <div className="">
        {/* <Image
        width={'100%'}
        height={'400px'}
        src={parseIpfs(cover)}
        alt="Cover Image"
        objectFit='cover'
      /> */}
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123 123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
        123
        <br />
      </div>
    </>
  )
}

export default ProfileContainer
