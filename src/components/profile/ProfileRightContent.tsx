import { LensProfile } from '@/types/lens'
import ProfileTab from './ProfileTab'
import { useState, useEffect } from 'react'

const tabs = ['Favorties', 'Reviews', 'Gallery', 'Stats']

const ProfileRightContent: React.FC<{ profile: LensProfile | null }> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0])

  if (!profile) {
    return <></>
  }
  return (
    <>
      <div className="h-[50px] w-[800px] pt-8">
        {/* Tab Options */}
        <div className="flex pl-10 gap-10">
          {tabs.map((tab, index) => (
            <div key={index} onClick={() => setActiveTab(tab)}>
              <ProfileTab text={tab} active={tab === activeTab} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProfileRightContent
