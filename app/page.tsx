'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import Image from 'next/image'

// Types for bids
interface Bid {
  _id: string
  bike: {
    name: string
    price: number
    imageUrl: string
  }
  userName: string
  userEmail: string
  bidAmount: number
  bidStatus: string
}

export default function Bids() {
  const [bids, setBids] = useState<Bid[]>([]) // State to hold fetched bids
  const [loading, setLoading] = useState<boolean>(false) // Loading state
  const [updating, setUpdating] = useState<boolean>(false) // Updating state
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null) // Selected bid for modal
  const [newStatus, setNewStatus] = useState<string>('') // New status

  // Fetch all bids
  const fetchAllBids = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://rider-rev-baclend.vercel.app/Api/Bid/GetAllBids`
      )
      setBids(response.data.bids) // Assuming response.data contains the list of bids
    } catch (error) {
      console.error('Error fetching bids:', error)
    } finally {
      setLoading(false)
    }
  }

  // Update bid status
  const updateBidStatus = async () => {
    if (!selectedBid) return
    setUpdating(true)
    try {
      await axios.put(
        `https://rider-rev-baclend.vercel.app/Api/Bid/UpdateBid/${selectedBid._id}`,
        { bidStatus: newStatus }
      )
      // Update the bid in local state after successful update
      setBids((prevBids) =>
        prevBids.map((bid) =>
          bid._id === selectedBid._id ? { ...bid, bidStatus: newStatus } : bid
        )
      )
      setSelectedBid(null) // Close modal
    } catch (error) {
      console.error('Error updating bid:', error)
    } finally {
      setUpdating(false)
    }
  }

  // Fetch bids on component mount
  useEffect(() => {
    fetchAllBids()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Bids Display */}
      <div className="border p-4 rounded-lg bg-gray-50 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">All Bids</h2>
        {loading ? (
          <div className="flex justify-center">
            <BeatLoader color="#0000ff" size={15} />
          </div>
        ) : bids.length > 0 ? (
          bids.map((bid) => (
            <div
              key={bid._id}
              className="p-4 border rounded-md bg-white shadow-sm space-y-4"
            >
              {/* Bike Details */}
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600">
                    {bid.bike.name}
                  </h3>
                  <p className="text-gray-700">
                    <strong>Price:</strong> ${bid.bike.price}
                  </p>
                </div>
              </div>

              {/* User and Bid Details */}
              <div className="space-y-2">
                <p>
                  <strong>User:</strong> {bid.userName} ({bid.userEmail})
                </p>
                <p>
                  <strong>Bid Amount:</strong> ${bid.bidAmount}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={`${
                      bid.bidStatus === 'Accepted'
                        ? 'text-green-600'
                        : bid.bidStatus === 'Rejected'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    } font-semibold`}
                  >
                    {bid.bidStatus}
                  </span>
                </p>

                {/* Update Button */}
                <button
                  onClick={() => {
                    setSelectedBid(bid)
                    setNewStatus(bid.bidStatus) // Pre-fill current status in modal
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No bids available.</p>
        )}
      </div>

      {/* Modal */}
      {selectedBid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
            <h3 className="text-xl font-semibold text-center">Update Bid</h3>
            <p>
              <strong>Bike:</strong> {selectedBid.bike.name}
            </p>
            <p>
              <strong>User:</strong> {selectedBid.userName} (
              {selectedBid.userEmail})
            </p>
            <p>
              <strong>Current Status:</strong>{' '}
              <span
                className={`${
                  selectedBid.bidStatus === 'Accepted'
                    ? 'text-green-600'
                    : selectedBid.bidStatus === 'Rejected'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                } font-semibold`}
              >
                {selectedBid.bidStatus}
              </span>
            </p>

            {/* Status Input */}
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedBid(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={updateBidStatus}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                disabled={updating}
              >
                {updating ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
