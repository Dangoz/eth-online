const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

import { useRef } from 'react'

const useDebounce = (func: Function, delay: number) => {
  const debounced = useRef(debounce(func, delay))
  return debounced.current
}

export default useDebounce
