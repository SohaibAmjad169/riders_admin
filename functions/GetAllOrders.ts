import axios from 'axios'
import SDK from '@/config'
export const GetAllOrders = async () => {
  try {
    const Response = await axios.get(
      `${SDK.BASE_URL}/Order/GetAllOrders`
    )
    if (Response.status === 200) {
      return Response.data
    }
  } catch (error: any) {
    console.error('Error fetching bikes:', error.message)
  }
}
