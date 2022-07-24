# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  - HTTP verb: `GET`
  - Endpoint: `/api/products/`
- Show
  - HTTP verb: `GET`
  - Endpoint: `/api/products/:id` - [id is the product's id]
- Create [token required]
  - HTTP verb: `POST`
  - Endpoint: `/api/products/`
- Edit [token required]
  - HTTP verb: `PATCH`
  - Endpoint: `/api/products/:id` - [id is the product's id]
- Delete [token required]
  - HTTP verb: `DELETE`
  - Endpoint: `/api/products/:id` - [id is the product's id]
- [OPTIONAL] Products by category (args: product category)
  - HTTP verb: `GET`
  - Endpoint: `/api/products/?category=YOUR-CATEGORY` -[replace YOUR-CATEGORY variable with category you want]

#### Users

- Login
  - HTTP verb: `POST`
  - Endpoint: `/api/users/login`
- Index [token required]
  - HTTP verb: `GET`
  - Endpoint: `/api/users/`
- Show [token required]
  - HTTP verb: `GET`
  - Endpoint: `/api/users/:id` - [id is the user's id]
- Create N[token required]
  - HTTP verb: `POST`
  - Endpoint: `/api/users`
- Edit [token required]
  - HTTP verb: `PATCH`
  - Endpoint: `/api/users/:id` - [id is the user's id]
- Delete [token required]
  - HTTP verb: `DELETE`
  - Endpoint: `/api/users/:id` - [id is the user's id]

#### Orders

- Index [token required]
  - HTTP verb: `GET`
  - Endpoint: `/api/orders/`
- Show [token required]
  - HTTP verb: `GET`
  - Endpoint: `/api/orders/:id` - [id is the order's id]
- Create [token required]
  - HTTP verb: `POST`
  - Endpoint: `/api/orders/`
- Edit [token required]
  - HTTP verb: `PATCH`
  - Endpoint: `/api/orders/:id` - [id is the order's id]
- Delete [token required]
  - HTTP verb: `DELETE`
  - Endpoint: `/api/orders/:id` - [id is the order's id]
- Current Order by user (args: user id)[token required]
  - HTTP verb: `GET`
  - Endpoint: `/api/orders/users/:id` - [id is the users's id]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
  - HTTP verb: `GET`
  - Endpoint: `/api/orders/users/:id?status=complete` - [id is the users's id]

#### Order_product

- Index [token required]
  - HTTP verb: `GET`
  - Endpoint: `/api/orderProduct/`
- Show [token required]
  - HTTP verb: `GET`
  - Endpoint: `/api/orderProduct/:id` - [id is the orderProduct's id]
- Create [token required]
  - HTTP verb: `POST`
  - Endpoint: `/api/orderProduct/`
- Edit [token required]
  - HTTP verb: `PATCH`
  - Endpoint: `/api/orderProduct/:id` - [id is the orderProduct's id]
- Delete [token required]
  - HTTP verb: `DELETE`
  - Endpoint: `/api/orderProduct/:id` - [id is the orderProduct's id]

## Data Shapes

#### Product

```typescript
type Product = {
  id: string
  name: string
  price: number
  category?: string
  description: string
}
```

#### User

```typescript
type User = {
  id: string
  email: string
  user_name: string
  first_name: string
  last_name: string
  password: string
}
```

#### Orders

```typescript
type Order = {
  id: string
  user_id: string
  status: string
}
```

#### OrderProduct

```typescript
type OrderProduct = {
  id: string
  product_id: string
  quantity: number
  order_id: string
}
```

## DataBase Schema

### Products Schema

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50),
  price NUMERIC(5,2) NOT NULL,
  category VARCHAR(100),
  description TEXT NOT NULL
);
```

### Users Schema

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  user_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### Orders Schema

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(255) NOT NULL
);
```

### Order_Product Schema

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_product(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL
);
```
