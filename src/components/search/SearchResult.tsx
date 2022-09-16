import Router from 'next/router'
import tmdb from '@/common/tmdb'
import CustomStyle from '@/styles/custom.module.css'
import { Loading, Spacer } from '@nextui-org/react'
import { useState, useCallback, useEffect } from 'react'
import SearchShowCard from './SearchShowCard'
import SearchLoading from './SearchLoading'
import SearchEmpty from './SearchEmpty'
import useDebounce from '@/hooks/useDebounce'
import { TmdbShow } from '@/types/tmdb'

interface SearchProps {
  searchText: string
}

const SearchResult: React.FC<SearchProps> = ({ searchText }) => {
  const [shows, setShows] = useState<TmdbShow[]>([])
  const [isShowsLoading, setIsShowsLoading] = useState<boolean>(searchText.trim().length !== 0)

  const getShows = useDebounce(async (query: string) => {
    if (query.trim().length === 0) {
      return setShows([])
    }

    setIsShowsLoading(true)
    const results = await tmdb.search(query, 1)
    const shows = results.filter((show) => show.media_type === 'movie' || show.media_type === 'tv')
    setShows(shows.slice(0, 5))
    setIsShowsLoading(false)
  }, 500)

  useEffect(() => {
    getShows(searchText)
  }, [searchText, getShows])

  return (
    <>
      <div
        className={`rounded-[12px] absolute w-[350px] min-h-[100px] bg-bgBlue z-50 overflow-y-auto 
      top-[70px] right-[230px] flex flex-col p-4 max-h-[70vh]`}
      >
        {/* shows */}
        <div className="text-titlePurple font-bold">SHOWS</div>

        {isShowsLoading ? (
          <SearchLoading />
        ) : shows.length === 0 ? (
          <SearchEmpty />
        ) : (
          shows.map((show, index) => <SearchShowCard key={index} show={show} />)
        )}
      </div>
    </>
  )
}

export default SearchResult
