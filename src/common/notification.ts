import { toast } from 'react-toastify'

export const handleError = (error: Error | any) => {
  const message = error?.data?.message || error?.message
  toast(message, {
    type: 'error',
    position: 'bottom-left',
    autoClose: 2500,
    icon: '🚨',
  })
  console.error(message)
}

export const notifyErrorMessage = (message: string) => {
  toast(message, {
    type: 'error',
    position: 'bottom-left',
    autoClose: 2500,
    icon: '🚨',
  })
  console.log(message)
}

export const handleSuccess = (message: string) => {
  toast(message, {
    type: 'success',
    position: 'top-right',
    autoClose: 2500,
    icon: '🪐',
  })
}
