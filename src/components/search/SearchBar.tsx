import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import SearchResult from './SearchResult'
import { XMarkIcon } from '@heroicons/react/24/outline'

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)

  const handleClose = () => {
    setSearchText('')
    setIsInputFocused(false)
  }

  return (
    <>
      <div
        className={`h-[44px] rounded-[12px] flex items-center justify-between w-[35vw]  
        cursor-text z-50 ${isInputFocused ? 'bg-white' : 'bg-bgGrey'} min-w-[300px] max-w-[430px]`}
        placeholder="Search"
      >
        <div className="flex justify-center items-center">
          <MagnifyingGlassIcon
            className={`h-[22px] w-[22px] text-textGrey ml-[10px] ${isInputFocused && 'text-black'}`}
          />
        </div>

        <input
          className={`h-[40px] bg-transparent border-none w-[100%] px-2 ${isInputFocused && 'text-black'}`}
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
        />

        {searchText && isInputFocused && (
          <div
            className="bg-transparent border-none cursor-pointer hover:bg-slate-300/50 rounded-[6px] p-2 text-slate-500"
            onClick={() => setSearchText('')}
          >
            Clear
          </div>
        )}

        {isInputFocused && (
          <div className="flex justify-center items-center">
            <XMarkIcon
              className="h-[20px] w-[20px] text-textGrey text-slate-400 cursor-pointer mr-[10px]"
              onClick={handleClose}
            />
          </div>
        )}
      </div>

      {/* modal background */}
      {isInputFocused && (
        <>
          <div
            id="input-modal-background"
            className="z-40 fixed top-0 left-0 w-full h-full bg-black/50 transition-opacity duration-300"
            onClick={() => setIsInputFocused(false)}
          />
          {/* <SearchResult searchText={searchText}/> */}
          {searchText.trim().length > 0 && <SearchResult searchText={searchText} />}
        </>
      )}
    </>
  )
}

export default SearchBar
