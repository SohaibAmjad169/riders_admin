'use client'
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
        setLoading(false) // Set loading to false once data is fetched
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
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Order Details
      </h1>

      {loading ? (
        <Loader /> // Show loader when data is being fetched
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-100 p-6 mb-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* User Info */}
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-blue-700">
                {order.Name}
              </h2>
              <p className="text-lg text-gray-700">{order.Email}</p>
              <p className="text-xl font-semibold text-gray-800 mt-2">
                Total Bill:{' '}
                <span className="text-green-600">PKR {order.TotalAmount}</span>
              </p>
            </div>

            {/* Bikes List */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Bikes:</h3>
              <ul>
                {order.bikes.map((bike) => (
                  <li
                    key={bike._id}
                    className="flex items-center space-x-4 mb-3"
                  >
                    <img
                      src={bike.imageUrl}
                      alt={bike.name}
                      className="w-20 h-20 object-contain rounded-lg shadow-md"
                    />
                    <div>
                      <p className="font-semibold text-lg text-gray-900">
                        {bike.name}
                      </p>
                      <p className="text-gray-600">Price: ${bike.price}</p>
                      <p className="text-gray-600">Quantity: {bike.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services List */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Services:</h3>
              <ul>
                {order.services.map((service) => (
                  <li
                    key={service._id}
                    className="flex items-center space-x-4 mb-3"
                  >
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-20 h-20 object-contain rounded-lg shadow-md"
                    />
                    <div>
                      <p className="font-semibold text-lg text-gray-900">
                        {service.name}
                      </p>
                      <p className="text-gray-600">Price: ${service.price}</p>
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
      )}
    </div>
  )
}

export default Orders
