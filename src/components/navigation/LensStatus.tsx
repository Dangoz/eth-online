import LensIcon from '../icons/LensIcon'
import LensIconSmall from '../icons/LensIconSmall'
import { Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import LensSignInModal from './LensSignInModal'

const LensStatus: React.FC = () => {
  const [lensModalOpen, setLensModalOpen] = useState(false)

  return (
    <>
      <div className="flex">
        <Tooltip placement="bottom" content={<div className="text-[12px]">signin with Lens</div>}>
          <div
            onClick={() => setLensModalOpen(true)}
            className={`w-[50px] h-[50px] bg-bgGrey flex justify-center items-center rounded-full 
       fill-slate-300 cursor-pointer`}
          >
            <LensIconSmall />
          </div>
        </Tooltip>

        {/* <Tooltip
        placement="bottom"
        content={<div>ruaa</div>}
      >
        <div className='rounded-full w-[52px] h-[52px] flex justify-center items-center'>
          <div className={`w-[50px] h-[50px] bg-bgBlue p-2 rounded-full fill-lensLime 
       shadow shadow-white cursor-pointer`}>
            <LensIcon />
          </div>
        </div>
      </Tooltip> */}
      </div>

      <LensSignInModal open={lensModalOpen} onClose={() => setLensModalOpen(false)} />
    </>
  )
}

export default LensStatus
