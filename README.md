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
src/
├── app/ # (Optional) Next.js App Router (Next 13+)
├── pages/ # Routes/pages (nếu không dùng app directory)
│ ├── index.tsx # Trang chủ
│ ├── about.tsx # Trang giới thiệu
├── assets/ # Static assets (images, fonts, ...)
│ ├── images/
│ └── fonts/
├── components/ # UI components dùng lại được (Button, ProductCard, ...)
├── layouts/ # Layout components (MainLayout, AdminLayout)
├── features/ # Các module chức năng (e.g., product, auth)
│ └── product/
│ └── components/ # Component riêng cho tính năng product
├── hooks/ # Custom hooks (e.g., useAuth, useWindowSize)
├── types.ts # Global TypeScript types (hoặc đặt vào thư mục /types)
├── index.ts
├── context/ # Global state (Context API hoặc Redux slices)
├── data/ # Static data và config (e.g., site-config.ts)
├── lib/ # Thư viện ngoài, axiosInstance, utils chung
├── services/ # API service (e.g., productService.ts, authService.ts)
├── styles/ # CSS/SCSS chung, config Tailwind
├── types/ # TypeScript type definitions (e.g., user.ts, product.ts)
├── utils/ # Helper/utility (e.g., formatDate.ts, debounce.ts)
public/ # Static files (favicon, robots.txt, ...)

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
