This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# My Next.js Project

This project is a Next.js application built with TypeScript and follows a scalable and modular folder structure. The project is configured with Tailwind CSS, Axios, and additional packages to support features such as global state management, API services, and more.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Useful Links](#useful-links)

## Features

- **Next.js + TypeScript:** Server-side rendering, static generation, and all modern features of Next.js with strong type support.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Axios:** HTTP client for API requests.
- **State Management:** (Choose your state management method, e.g., Context API, Zustand or Redux Toolkit as needed)
- **Modular Structure:** Organized into folders like `/components`, `/features`, `/layouts`, `/hooks`, `/services`, `/utils`, etc.

## Folder Structure

The project is organized as follows:
/src
├── /app // (Optional) Use with Next.js App Router (Next 13+)
├── /pages // Routes/pages (if not using the app directory)
│ ├── \_app.tsx // Custom App component
│ ├── index.tsx // Home page
│ └── about.tsx // Additional pages
├── /assets // Static assets (images, fonts, etc.)
│ └── images/
│ └── fonts/
├── /components // Reusable UI components (e.g., Button, ProductCard)
├── /layouts // Layout components (e.g., MainLayout, AdminLayout)
├── /features // Feature modules (e.g., product, auth)
│ └── product/
│ ├── components/ // Components specific to product feature
│ ├── hooks/
│ ├── types.ts
│ └── index.ts
├── /context // Global state (using Context API/Redux slices)
├── /data // Static data and config (e.g., products.json, site-config.ts)
├── /hooks // Custom hooks (e.g., useAuth, useWindowSize)
├── /lib // External libraries config & utilities (e.g., axiosInstance)
├── /services // API service calls (e.g., productService.ts, authService.ts)
├── /styles // Global CSS, Tailwind config imports, SCSS files
├── /types // Global TypeScript types (e.g., product.ts, user.ts)
├── /utils // Utility/helper functions (e.g., formatDate.ts, debounce.ts)
└── /public // Public static files (favicon, robots.txt, etc.)

## Installation

1.  **Clone the repository:**

        ```bash
        git clone https://github.com/your-username/your-project.git
        cd your-project
        Install dependencies:
        ```

    npm install

# or

yarn install
Run the development server:
npm run dev

# or

yarn dev
Open http://localhost:3000 with your browser to see the result.
