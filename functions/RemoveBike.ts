import axios from 'axios'
import toast from 'react-hot-toast'

export const removeBike = async (ID: string) => {
  try {
    const response = await axios.delete(
      `https://rider-rev-baclend.vercel.app/Api/Bike/RemoveBike?ID=${ID}`
    )
    console.log('Bike removed successfully:', response.data)
    toast.success('Bike Has Been Deleted')
    window.location.reload()
    return response.data
  } catch (error: any) {
    console.error(
      'Error removing bike:',
      error.response?.data?.error || error.message
    )
    throw error.response?.data?.error || error.message
  }
}
