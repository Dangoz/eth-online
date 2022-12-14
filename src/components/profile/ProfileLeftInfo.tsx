import { LensProfile } from '@/types/lens'
import { parseIpfs, parseAddress } from '@/common/utils'
import GradientText from '@/components/ui/GradientText'
import { useEnsName } from 'wagmi'
import Divider from '@/components/ui/Divider'
import { useState, useEffect } from 'react'
import { Button, Loading } from '@nextui-org/react'
import { useLaunch } from '@relaycc/receiver'
import { IS_FOLLOWED_BY_ME } from '@/common/lens/follow'
import { useQuery } from 'urql'
import { notifyErrorMessage } from '@/common/notification'
import useAddress from '@/hooks/useAddress'
import useUser from '@/hooks/useUser'
import { handleInfo } from '@/common/notification'
import { ChatBubbleOvalLeftEllipsisIcon, UserPlusIcon } from '@heroicons/react/24/outline'

interface ProfileLeftInfoProps {
  profile: LensProfile | null
  avatar: string
}

const ProfileLeftInfo: React.FC<ProfileLeftInfoProps> = ({ profile, avatar }) => {
  const { isConnected } = useAddress()
  const {
    userStore: { lensAuthenticated },
  } = useUser()
  const [isFollowed, setIsFollowed] = useState<boolean | null>(null)
  const launch = useLaunch()
  const { data: ensName } = useEnsName({
    address: profile?.ownedBy,
    chainId: 1,
  })

  const [isFollowedResult, FetchIsfolloweResult] = useQuery({
    query: IS_FOLLOWED_BY_ME,
    variables: {
      profileId: profile?.id,
    },
    pause: !profile,
  })

  useEffect(() => {
    if (isFollowedResult.error) {
      return notifyErrorMessage(isFollowedResult.error.message)
    }
    if (isFollowedResult.fetching) {
      return
    }
    if (isFollowedResult.data) {
      setIsFollowed(isFollowedResult.data.profile.isFollowedByMe ?? null)
    }
  }, [isFollowedResult])

  const handleFollowProfile = async () => {
    if (!isConnected) {
      return handleInfo('Please Connect your Wallet to review')
    }
    if (!lensAuthenticated) {
      return handleInfo('Please Sign in with Lens to review')
    }
    // alert('ruaa')
  }

  const handleMessageProfile = async () => {
    launch(profile?.ownedBy)
  }

  if (!profile) {
    return <></>
  }

  return (
    <>
      <div className="flex flex-col w-[300px] justify-center top-[-105px] relative gap-5 pl-2 h-full">
        {/* Gradient Avatar */}
        <div className="h-[210px] w-[210px] flex justify-center items-center rounded-[10px] bg-gradient-to-r from-gradientOne via-gradientTwo to-gradientThree">
          <img
            alt="Avatar"
            src={parseIpfs(avatar)}
            className={`h-[200px] w-[200px] rounded-[5px] object-cover bg-bgBlue hover:h-[210px] hover:w-[210px] hover:rounded-[10px] transition-all duration-300`}
          />
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <div className="font-bold text-2xl">{profile.name || profile.handle}</div>
          <div className="flex gap-1">
            <GradientText text={`@${profile.handle}`} />
            <span className=" text-slate-300">{`(${profile.id})`}</span>
          </div>
          <div className="flex">{ensName && <GradientText text={`@${ensName}`} />}</div>
          <div className="flex">
            <GradientText text={parseAddress(profile.ownedBy)} />
          </div>
        </div>

        {/* bio  */}
        <div className="overflow-y-auto break-words max-h-36 no-scrollbar">{profile.bio}</div>

        {/* follow stats */}
        <div className="flex w-full gap-10">
          <div className="text-center">
            <div className="text-[30px] font-bold">
              {Intl.NumberFormat('en', { notation: 'compact' }).format(profile.stats.totalFollowing)}
            </div>
            Following
          </div>
          <div className="text-center">
            <div className="text-[30px] font-bold">
              {Intl.NumberFormat('en', { notation: 'compact' }).format(profile.stats.totalFollowers)}
            </div>
            Followers
          </div>
        </div>
        <Divider />

        <div className="flex gap-3">
          <Button
            color={'gradient'}
            size="xs"
            className={`gradientBG h-[30px] w-[75px] text-[11px] text-black z-10`}
            onPress={handleFollowProfile}
            disabled={isFollowed === null}
          >
            <UserPlusIcon className="w-[15px] h-[15px] mr-1" />
            {isFollowed === null ? <Loading type="points" /> : isFollowed ? <div>Unfollow</div> : <div>Follow</div>}
          </Button>

          <Button
            color={'gradient'}
            size="xs"
            className={`gradientBG h-[30px] w-[75px] text-[11px] text-black z-10`}
            onPress={handleMessageProfile}
          >
            <ChatBubbleOvalLeftEllipsisIcon className="w-[15px] h-[15px] mr-1" />
            Message
          </Button>
        </div>
      </div>
    </>
  )
}

export default ProfileLeftInfo
