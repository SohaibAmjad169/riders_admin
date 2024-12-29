import axios from 'axios'
import toast from 'react-hot-toast'

export const createBike = async (bikeData: any) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/Api/Bike/CreateBike',
      { bikeData }
    )
    console.log('Bike created successfully:', response.data)
    toast.success('A New Bike Is Created')
    window.location.reload()
    return response.data
  } catch (error: any) {
    console.error(
      'Error creating bike:',
      error.response?.data?.error || error.message
    )
    throw error.response?.data?.error || error.message
  }
}
