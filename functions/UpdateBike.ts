import axios from 'axios';

export const updateBike = async (ID: string, bikeData: any) => {
  try {
    const response = await axios.put('/api/bikes/update', { ID, bikeData });
    console.log('Bike updated successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error updating bike:', error.response?.data?.error || error.message);
    throw error.response?.data?.error || error.message;
  }
};