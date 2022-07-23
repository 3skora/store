-- create products table 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50),
  price NUMERIC(5,2) NOT NULL,
  category VARCHAR(100),
  description TEXT NOT NULL
); 