interface ProfileTabProps {
  text: string
  active: boolean
}
const ProfileTab: React.FC<ProfileTabProps> = ({ text, active }) => {
  return (
    <>
      <div
        className={`flex cursor-pointer justify-center items-center font-bold text-[16px] w-[100px] h-[40px] rounded-[8px] 
        ${
          active
            ? 'bg-gradient-to-r from-gradientOne via-gradientTwo to-gradientThree text-white'
            : 'text-titlePurple hover:bg-bgGrey'
        }`}
      >
        {text}
      </div>
    </>
  )
}

export default ProfileTab
