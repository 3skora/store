type OrderProduct = {
  id: string
  product_id: string
  quantity: number
  order_id: string
}

export default OrderProduct

//  Order_Product table
// id  | product_id  | quantity | order_id
// OP1 |     P1     |    5     |   O1
// OP2 |     P9    |    2     |   O1
// OP3 |     P6   |    20    |   O2

//  Order table
// id | user_id | status
// O1 | U1     | active
// O2 | U2    | active
