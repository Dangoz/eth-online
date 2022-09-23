import { LensProfile } from '@/types/lens'
import { parseIpfs, parseAddress } from '@/common/utils'
import GradientText from '@/components/ui/GradientText'
import { useEnsName } from 'wagmi'
import Divider from '@/components/ui/Divider'
import { useState } from 'react'

interface ProfileLeftInfoProps {
  profile: LensProfile | null
  avatar: string
}

const ProfileLeftInfo: React.FC<ProfileLeftInfoProps> = ({ profile, avatar }) => {
  const { data: ensName } = useEnsName({
    address: profile?.ownedBy,
    chainId: 1,
  })

  if (!profile) {
    return <></>
  }

  return (
    <>
      <div className="flex flex-col w-[300px] justify-center top-[-105px] relative gap-5">
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
        <div className="overflow-y-auto break-words max-h-36">{profile.bio}</div>

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
      </div>
    </>
  )
}

export default ProfileLeftInfo
