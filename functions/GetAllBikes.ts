import axios from 'axios'
import toast from 'react-hot-toast'

export const GetAllBikess = async () => {
  try {
    const Response = await axios.get(
      'https://rider-rev-baclend.vercel.app/Api/Bike/GetAllBikes'
    )

    // Step 4: Return the list of bikes
    if (Response.status === 200) {
      console.log('ALL BIKES', Response.data.bikes)
      return Response.data.bikes
    }
  } catch (error: any) {
    // Step 5: Error handling
    console.error('Error fetching bikes:', error.message)
    // toast.error('ERROR ON FETCHING ', error.message)
  }
}
