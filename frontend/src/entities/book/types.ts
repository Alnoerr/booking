export interface Book {
  id: number
  title: string
  author: string
  genre: string
  year: number
  available: boolean
  locationId: number
  color: string
  description: string
}

export interface Location {
  id: number
  name: string
  address: string
  hours: string
}

