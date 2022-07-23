// - id of each product in the order
// - quantity of each product in the order

type Order = {
    id: string
    user_id: string
    status: string
    order_product_id: string[]
  }
  
  export default Order