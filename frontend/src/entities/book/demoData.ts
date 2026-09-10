import type { Book, Location } from './types'

export const books: Book[] = [
  { id: 1, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', genre: 'Классика', year: 1967, available: true, locationId: 1, color: '#395144', description: 'Роман о любви, свободе и таинственных событиях в Москве.' },
  { id: 2, title: 'Норвежский лес', author: 'Харуки Мураками', genre: 'Роман', year: 1987, available: true, locationId: 2, color: '#a8443a', description: 'История взросления, памяти и любви в Токио.' },
  { id: 3, title: 'Цветы для Элджернона', author: 'Дэниел Киз', genre: 'Фантастика', year: 1966, available: false, locationId: 1, color: '#647d86', description: 'История научного эксперимента, изменившего жизнь Чарли Гордона.' },
  { id: 4, title: 'Три товарища', author: 'Эрих Мария Ремарк', genre: 'Классика', year: 1936, available: true, locationId: 3, color: '#526d82', description: 'Роман о дружбе и любви в Германии между двумя войнами.' },
  { id: 5, title: 'Sapiens', author: 'Юваль Ной Харари', genre: 'Нон-фикшн', year: 2011, available: true, locationId: 2, color: '#8d6e63', description: 'Краткая история человечества.' },
  { id: 6, title: 'Маленькая жизнь', author: 'Ханья Янагихара', genre: 'Роман', year: 2015, available: false, locationId: 3, color: '#756a64', description: 'История дружбы четырёх выпускников колледжа.' },
]

export const locations: Location[] = [
  { id: 1, name: 'Библиотека на Чистых', address: 'Чистопрудный бульвар, 23', hours: '10:00–21:00' },
  { id: 2, name: 'Кофейня «Полка»', address: 'улица Покровка, 17', hours: '08:00–22:00' },
  { id: 3, name: 'Культурный центр «Среда»', address: 'Мясницкая улица, 13', hours: '11:00–20:00' },
]
