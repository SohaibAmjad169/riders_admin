'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import Image from 'next/image'

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
  const [bids, setBids] = useState<Bid[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null)
  const [newStatus, setNewStatus] = useState<string>('')

  const fetchAllBids = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://rider-rev-baclend.vercel.app/Api/Bid/GetAllBids`
      )
      setBids(response.data.bids)
    } catch (error) {
      console.error('Error fetching bids:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBidStatus = async () => {
    if (!selectedBid) return
    setUpdating(true)
    try {
      await axios.post(
        `https://rider-rev-baclend.vercel.app/Api/Bid/UpdateBid?id=${selectedBid._id}`,
        { bidStatus: newStatus }
      )
      setBids((prevBids) =>
        prevBids.map((bid) =>
          bid._id === selectedBid._id ? { ...bid, bidStatus: newStatus } : bid
        )
      )
      setSelectedBid(null)
    } catch (error) {
      console.error('Error updating bid:', error)
    } finally {
      setUpdating(false)
    }
  }

  useEffect(() => {
    fetchAllBids()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
      <div className="flex items-center justify-center space-x-4">
        <h1 className="text-4xl md:text-6xl font-medium text-yellow-500 text-center">
          All Bids
        </h1>
      </div>

      <div className="border p-4 rounded-lg bg-gray-50 space-y-4 shadow-lg">
        <h2 className="text-lg md:text-xl font-semibold text-center md:text-left">
          All Bids
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <BeatLoader color="#0000ff" size={15} />
          </div>
        ) : bids.length > 0 ? (
          bids.map((bid) => (
            <div
              key={bid._id}
              className="p-4 border rounded-md bg-white shadow-sm space-y-4 flex flex-col sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <div className="flex flex-col items-start space-y-2 sm:w-2/3">
                <h3 className="text-lg font-semibold text-blue-600">
                  {bid.bike.name}
                </h3>
                <p className="text-gray-700">
                  <strong>Price:</strong> ${bid.bike.price}
                </p>
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
              </div>

              <div className="flex items-center justify-end sm:justify-center sm:w-1/3">
                <button
                  onClick={() => {
                    setSelectedBid(bid)
                    setNewStatus(bid.bidStatus)
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full sm:w-auto"
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center">No bids available.</p>
        )}
      </div>

      {selectedBid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-center">
              Update Bid
            </h3>
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

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

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
