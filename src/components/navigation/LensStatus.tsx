import LensIcon from '../icons/LensIcon'
import LensIconSmall from '../icons/LensIconSmall'
import { Tooltip } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import LensSignInModal from './LensSignInModal'
import { refreshAuth, verify as verifyLens, LENS_AUTH } from '@/common/lens/authentication'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import useUser from '@/hooks/useUser'

const LensStatus: React.FC = () => {
  const [lensModalOpen, setLensModalOpen] = useState(false)
  const {
    userStore: { LensAuthenticated },
    setUserStore,
  } = useUser()

  const verify = useCallback(async () => {
    try {
      // retrieve token from local storage
      const accessLocal = localStorage.getItem(LENS_AUTH.ACCESS)
      const refreshLocal = localStorage.getItem(LENS_AUTH.REFRESH)
      if (!accessLocal || !refreshLocal) {
        return
      }

      // check for expiration
      const decoded = jwt_decode(accessLocal)
      const isExpired = (decoded as { exp: number }).exp < dayjs().unix()
      if (isExpired) {
        const { accessToken, refreshToken } = await refreshAuth(refreshLocal)
        localStorage.setItem(LENS_AUTH.ACCESS, accessToken)
        localStorage.setItem(LENS_AUTH.REFRESH, refreshToken)
        setUserStore({ LensAuthenticated: true })
        return
      }

      // verify unexpired access token
      const isValid = await verifyLens(accessLocal)
      if (isValid) {
        setUserStore({ LensAuthenticated: true })
      }
    } catch (err) {
      console.error((err as Error).message)
    }
  }, [setUserStore])

  useEffect(() => {
    if (LensAuthenticated) {
      return
    }
    verify()
  }, [verify, LensAuthenticated])

  return (
    <>
      <div className="flex">
        {!LensAuthenticated && (
          <Tooltip placement="bottom" content={<div className="text-[12px]">signin with Lens</div>}>
            <div
              onClick={() => setLensModalOpen(true)}
              className={`w-[50px] h-[50px] bg-bgGrey flex justify-center items-center rounded-full 
       fill-slate-300 cursor-pointer`}
            >
              <LensIconSmall />
            </div>
          </Tooltip>
        )}

        {
          LensAuthenticated && (
            // <Tooltip
            //   placement="bottom"
            //   content={<div></div>}
            // >
            <div className="rounded-full w-[52px] h-[52px] flex justify-center items-center">
              <div
                className={`w-[50px] h-[50px] bg-bgBlue p-2 rounded-full fill-lensLime 
        shadow shadow-white cursor-pointer`}
              >
                <LensIcon />
              </div>
            </div>
          )
          // </Tooltip>
        }
      </div>

      {!LensAuthenticated && (
        <LensSignInModal open={lensModalOpen} onClose={() => setLensModalOpen(false)} verify={verify} />
      )}
    </>
  )
}

export default LensStatus
