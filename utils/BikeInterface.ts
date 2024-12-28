interface Question {
  question: string
  answer: string
}

export interface Bike {
  name: string
  price: number
  imageUrl: string
  rating: number
  engine: string
  petrolCapacity: number
  starting: string
  transmission: string
  groundClearance: number
  displacement: number
  compressionRatio: string
  boreAndStroke: string
  tyreFront: string
  tyreRear: string
  seatHeight: number
  length: number
  width: number
  height: number
  weight: number
  questions: Question[]
}
