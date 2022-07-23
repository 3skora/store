-- create orders table 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(255) NOT NULL
  --order_product_ids uuid [] REFERENCES order_product(id) ON DELETE SET NULL
); 