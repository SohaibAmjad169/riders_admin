'use client'

import { createBike } from '@/functions/CreateBike'
import React, { useState } from 'react'

const CreateBikeModal = () => {
  const [showModal, setShowModal] = useState(false)

  // State for form fields
  const [bikeData, setBikeData] = useState({
    name: '',
    price: 0, // Set default to 0 as a number
    imageUrl: '',
    rating: 0, // Set default to 0 as a number
    engine: '',
    petrolCapacity: 0,
    starting: '',
    transmission: '',
    groundClearance: 0,
    displacement: 0,
    compressionRatio: '',
    boreAndStroke: '',
    tyreFront: '',
    tyreRear: '',
    seatHeight: 0,
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    questions: [{ question: '', answer: '' }],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setBikeData((prev) => ({
      ...prev,
      [name]: [
        'price',
        'rating',
        'petrolCapacity',
        'groundClearance',
        'displacement',
        'seatHeight',
        'length',
        'width',
        'height',
        'weight',
      ].includes(name)
        ? Number(value) // Convert numeric fields to numbers
        : value,
    }))
  }

  const handleAddQuestion = () => {
    setBikeData((prev) => ({
      ...prev,
      questions: [...prev.questions, { question: '', answer: '' }],
    }))
  }

  const handleQuestionChange = (
    index: number,
    field: 'question' | 'answer',
    value: string
  ) => {
    const updatedQuestions = bikeData.questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    )
    setBikeData((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  const handleSubmit = async () => {
    if (bikeData.price <= 0) {
      alert('Price must be a positive number.')
      return
    }
    if (bikeData.rating < 0 || bikeData.rating > 5) {
      alert('Rating must be between 0 and 5.')
      return
    }

    try {
      console.log('Bike Data Submitted:', bikeData)
      const Data = await createBike(bikeData)
      setShowModal(false)
    } catch (error) {
      console.error('Error:', error)
      alert(error)
    }
  }

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Create Bike
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create Bike</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={bikeData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={bikeData.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none"
                  min="1"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={bikeData.imageUrl}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={bikeData.rating}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none"
                  min="0"
                  max="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Engine</label>
                <input
                  type="text"
                  name="engine"
                  value={bikeData.engine}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </div>
              {/* Add similar input fields for other properties */}

              {/* Questions Section */}
              <div>
                <h3 className="text-lg font-medium">Questions</h3>
                {bikeData.questions.map((q, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Question"
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(index, 'question', e.target.value)
                      }
                      className="w-full p-2 border rounded focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Answer"
                      value={q.answer}
                      onChange={(e) =>
                        handleQuestionChange(index, 'answer', e.target.value)
                      }
                      className="w-full p-2 border rounded focus:outline-none"
                    />
                  </div>
                ))}
                <button
                  onClick={handleAddQuestion}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition"
                >
                  Add Question
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateBikeModal
