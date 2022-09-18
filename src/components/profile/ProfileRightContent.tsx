import { LensProfile } from '@/types/lens'

const tabs = ['Favorties', 'Reviewes', 'Collections']

const ProfileRightContent: React.FC<{ profile: LensProfile | null }> = ({ profile }) => {
  if (!profile) {
    return <></>
  }
  return (
    <>
      <div className="h-[50px] w-[800px] bg-red-100">
        {/* Tab Options */}
        <div className="flex"></div>
      </div>
    </>
  )
}

export default ProfileRightContent
