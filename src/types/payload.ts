export interface OrderPayload {
  customerId: string
  products: string[]       
  totalPrice: number
  status?: 'pending_confirmation' | 'pending_payment' | 'completed' | 'in_delivery' | 'return_product' | 'canceled' | 'before_deadline'
  duration: number         
  deliveryDate?: string     
}