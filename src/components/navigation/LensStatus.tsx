import LensIcon from '../icons/LensIcon'
import LensIconSmall from '../icons/LensIconSmall'
import { Tooltip } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import LensSignInModal from './LensSignInModal'
import { refreshAuth, verify as verifyLens, LENS_AUTH } from '@/common/lens/authentication'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import useUser from '@/hooks/useUser'
import { getLensProfileByAddress } from '@/common/lens/profile'
import useAddress from '@/hooks/useAddress'

const LensStatus: React.FC = () => {
  const [lensModalOpen, setLensModalOpen] = useState(false)
  const { address } = useAddress()
  const {
    userStore: { lensAuthenticated, lensProfile },
    setUserStore,
  } = useUser()

  const verify = useCallback(async () => {
    try {
      // retrieve token from local storage
      const accessLocal = localStorage.getItem(LENS_AUTH.ACCESS)
      const refreshLocal = localStorage.getItem(LENS_AUTH.REFRESH)
      if (!accessLocal || !refreshLocal || !address) {
        return
      }

      // check for expiration
      const decoded = jwt_decode(accessLocal)
      const isExpired = (decoded as { exp: number }).exp < dayjs().unix()
      if (isExpired) {
        const { accessToken, refreshToken } = await refreshAuth(refreshLocal)
        localStorage.setItem(LENS_AUTH.ACCESS, accessToken)
        localStorage.setItem(LENS_AUTH.REFRESH, refreshToken)
        const lensProfile = await getLensProfileByAddress(address)
        setUserStore({ lensAuthenticated: true, lensProfile })
        return
      }

      // verify unexpired access token
      const isValid = await verifyLens(accessLocal)
      if (isValid) {
        const lensProfile = await getLensProfileByAddress(address)
        setUserStore({ lensAuthenticated: true, lensProfile })
      }
    } catch (err) {
      console.error((err as Error).message)
    }
  }, [setUserStore, address])

  useEffect(() => {
    if (lensAuthenticated) {
      return
    }
    verify()
  }, [verify, lensAuthenticated])

  return (
    <>
      <div className="flex">
        {!lensAuthenticated && (
          <Tooltip placement="bottom" content={<div className="text-[12px]">signin with Lens</div>}>
            <div
              onClick={() => setLensModalOpen(true)}
              className={`w-[40px] h-[40px] bg-bgGrey flex justify-center items-center rounded-full 
       fill-slate-300 cursor-pointer`}
            >
              <LensIconSmall />
            </div>
          </Tooltip>
        )}

        {lensAuthenticated && (
          <Tooltip
            placement="bottom"
            content={<div className="gradientText">{lensProfile ? `@${lensProfile.handle}` : 'Lens'}</div>}
          >
            <div className="rounded-full w-[41px] h-[41px] flex justify-center items-center gradientBG">
              <div
                className={`w-[39px] h-[39px] bg-bgBlue p-2 rounded-full fill-lensLime 
        shadow shadow-white`}
              >
                <LensIcon />
              </div>
            </div>
          </Tooltip>
        )}
      </div>

      {!lensAuthenticated && (
        <LensSignInModal open={lensModalOpen} onClose={() => setLensModalOpen(false)} verify={verify} />
      )}
    </>
  )
}

export default LensStatus
