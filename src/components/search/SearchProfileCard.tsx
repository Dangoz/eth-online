const SearchProfileCard: React.FC<any> = ({ profile }) => {
  return (
    <div>
      <div className="w-full flex items-center justify-start p-1 gap-2 cursor-pointer hover:bg-bgGrey">
        Handle: {profile.handle}
      </div>
      <div className="w-[100%] h-[1px] bg-dividerGrey" />
    </div>
  )
}

export default SearchProfileCard
