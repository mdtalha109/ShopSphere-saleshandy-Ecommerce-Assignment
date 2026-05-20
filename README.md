# ShopSphere - E-Commerce Platform

A modern, production-ready e-commerce platform built with Next.js 16, TypeScript, and React 19, featuring a complete shopping experience from product browsing to order management.

##  What I Built

A fully functional e-commerce application with:

- **Product Catalog** - Browse products by category with advanced filtering and sorting
- **Search Functionality** - Real-time search with debouncing and category filters
- **Shopping Cart** - Persistent cart with quantity management and price calculations
- **Authentication** - Email/password login with guest checkout option (only guest login will work)
- **Checkout Flow** - Address management (basic) and checkout
- **Responsive Design** - Mobile-first approach with professional UI/UX

## 🛠️ Tech Stack

### Core
- **Next.js 16.2.6** (App Router with Turbopack) - Latest features including Server Components
- **React 19.2.4** - Latest React with concurrent features
- **TypeScript 5** - Full type safety across the application

### State Management & Data Fetching
- **@tanstack/react-query** - Server state management with intelligent caching
- **React Context API** - Global state for cart, auth, and checkout
- **localStorage** - Persistent storage for cart, auth, addresses, and orders

## 🏗️ Architecture Decisions

### 1. Feature-Based Architecture
```
src/
├── features/
│   ├── auth/              # Authentication domain
│   ├── cart/              # Shopping cart domain
│   ├── checkout/          # Checkout & orders domain
│   ├── product-detail/    # Product details domain
│   ├── product-listing/   # Product listing & filters
│   └── search/            # Search functionality
```

**Why?** Feature-based architecture provides:
- Better code organization and discoverability
- Clear domain boundaries
- Simplified testing (each feature is self-contained)

### 2. Layered Architecture Within Features
Each feature follows a consistent structure:
```
feature/
├── components/      # React components
├── hooks/          # Custom React hooks
├── services/       # Business logic layer
├── repositories/   # Data access layer
├── types/          # TypeScript definitions
└── contexts/       # Feature-specific state
```

**Why?** This separation provides:
- **Single Responsibility** - Each layer has one job
- **Testability** - Easy to mock layers in tests
- **Flexibility** - Can swap repositories (localStorage → API) without touching business logic
- **Type Safety** - Domain types prevent runtime errors

### 3. Repository Pattern for Data Persistence

**Why?** Makes it trivial to swap storage mechanisms:
- Today: localStorage
- Tomorrow: External system
- Business logic remains unchanged

### 4. Service Layer for Business Logic

**Why?**
- Keeps components thin and focused on presentation
- Business rules in one testable place
- Easy to add validation, calculations, and complex workflows

### 5. React Query for Server State
Used for product fetching with:
- Automatic caching and invalidation
- Background refetching
- Optimistic updates
- Loading and error states

**Why not for everything?** 
- Cart, auth, and checkout are **local-first** experiences
- These need instant updates without network latency
- React Context + localStorage is more appropriate here

## 🗂️ Folder Structure Rationale


## 🚦 Getting Started

### Prerequisites
- Node.js 20+ 
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/mdtalha109/ShopSphere-saleshandy-Ecommerce-Assignment.git
cd  ShopSphere-saleshandy-Ecommerce-Assignment

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

### Test Credentials
- Email: `frontend@saleshandy.com`
- Password: `hireme`
- Or use **Guest Login** for quick access

## 🧪 Testing the Application

### Key User Flows to Test

1. **Browse & Filter Products**
   - Visit homepage → Browse categories
   - Use filters and sorting on product listing pages
   - Search for products

2. **Shopping Cart**
   - Add products to cart
   - Update quantities
   - Remove items
   - Cart persists on page refresh

3. **Guest Checkout**
   - Add items to cart
   - Click "Proceed to Checkout" → Redirected to login
   - Use "Continue as Guest"
   - Add delivery address
   - Place order

4. **Authenticated Checkout**
   - Login with test credentials
   - Add multiple addresses (deleting address feature is not there as of now)
   - Place order
   - View order history



## 📝 Notes for Reviewers

- All data is mocked (localStorage + static Data)
- Focus on architecture, patterns, and code organization
- Scalable patterns that work for teams

## 🎓 What I Would Do Differently with More Time

### 1. Comprehensive Testing Strategy (High Priority)
Due to the assignment timeline, the primary focus was placed on frontend architecture, UI/UX quality, responsiveness, and overall product polish. With additional time, I would introduce a more complete testing strategy across the application.

**Why This Matters:**
- Improves confidence during refactoring and feature iteration
- Encourages better separation of concerns and more maintainable architecture


### 2. Advanced Features

**Product Experience:**
- **Product Reviews & Ratings** - Star ratings, user reviews with photos
- **Wishlist/Favorites** - Save products for later, share wishlists
- **Product Comparison** - Compare specs side-by-side
- **Recently Viewed** - Track and display browsing history

### 3. Multi Language Support
Currently, the platform is available only in English. With additional time, I would implement a scalable internationalization strategy.

- Multi-language support using a structured i18n setup
- Locale-based routing

### 4. Performance & Scalability Enhancements
- Virtualized product lists for large catalogs
- Better image optimization and progressive loading strategies
- Route-level code to reduce initial bundle load
- Improved perceived performance through optimistic UI patterns

### 5. Design System
The component structure was designed to be reusable and scalable. Given more time, I would further evolve it into a more formalized frontend design system.
- Shared design tokens
- Storybook integration
- Component documentation

**Built with ❤️ by Talha** | Frontend SDE 2 Candidate
