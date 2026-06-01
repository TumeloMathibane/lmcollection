# Liphiwe Site - E-Commerce Platform

A modern, full-stack e-commerce application built with Next.js, TypeScript, Convex, and TailwindCSS. Features a customer-facing storefront, shopping cart, payment processing, and a comprehensive admin dashboard.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Available Scripts](#available-scripts)
- [Key Features](#key-features)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Contributing](#contributing)

## Features

### Customer Features

- **Product Catalog**: Browse products organized by categories
- **Search & Filter**: Full-text search across products, categories, and descriptions
- **Shopping Cart**: Add/remove items, persistent cart state using Zustand
- **Checkout**: Streamlined checkout process with delivery options
- **Payment Processing**: Integrated payment gateway via TCG (Trusted Checkout Gateway)
- **Order Tracking**: Track orders from placement to delivery
- **User Accounts**: Create accounts and manage user profiles
- **Responsive Design**: Mobile-first design with DaisyUI components

### Admin Features

- **Dashboard**: Overview of sales, orders, and metrics
- **Product Management**: Add, edit, and delete products with dynamic pricing
- **Category Management**: Organize products into categories
- **Order Management**: Track and manage customer orders
- **Customer Management**: View and manage customer information
- **Admin Authentication**: Secure admin signin/signup

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 15.5.9 with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Backend**: [Convex](https://convex.dev) - Backend as a Service
- **Authentication**: [NextAuth](https://next-auth.js.org) 4.24.13
- **State Management**: [Zustand](https://zustand-demo.vercel.app) 5.0.8
- **Styling**: [TailwindCSS](https://tailwindcss.com) 4 with PostCSS
- **UI Components**: [DaisyUI](https://daisyui.com) 5.1.10
- **Icons**: [React Icons](https://react-icons.github.io/react-icons) 5.5.0
- **HTTP Client**: [Axios](https://axios-http.com) 1.12.2
- **Encryption**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js), [md5](https://www.npmjs.com/package/md5)
- **ID Generation**: [UUID](https://www.npmjs.com/package/uuid) 11

## Getting Started

### Prerequisites

- Node.js 18+ and npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd lmcollection
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Configure the following variables in `.env.local`:
   - `NEXTAUTH_SECRET`: Secret key for NextAuth sessions
   - `NEXTAUTH_URL`: Your application URL (e.g., http://localhost:3000)
   - `CONVEX_DEPLOYMENT`: Your Convex deployment ID
   - `NEXT_PUBLIC_CONVEX_URL`: Your Convex API URL
   - Payment gateway credentials (TCG)

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── (overview)/           # Customer pages
│   │   ├── page.tsx          # Home page
│   │   ├── collection/       # Product collection view
│   │   ├── cart/             # Shopping cart
│   │   └── info/             # Info pages (about, contact, policies)
│   ├── (payments)/           # Payment-related pages
│   │   └── payments/checkout # Checkout page
│   ├── (post-payment)/       # Post-payment pages
│   │   ├── return/           # Order confirmation
│   │   ├── cancel/           # Payment cancellation
│   │   └── notify/           # Payment webhook
│   ├── admin/                # Admin dashboard
│   │   ├── (overview)/       # Admin pages (products, orders, customers)
│   │   └── auth/             # Admin authentication
│   ├── api/                  # API routes
│   │   ├── auth/             # NextAuth configuration
│   │   └── types/            # TypeScript type definitions
│   └── components/           # Reusable React components
├── convex/                   # Convex backend functions & schema
│   ├── schema.ts             # Database schema
│   ├── products.ts           # Product mutations & queries
│   ├── orders.ts             # Order management
│   ├── users.ts              # User management
│   └── _generated/           # Auto-generated Convex types
├── stores/                   # Zustand state stores
│   ├── cart.ts               # Shopping cart state
│   └── favorites.ts          # Favorites management
├── constants/                # Application constants
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
└── utils/                    # Helper utilities
```

## Environment Setup

### Development Environment

```bash
npm run dev              # Start dev server with Turbopack
npm run preview         # Preview with .env.preview
```

### Build & Production

```bash
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run preview` - Run preview environment using .env.preview
- `npm run build` - Build application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint code linter

## Key Features

### Dynamic Pricing

Products support dynamic pricing based on configurable criteria (e.g., quantity discounts, seasonal pricing).

### Search & Indexing

Full-text search powered by Convex search indexes on:

- Product names and descriptions
- Product brands
- Categories

### Order Management

Complete order lifecycle:

- Order creation with items, pricing, and customer details
- Shipping information tracking
- Order status management (received, pending, delivered, cancelled)
- Payment ID tracking for reconciliation

### Cart State Management

Persistent shopping cart using Zustand with features for:

- Adding/removing items
- Quantity management
- Price calculations

### Delivery Options

Multiple delivery options with integration to Paxi logistics provider.

## Authentication

### Customer Authentication

- NextAuth integration for user login/signup
- Session-based authentication
- OAuth support (configurable)

### Admin Authentication

- Separate admin authentication endpoints
- Password hashing with bcryptjs
- Secure admin dashboard access

## Database Schema

### Categories

- `name`: Category name
- `no_of_items`: Count of products in category
- `image`: Category image URL

### Products

- `brand`, `name`, `price`, `discount`: Product details
- `availability`: in-stock or out-of-stock status
- `images`: Array of product image storage IDs
- `additional_options`: Customizable product options
- `dynamic_pricing`: Boolean flag for dynamic pricing
- `sale`: Optional sale identifier

### Orders

- `orderId`: Unique order identifier
- `m_payment_id`: Payment processor ID
- `items`: Array of ordered items
- `totalPrice`: Order total
- `customer_details`: Customer information
- `shipping_details`: Delivery address and options
- `status`: Order status

### Customers

- `name_first`, `name_last`: Customer name
- Additional customer profile fields

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## License

This project is proprietary and confidential.
