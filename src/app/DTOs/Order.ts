import { Product } from "./Product"

export class Order {
    orderId!:number
    status!:boolean
    quantity!: number
    totalPrice!: number
    customerName!:string
    shippingAddress!: string
    paymentMethod!: string
    productId!: number
    product!:Product
}
