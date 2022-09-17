import Router from 'next/router'
import { useQuery } from 'urql'

const ProfileContainer: React.FC = () => {
  return (
    <>
      <div>
        Profile Id: {Router.query.identity}
        <br />
      </div>
    </>
  )
}

export default ProfileContainer
