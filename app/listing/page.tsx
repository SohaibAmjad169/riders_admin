'use client'
import CreateBikeModal from '@/components/layout/CreateBikeModal'
import UpdateBikeModal from '@/components/layout/UpdateModal'
import { GetAllBikess } from '@/functions/GetAllBikes'
import { removeBike } from '@/functions/RemoveBike'
import { updateBike } from '@/functions/UpdateBike'
import { Bike } from '@/utils/BikeInterface'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import SDK from '@/config'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

const Listing = () => {
  const [AllBikes, SetBikes] = useState<Bike[]>([])
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

  useEffect(() => {
    const GetAllBikes = async () => {
      const Data = await GetAllBikess()
      SetBikes(Data)
    }
    GetAllBikes()
  }, [])

  const DeleteBike = async (ID: string) => {
    const Data = await removeBike(ID)
    if (Data) {
      toast.success('Bike has been deleted')
      SetBikes((prev) => prev.filter((bike) => bike._id !== ID))
    }
  }

  const handleOpenUpdateModal = (bike: Bike) => {
    setSelectedBike(bike)
    setUpdateModalOpen(true)
  }

  const handleUpdateBike = async (updatedBike: Bike) => {
    if (!selectedBike) return

    const Data = await updateBike(selectedBike._id, updatedBike)
    if (Data) {
      toast.success('Bike has been updated')
      SetBikes((prev) =>
        prev.map((bike) =>
          bike._id === selectedBike._id ? { ...bike, ...updatedBike } : bike
        )
      )
      setUpdateModalOpen(false)
      setSelectedBike(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-end  me-5">
        <CreateBikeModal />
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4  space-y-6">
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse table-auto bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {AllBikes.map((bike) => (
                <tr
                  key={bike._id}
                  className="hover:bg-gray-100 border-b transition duration-200"
                >
                  <td className="px-4 py-3">
                    <img
                      src={`${SDK.IMAGES_URL}/${bike.image}`}
                      alt={bike.name}
                      className="w-16 h-16 object-contain mx-auto rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-medium">
                    {bike.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">Rs {bike.price}</td>
                  <td className="px-4 py-3 text-gray-600">{bike.rating} ⭐</td>
                  <td className="px-4 py-3 mt-4 text-center flex justify-center space-x-4">
                    <button
                      onClick={() => handleOpenUpdateModal(bike)}
                      className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition"
                    >
                      <AiOutlineEdit size={20} />
                    </button>
                    <button
                      onClick={() => DeleteBike(bike._id)}
                      className="px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <UpdateBikeModal
          isOpen={isUpdateModalOpen}
          bike={selectedBike}
          onClose={() => setUpdateModalOpen(false)}
          onUpdate={handleUpdateBike}
        />
      </div>
    </div>
  )
}

export default Listing
