import tmdb from '@/common/tmdb'
import { useState, useCallback, useEffect } from 'react'
import SearchShowCard from './SearchShowCard'
import SearchProfileCard from './SearchProfileCard'
import SearchLoading from './SearchLoading'
import SearchEmpty from './SearchEmpty'
import useDebounce from '@/hooks/useDebounce'
import { TmdbShow } from '@/types/tmdb'
import { useQuery } from 'urql'
import { SEARCH_PROFILE_QUERY } from '@/common/lens/profile'
import { handleError } from '@/common/notification'
import { LensSearchProfile } from '@/types/lens'

interface SearchProps {
  searchText: string
}

const SearchResult: React.FC<SearchProps> = ({ searchText }) => {
  const [query, setQuery] = useState(searchText)

  const [shows, setShows] = useState<TmdbShow[]>([])
  const [isShowsLoading, setIsShowsLoading] = useState<boolean>(query.trim().length !== 0)

  const [profiles, setProfiles] = useState<LensSearchProfile[]>([])
  const [profilesResult] = useQuery({
    query: SEARCH_PROFILE_QUERY,
    variables: {
      query,
      limit: 5,
    },
  })

  // debounce query by 500ms
  const debouncedQuery = useDebounce(async (searchText: string) => {
    setQuery(searchText)
  }, 500)

  useEffect(() => {
    debouncedQuery(searchText)
  }, [searchText, debouncedQuery])

  // get shows based on query
  const getShows = useCallback(async () => {
    if (query.trim().length === 0) {
      return setShows([])
    }

    setIsShowsLoading(true)
    const results = await tmdb.search(query, 1)
    const shows = results.filter((show) => show.media_type === 'movie' || show.media_type === 'tv')
    setShows(shows.slice(0, 4))
    setIsShowsLoading(false)
  }, [query])

  useEffect(() => {
    getShows()
  }, [query, getShows])

  // set profiles on search
  useEffect(() => {
    if (profilesResult.error) {
      return console.error(profilesResult.error.message)
    }
    if (profilesResult.fetching) {
      return
    }
    if (profilesResult.data) {
      setProfiles(profilesResult.data.search.items)
    }
  }, [profilesResult])

  return (
    <>
      <div
        className={`rounded-[12px] absolute w-[500px] min-h-[100px] bg-bgBlue z-50 overflow-y-auto 
       flex flex-col p-4 max-h-[70vh] top-[70px] no-scrollbar`}
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

        {/* profiles */}
        <div className="text-titlePurple font-bold mt-4">PROFILES</div>
        {profilesResult.fetching ? (
          <SearchLoading />
        ) : profiles.length === 0 ? (
          <SearchEmpty />
        ) : (
          profiles.map((profile, index) => <SearchProfileCard key={index} profile={profile} />)
        )}
      </div>
    </>
  )
}

export default SearchResult
