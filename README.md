**_Please note this project is in active development and subject to change and ongoing improvement._**

# E-commerce Store for Plants (Mock-Up)

SheLovesPlants is a full-stack e-commerce mock application built with **Next.js**, simulating a modern online plant shop with product listings, user accounts, and a cart system. Product and customer data are stored in a **PostgreSQL** database, with data access and modeling handled through **Prisma**, a type-safe ORM that streamlines queries and database migrations. User authentication — including registration and login — is implemented using **Firebase Authentication,** offering a secure and scalable solution for managing users.

## Features

- Product overview and detailed product pages
- Shopping cart functionality
- Add, update, or remove products from the cart
- Checkout process
- User account management
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
![screenshot of original shopping cart page](./public/shoppingCart.png)
![screenshot of original checkout pag](./public/checkout.png)
