**_Please note this project is in active development and subject to change and ongoing improvement._**

# Ecommerce Store For Plants Mock-Up

## Description

## Features

- Products overview and product page
- Shopping cart
- Update or delete products in the shopping cart
- Checkout process
- User account
- User authentication (registration and login)

## Setup

1. Clone the repository

```text
git clone https://github.com/Nella1a/next-js-ecommerce-store
cd next-js-ecommerce-store
```

2. Ensure that you have a PostgreSQL instance running, then create a database and user.

   ```sql
   CREATE DATABASE mydatabase;
   CREATE USER myuser WITH PASSWORD 'mypassword';
   GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
   ```

3. Create a .env file in the project’s root directory and set the environment variable for the database connection URL that Prisma ORM uses to connect to the database.
   For example:

   ```text
   POSTGRES_PRISMA_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=hotdeals"
   ```

4. Install dependencies

   ```text
   npm install
   ```

5. Run database migrations

   ```text
   npx prisma migrate dev
   ```

6. Run application

   ```text
   npm run start
   ```

7. Open <http://localhost:3000> on your browser.

## Technology Stack

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Firebase Authentication
- Emotion CSS
- Deployed to Vercel

## Screenshots of the project

![screenshot of original landig page](./public/landingPage.png)
![screenshot of original landig page including footer](./public/landingPage2.png)
![screenshot of original product page](./public/productPage.png)
![screenshot of original shopping cart page](./public/shoppingCart.pn)
![screenshot of original checkout pag](./public/checkout.png)
