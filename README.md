# Next.js SaaS Starter with Turso and Bun

This is a starter template for building a SaaS application using **Next.js** with support for authentication, Stripe integration for payments, and a dashboard for logged-in users. It uses Turso SQLite for edge-ready database capabilities and Bun as the JavaScript runtime and package manager.

**Demo: [https://next-saas-start.vercel.app/](https://next-saas-start.vercel.app/)**

## Features

- Marketing landing page (`/`) with animated Terminal element
- Pricing page (`/pricing`) which connects to Stripe Checkout
- Dashboard pages with CRUD operations on users/teams
- Basic RBAC with Owner and Member roles
- Subscription management with Stripe Customer Portal
- Email/password authentication with JWTs stored to cookies
- Global middleware to protect logged-in routes
- Local middleware to protect Server Actions or validate Zod schemas
- Activity logging system for any user events
- Edge-ready database with Turso SQLite
- Fast development with Bun runtime

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Turso SQLite](https://turso.tech/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Payments**: [Stripe](https://stripe.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Runtime**: [Bun](https://bun.sh/)

## Getting Started

```bash
git clone https://github.com/DraconDev/saas-starter-turso-bun-version
cd saas-starter-turso-bun-version
bun install
```

## Running Locally

First, make sure you have Bun installed on your system:
```bash
curl -fsSL https://bun.sh/install | bash
```

Use the included setup script to create your `.env` file:

```bash
bun db:setup
```

This will guide you through:
1. Setting up Stripe CLI
2. Creating a Turso database and getting credentials
3. Setting up Stripe webhooks
4. Configuring authentication

Then, run the database migrations and seed the database with a default user and team:

```bash
bun db:generate
bun db:migrate
bun db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can, of course, create new users as well through `/sign-up`.

Finally, run the Next.js development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

Optionally, you can listen for Stripe webhooks locally through their CLI to handle subscription change events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Testing Payments

To test Stripe payments, use the following test card details:

- Card Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3-digit number

## Going to Production

When you're ready to deploy your SaaS application to production, follow these steps:

### Set up a production Stripe webhook

1. Go to the Stripe Dashboard and create a new webhook for your production environment.
2. Set the endpoint URL to your production API route (e.g., `https://yourdomain.com/api/stripe/webhook`).
3. Select the events you want to listen for (e.g., `checkout.session.completed`, `customer.subscription.updated`).

### Set up a production Turso database

1. Create a new Turso database for production
2. Get your production database URL and auth token
3. Push your schema using Drizzle Kit

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com/) and deploy it.
3. Follow the Vercel deployment process, which will guide you through setting up your project.

### Add environment variables

In your Vercel project settings (or during deployment), add all the necessary environment variables. Make sure to update the values for the production environment, including:

1. `BASE_URL`: Set this to your production domain.
2. `STRIPE_SECRET_KEY`: Use your Stripe secret key for the production environment.
3. `STRIPE_WEBHOOK_SECRET`: Use the webhook secret from the production webhook you created in step 1.
4. `DATABASE_URL`: Set this to your production Turso database URL.
5. `DATABASE_AUTH_TOKEN`: Set this to your production Turso auth token.
6. `AUTH_SECRET`: Set this to a random string. `openssl rand -base64 32` will generate one.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. All contributions are welcome!
