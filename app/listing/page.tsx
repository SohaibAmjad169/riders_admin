'use client'
import CreateBikeModal from '@/components/layout/CreateBikeModal'
import UpdateBikeModal from '@/components/layout/UpdateModal'
import { GetAllBikess } from '@/functions/GetAllBikes'
import { removeBike } from '@/functions/RemoveBike'
import { updateBike } from '@/functions/UpdateBike'
import { Bike } from '@/utils/BikeInterface'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

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
      {/* Create Bike Button */}
      <div className="flex justify-end">
        <CreateBikeModal />
      </div>

      {/* Bikes Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AllBikes.map((bike) => (
          <div
            key={bike._id}
            className="border rounded-lg p-4 shadow-lg bg-white space-y-4"
          >
            {/* Bike Image */}
            <div className="flex justify-center">
              <img
                src={bike.imageUrl}
                alt={bike.name}
                className="w-full h-40 object-contain rounded-lg"
              />
            </div>

            {/* Bike Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-600">
                {bike.name}
              </h3>
              <p className="text-gray-700">
                <strong>Price:</strong> Rs {bike.price}
              </p>
              <p className="text-gray-700">
                <strong>Rating:</strong> {bike.rating} ⭐
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => handleOpenUpdateModal(bike)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
              <button
                onClick={() => DeleteBike(bike._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Bike Modal */}
      <UpdateBikeModal
        isOpen={isUpdateModalOpen}
        bike={selectedBike}
        onClose={() => setUpdateModalOpen(false)}
        onUpdate={handleUpdateBike}
      />
    </div>
  )
}

export default Listing
