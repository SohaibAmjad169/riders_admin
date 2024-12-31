interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface Bike {
  bikeId: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  _id: string
}

interface Service {
  serviceId: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  _id: string
}

interface Order {
  ShippingAddress: Address
  BillingAddress: Address
  _id: string
  Name: string
  Email: string
  userId: string
  Cart: string
  Progress: string
  PaymentMethod: string
  PaymentStatus: string
  TotalAmount: number
  Notes: string
  bikes: Bike[]
  services: Service[]
  createdAt: string
  updatedAt: string
  __v: number
}

export default Order
