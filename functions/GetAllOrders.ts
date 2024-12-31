import axios from 'axios'
export const GetAllOrders = async () => {
  try {
    const Response = await axios.get(
      'https://rider-rev-baclend.vercel.app/Api/Order/GetAllOrders'
    )
    // Step 4: Return the list of bikes
    if (Response.status === 200) {
      console.log('ALL BIKES', Response.data)
      return Response.data
    }
  } catch (error: any) {
    // Step 5: Error handling
    console.error('Error fetching bikes:', error.message)
    // toast.error('ERROR ON FETCHING ', error.message)
  }
}
