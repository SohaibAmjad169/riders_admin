import SDK from '@/config'
import axios from 'axios'
import toast from 'react-hot-toast'

export const removeBike = async (ID: string) => {
  try {
    const response = await axios.delete(
      `${SDK.BASE_URL}/Bike/RemoveBike?ID=${ID}`
    )

    return response.data
  } catch (error: any) {
    console.error(
      'Error removing bike:',
      error.response?.data?.error || error.message
    )
    throw error.response?.data?.error || error.message
  }
}
