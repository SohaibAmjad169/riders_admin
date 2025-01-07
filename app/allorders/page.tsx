'use client'
import SDK from '@/config'
import { GetAllOrders } from '@/functions/GetAllOrders'
import Order from '@/utils/OrderInterface'
import React, { useEffect, useState } from 'react'

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data: Order[] = await GetAllOrders()
        setOrders(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching orders', error)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Loader component
  const Loader = () => (
    <div className="flex justify-center items-center my-16">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid"></div>
    </div>
  )

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-5xl font-semibold text-center mb-14 text-gray-900 tracking-wide">
        Order Details
      </h1>

      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-8 mb-8 shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300 border border-gray-200"
          >
            {/* User Info */}
            <div className="mb-8 border-b border-gray-300 pb-5">
              <h2 className="text-2xl font-medium text-indigo-700 mb-2">
                {order.Name}
              </h2>
              <p className="text-lg text-gray-600 mb-1">{order.Email}</p>
              <p className="text-xl font-semibold text-gray-800 mt-3">
                Total Bill:{' '}
                <span className="text-green-700">PKR {order.TotalAmount}</span>
              </p>
            </div>

            {/* Bikes List */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Bikes:
              </h3>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {order.bikes.map((bike) => (
                  <li
                    key={bike._id}
                    className="flex items-center space-x-5 p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={`${SDK.IMAGES_URL}/${bike.imageUrl}`}
                      alt={bike.name}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                    />
                    <div>
                      <p className="font-medium text-lg text-gray-900">
                        {bike.name}
                      </p>
                      <p className="text-gray-600">Price: PKR {bike.price}</p>
                      <p className="text-gray-600">Quantity: {bike.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services List */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Services:
              </h3>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {order.services.map((service) => (
                  <li
                    key={service._id}
                    className="flex items-center space-x-5 p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                    />
                    <div>
                      <p className="font-medium text-lg text-gray-900">
                        {service.name}
                      </p>
                      <p className="text-gray-600">Price: PKR {service.price}</p>
                      <p className="text-gray-600">
                        Quantity: {service.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-12 text-gray-600">
          <p className="text-lg">No orders found.</p>
        </div>
      )}
    </div>
  )
}

export default Orders
