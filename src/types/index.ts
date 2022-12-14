export interface DocType {
  id: string
  status: string
  sum: number
  qty: number
  volume: number
  name: string
  delivery_date: string
  currency: string
  total?: string
}

export interface TypeActiveItem {
  idDocs: string[]
  checkedDocs: DocType[]
}
