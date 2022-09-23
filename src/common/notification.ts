import { toast } from 'react-toastify'
import { LockClosedIcon } from '@heroicons/react/24/solid'

export const handleError = (error: Error | any) => {
  const message = error?.data?.message || error?.message
  toast(message, {
    type: 'error',
    position: 'bottom-left',
    autoClose: 2500,
    icon: '🚨',
    theme: 'dark',
  })
  console.error(message)
}

export const notifyErrorMessage = (message: string) => {
  toast(message, {
    type: 'error',
    position: 'bottom-left',
    autoClose: 2500,
    icon: '🚨',
    theme: 'dark',
  })
  console.log(message)
}

export const handleSuccess = (message: string) => {
  toast(message, {
    position: 'top-right',
    autoClose: 5000,
    icon: '🪐',
    theme: 'dark',
    draggable: false,
    closeOnClick: false,
  })
}
