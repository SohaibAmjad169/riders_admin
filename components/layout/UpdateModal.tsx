import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface UpdateBikeModalProps {
  isOpen: boolean
  bike: { name: string; price: number; imageUrl: string; rating: number } | null
  onClose: () => void
  onUpdate: any
}

const UpdateBikeModal: React.FC<UpdateBikeModalProps> = ({
  isOpen,
  bike,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    imageUrl: '',
    rating: 0, // Include rating
  })

  useEffect(() => {
    if (bike) {
      setFormData({
        name: bike.name,
        price: bike.price,
        imageUrl: bike.imageUrl,
        rating: bike.rating, // Prefill rating
      })
    }
  }, [bike])

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'rating' ? +value : value,
    })
  }

  const handleSubmit = () => {
    if (formData.rating < 1 || formData.rating > 5) {
      toast.error('Rating must be between 1 and 5')
      return
    }
    onUpdate(formData)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full space-y-4">
        <h2 className="text-xl font-semibold">Update Bike</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Bike Name"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Bike Price"
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Image URL"
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Rating (1-5)"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateBikeModal
