// - id of each product in the order
// - quantity of each product in the order

type Order = {
  id: string
  user_id: string
  status: string
}

export default Order

//  Order table
// id | user_id | status
// O1 | U1     | active
// O2 | U2     | active
