import axios from 'axios'
import toast from 'react-hot-toast'
import SDK from '@/config'

export const GetAllBikess = async () => {
  try {
    const Response = await axios.get(
      `${SDK.BASE_URL}/Bike/GetAllBikes`
    )

    if (Response.status === 200) {
      console.log('ALL BIKES', Response.data.bikes)
      return Response.data.bikes
    }
  } catch (error: any) {
    console.error('Error fetching bikes:', error.message)
  }
}
