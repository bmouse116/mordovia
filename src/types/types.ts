export interface Terminal {
  id: number
  title: string
  floor: number
  floorName: string
  points: Point
  node: number
  area: number
}
//точка в терминале
export interface Point {
  id: number
  x: number
  y: number
  floor: number
}

//арены

export interface Area {
  id: number
  points: PointArea[]
  floor: number
  floorName: string
  cabinet?: number
}

export interface PointArea {
  id: number
  x: number
  y: number
  floor: number
}

//точки мест
export interface Tenants {
  id: number
  title: string
  images: Image[]
  floor: Floor
  phone: string
  trainers: any[]
  description: string
  icon: string
  node: number
  area: number
}

export interface Image {
  image: string
}

export interface Floor {
  id: number
  name: string
  mapImage: string
}


//точки пути
export interface Node {
  id: number
  point: PointNode
  types: Type[]
  nodes: number[]
}

export interface PointNode {
  id: number
  x: number
  y: number
  floor: number
  floorName: string
}

export interface Type {
  id: number
  type: string
}