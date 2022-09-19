interface ProfileTabProps {
  text: string
  active: boolean
}
const ProfileTab: React.FC<ProfileTabProps> = ({ text, active }) => {
  return (
    <>
      <div
        className={`flex cursor-pointer justify-center items-center font-bold text-[16px] w-[100px] h-[40px] rounded-[8px] 
         text-white gradientBG
        ${active ? ' primaryShadow' : ' hover:bg-bgGrey'}`}
      >
        {active ? (
          text
        ) : (
          <div className={`w-[96px] h-[38px] rounded-[6px] bg-bgBlue flex justify-center items-center hover:bg-bgGrey`}>
            {text}
          </div>
        )}
      </div>
    </>
  )
}

export default ProfileTab
