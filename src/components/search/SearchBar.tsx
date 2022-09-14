import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { Button } from '@nextui-org/react'

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)

  return (
    <>
      <div
        className="h-[44px] w-[300px] bg-bgGrey rounded-[12px] flex items-center justify-between  
       cursor-text"
        placeholder="Search"
      >
        <MagnifyingGlassIcon className="h-[22px] w-[22px] text-textGrey ml-[16px]" />
        <input
          className="h-[40px] w-[160px] bg-transparent border-none"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
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
    </>
  )
}

export default SearchBar
