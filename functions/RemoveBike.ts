import axios from 'axios'

export const removeBike = async (ID: string, Email: string) => {
  try {
    const response = await axios.delete('/api/bikes/remove', {
      data: { ID, Email },
    })
    console.log('Bike removed successfully:', response.data)
    return response.data
  } catch (error: any) {
    console.error(
      'Error removing bike:',
      error.response?.data?.error || error.message
    )
    throw error.response?.data?.error || error.message
  }
}
