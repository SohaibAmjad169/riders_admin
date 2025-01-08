'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import SDK from './../config'

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
      const response = await axios.get(`${SDK.BASE_URL}/Bid/GetAllBids`)
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
      await axios.put(
        `${SDK.BASE_URL}/Bid/UpdateBid?id=${selectedBid._id}`,
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-600">
          All Bids
        </h1>
        <p className="mt-2 text-gray-600">
          Manage and track all user bids in one place.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
          Bid Listings
        </h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <BeatLoader color="#2563EB" size={15} />
          </div>
        ) : bids.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bids && bids.map((bid) => (
              <div
                key={bid._id}
                className="p-6 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition duration-300"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {bid.bike.name}
                    </h3>
                    <p className="text-gray-500 text-sm">PKR {bid.bidAmount}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>User:</strong> {bid.userName} (
                      <span className="text-gray-500">{bid.userEmail}</span>)
                    </p>
                    <p className="text-gray-700">
                      <strong>Bid Amount:</strong> PKR :{bid.bidAmount}
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
                        } font-medium`}
                      >
                        {bid.bidStatus}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBid(bid)
                      setNewStatus(bid.bidStatus)
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">
            No bids available at the moment.
          </p>
        )}
      </div>

      {/* Update Bid Modal */}
      {selectedBid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Update Bid Status
            </h3>
            <p className="text-gray-700 mb-2">
              <strong>User:</strong> {selectedBid.userName} (
              {selectedBid.userEmail})
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Current Status:</strong>{' '}
              <span
                className={`${
                  selectedBid.bidStatus === 'Accepted'
                    ? 'text-green-600'
                    : selectedBid.bidStatus === 'Rejected'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                } font-medium`}
              >
                {selectedBid.bidStatus}
              </span>
            </p>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedBid(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={updateBidStatus}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
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
