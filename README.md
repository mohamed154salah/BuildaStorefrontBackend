# Storefront Backend Project

## Getting Started
 To get started, clone this repo and run `npm install` in your terminal at the project root.

## Used Technologies
my application use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
## Setup db instructions.
We shall create the dev and test database.

1. connect to postgres server `psql -U postgres`
2. In PSQL to create a user `CREATE USER full_stack_user WITH PASSWORD 'password123';`
3. In PSQL to create the dev and test database
`CREATE DATABASE full_stack_dev;`
`CREATE DATABASE full_stack_test;`
4. Connect to the databases and grant all privileges
4.A. Grant for dev database
`\c full_stack_dev`
`GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;`
4.B. Grant for test database
`\c full_stack_test`
`GRANT ALL PRIVILEGES ON DATABASE full_stack_test TO full_stack_user;`
## How to use
you should create `.env` file
#### Add some variables 
you should change the following variables to your values
- PORT=`8000`
- POSTGRES_HOST =`localhost`
- POSTGRES_DB = `full_stack_dev`
- POSTGRES_USER = `full_stack_user`
- POSTGRES_PASSWORD = `password123`
- POSTGRES_TEST_DB=`full_stack_test`
- NODE_ENV=`dev`
- BCRYPT_PASSWORD=`your-secret-password`
- SALT_ROUNDS=`10`
- TOKEN_SECRET=`alohomora123!`

#### how to run MIGRATION
to create tables in command line `db-migrate up` 
to delete tables in command line `db-migrate reset`
#### How to run the project 
- run in dev mode `npm run dev`
- run in production mode `npm run start`
- run in test mode `npm run test`

## Example in Product 
####Token and Authentication
Tokens are passed in http header as
`Authorization   Bearer <token>`
#### Product API
1. to create product you should have token and go to api and send `name` and `price`  `http://localhost:8000/product`  
2. to get all products `http://localhost:8000/products`

3. to get top 5 popular products `http://localhost:8000/getProduct_P`

4. to get one product by `id` send values in req.body `http://localhost:8000/products`

5. to delete product by `id` send values in req.body `http://localhost:8000/product`

#### user API
1. to create user you should have token and go to api and send `name` and `password_digest`  `http://localhost:8000/users`  
2. to get all users you should have token `http://localhost:8000/users`

3. to get t token you should have send username and password_digest`http://localhost:8000/users/authenticate`

4. to get one user by `id` send values in req.body and you should have token `http://localhost:8000/user`

5. to delete user by `id` send values in req.body `http://localhost:8000/users`

#### Order API

1.  to create order you should go to api and send `status` and `user_id`  `http://localhost:8000/order`  
2. to get all orders you should have token `http://localhost:8000/orders`

3. to get t token you should have send username and password_digest`http://localhost:8000/users/authenticate`

4. to get one order by `id` send values in req.body `http://localhost:8000/order`

5. to delete order by `id` send values in req.body `http://localhost:8000/order`

6. to add product in order by `productId`,`quantity` and go to `http://localhost:8000/orders/:id/products`

7. to get data in order by go to `http://localhost:8000/or`

8. Current Order by user (args: user id)[token required] go to `http://localhost:8000/products_in_orders_active/:id`

9. Completed Orders by user (args: user id)[token required]  go to `http://localhost:8000/products_in_orders_closed/:id`
