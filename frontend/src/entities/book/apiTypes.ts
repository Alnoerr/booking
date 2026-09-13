export interface Book {
  id: number
  title: string
  author: string
  genre: string
  year: number
  description: string
  available: boolean
  location_id: number
  owner_id: number
}

export interface Location {
  id: number
  name: string
  address: string
  working_hours: string
}

export interface Reservation {
  id: number
  book_id: number
  user_id: number
  status: string
  reserved_at: string
  due_date: string
  returned_at: string | null
  book: Book
}

export interface Statistics {
  books: number
  reservations: number
  active_reservations: number
}

