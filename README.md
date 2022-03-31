This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Designed and developed an ecommerce store

You can buy plants. Have an overview of all plants, get more information about the single product. Select quantity and add to cart. Have an overview of your orders in the shoppingcart. Go to checkout fill out the order form and close your order.

# Technologies and Dependecies

Next.js
Typescript
PostgreSQL
@emotion/react
JS Cookie
dotenv-safe
ley

# Setup

Clone the repo from GitHub and then install the dependencies:

git clone:
cd next-js-ecommerce-store
yarn
Setup a database with postgres on your computer:

psql <login>
CREATE DATABASE <database name>;
CREATE USER <username> WITH ENCRYPTED PASSWORD '<pw>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
Create a .env file with the userinfo for the database and create .env.example as a template file for userinfo

Use migrations:

yarn migrate up
To delete data from database run:

yarn migrate down
To run the development server:

yarn dev
Open http://localhost:3000 with your browser to see the result.

To create the production build of the project run:

yarn build
yarn start

Create a readme with:
Title
Description
List of all technologies used
1 or 2 screenshots
Setup instructions
Deployment instructions

# screenshots

# Languages and Tools:

## Deploy on Vercel
