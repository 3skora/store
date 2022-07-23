-- create order_product table 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_product(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL
); 