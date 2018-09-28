// @flow

export type Product = {
  _id: string,
  name: string,
  sku: string,
  description: string,
  category: string,
  price: number,
  saleprice: number,
  img: string,
  inventory: number,
  onDisplay: boolean
}

export type Category = {
  _id: string,
  name: string,
}
