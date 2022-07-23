// - id of each product in the order
// - quantity of each product in the order

type Order = {
  id: string
  user_id: string
  status: string
  order_product_ids: string[]
}

export default Order

// ? Order table
// id | user_id | status | order_product_id
// O1 | U1     | active  | OP1
// O2 | U2     | active  | OP2


