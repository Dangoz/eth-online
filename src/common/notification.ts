import { toast } from 'react-toastify'

export const handleError = (error: Error) => {
  toast(error.message, {
    type: 'error',
    position: 'bottom-left',
    autoClose: 2500,
    icon: '🚨',
  })
  console.error(error.message)
}
