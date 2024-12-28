import axios from 'axios'

export const createBike = async (bikeData: any) => {
  try {
    const response = await axios.post('/api/bikes/create', { bikeData })
    console.log('Bike created successfully:', response.data)
    return response.data
  } catch (error: any) {
    console.error(
      'Error creating bike:',
      error.response?.data?.error || error.message
    )
    throw error.response?.data?.error || error.message
  }
}
