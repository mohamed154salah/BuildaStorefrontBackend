# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `/products [get]` ✔️
- Show `/product [get] take "id" ` ✔️
- Create `/product [post] take "name,price" [token required] `✔️ 
- [OPTIONAL] Top 5 most popular products `/getProduct_P [get] `  ✔️


#### Users
- Index `/users [get] [token required]` ✔️
- Show `/user [get] take "id" [token required]` ✔️
- Create `/users [post] take "username,password_digest" [token required] ` ✔️

#### Orders
- Current Order by user (args: user id)`/products_in_orders_active/:id [get] [token required]` ✔️ 
- [OPTIONAL] Completed Orders by user (args: user id)`/products_in_orders_closed/:id [get] [token required]` ✔️

## Data Shapes
#### Product
-  id ✔️
- name ✔️
- price ✔️
`CREATE TABLE products (id SERIAL PRIMARY KEY,name VARCHAR(64) NOT NULL,price integer NOT NULL);`
#### User
- id ✔️
- username ✔️
- password ✔️
`CREATE TABLE users ( id SERIAL PRIMARY KEY,username VARCHAR(100),password_digest VARCHAR);`
#### Orders
- id ✔️
- id of each product in the order ✔️ 
- quantity of each product in the order ✔️
- user_id ✔️
- status of order (active or complete) ✔️
`CREATE TABLE orders (id SERIAL PRIMARY KEY,status VARCHAR(15), user_id bigint REFERENCES users(id));`

`CREATE TABLE order_products (id SERIAL PRIMARY KEY,quantity integer,order_id bigint REFERENCES orders(id),product_id bigint REFERENCES products(id));`
