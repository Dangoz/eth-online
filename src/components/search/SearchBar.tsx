import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { Input } from '@nextui-org/react'

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <>
      <div
        className="h-[44px] w-[280px] bg-bgGrey rounded-[12px] flex items-center justify-start 
       gap-2 cursor-text"
        placeholder="Search"
      >
        <MagnifyingGlassIcon className="h-[24px] w-[24px] text-textGrey ml-[16px]" />
        <input
          className="h-[40px] w-[200px] bg-transparent border-none"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && (
          <XCircleIcon
            className="h-[20px] w-[20px] text-textGrey mr-[16px] text-slate-400 cursor-pointer"
            onClick={() => setSearchText('')}
          />
        )}
      </div>
    </>
  )
}

export default SearchBar
