import { LensSearchProfile } from '@/types/lens'
import { Image } from '@nextui-org/react'
import { parseIpfs } from '@/common/ipfs'
import GradientText from '../ui/GradientText'
import GradientWrapper from '../ui/GradientWrapper'
import { useEnsName } from 'wagmi'

const SearchProfileCard: React.FC<{ profile: LensSearchProfile }> = ({ profile }) => {
  const thumbnailURL = !profile.picture
    ? '/logo.svg'
    : (profile.picture.__typename === 'MediaSet' && profile.picture.original.url) ||
      (profile.picture.__typename === 'NftImage' && profile.picture.uri)

  const { data: ensName } = useEnsName({
    address: profile.ownedBy,
    chainId: 1,
  })

  return (
    <div>
      <div className="w-full flex items-center justify-start p-2 gap-5 cursor-pointer hover:bg-bgGrey">
        <div className="flex justify-center items-center">
          <Image
            width={40}
            height={40}
            src={parseIpfs(thumbnailURL)}
            alt="Default Image"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="font-bold">{profile.name || ensName || profile.handle}</div>
          {/* <div className="gap-2 flex">
            {ensName && <GradientText text={`@${ensName}`} />}
            <GradientText text={`@${profile.handle}`} />
          </div> */}

          {ensName && <GradientText text={`@${ensName}`} />}
          {!ensName && <GradientText text={`@${profile.handle}`} />}
        </div>
      </div>
      <div className="w-[100%] h-[1px] bg-dividerGrey" />
    </div>
  )
}

export default SearchProfileCard
