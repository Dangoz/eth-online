import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { Modal } from '@nextui-org/react'

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)

  return (
    <>
      <div
        className="h-[44px] w-[300px] bg-bgGrey rounded-[12px] flex items-center justify-between  
       cursor-text z-50"
        placeholder="Search"
      >
        <MagnifyingGlassIcon className="h-[22px] w-[22px] text-textGrey ml-[16px]" />
        <input
          className="h-[40px] bg-transparent border-none w-[160px]"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => {
            setSearchText('')
            setIsInputFocused(false)
          }}
        />

        {searchText ? (
          <div
            className="bg-transparent border-none cursor-pointer hover:bg-slate-300/10 rounded-[20px] p-2 text-slate-300"
            onClick={() => setSearchText('')}
          >
            Clear
          </div>
        ) : (
          <div className="w-[50px]" />
        )}

        {isInputFocused ? (
          <XCircleIcon
            className="h-[20px] w-[20px] text-textGrey text-slate-400 cursor-pointer mr-[10px]"
            onClick={() => setSearchText('')}
          />
        ) : (
          <div className=" h-[20px] w-[20px] mr-[10px]" />
        )}
      </div>

      {/* modal background */}
      {isInputFocused && (
        <div className="z-40 fixed top-0 left-0 w-full h-full bg-black/50 transition-opacity duration-300"></div>
      )}
    </>
  )
}

export default SearchBar
