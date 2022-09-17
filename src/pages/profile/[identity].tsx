import type { NextPage } from 'next'
import ProfileContainer from '@/components/profile/ProfileContainer'

const Profile: NextPage<{ count: number }> = ({ count }) => {
  return (
    <>
      <ProfileContainer />
    </>
  )
}

export default Profile
