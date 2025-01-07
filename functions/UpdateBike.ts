import axios from 'axios'
import SDK from '@/config'

export const updateBike = async (ID: string, bikeData: any) => {
  try {
    const response = await axios.put(
      `${SDK.BASE_URL}/Bike/UpdateABike`,
      { ID, bikeData }
    )
    console.log('Bike updated successfully:', response.data)
    return response.data
  } catch (error: any) {
    console.error(
      'Error updating bike:',
      error.response?.data?.error || error.message
    )
    throw error.response?.data?.error || error.message
  }
}
