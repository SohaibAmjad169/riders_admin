import React, { useState } from 'react'

interface UpdateBikeModalProps {
  isOpen: boolean
  bike: { name: string; price: number; imageUrl: string } | null
  onClose: () => void
}

const UpdateBikeModal: React.FC<UpdateBikeModalProps> = ({
  isOpen,
  bike,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: bike?.name || '',
    price: bike?.price || 0,
    imageUrl: bike?.imageUrl || '',
  })

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: name === 'price' ? +value : value })
  }

  const handleSubmit = () => {
    onClose()
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
