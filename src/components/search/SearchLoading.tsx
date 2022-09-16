import { Loading } from '@nextui-org/react'

const SearchLoading: React.FC = () => {
  return (
    <>
      <div className="my-5 w-full flex justify-center">
        <Loading />
      </div>
      <div className="w-[100%] h-[1px] bg-dividerGrey" />
    </>
  )
}

export default SearchLoading
