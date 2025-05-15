# 🛒 Mini Mart Front-End with NextJS, TypeScript

Mini Mart is a web platform that supports private grocery stores in Vietnam by providing a modern, easy-to-use and efficient management system. The platform helps store owners manage products, orders, staff and revenue — thereby saving time and optimizing business operations.

## 🚀 Outstanding features

✅ Manage products, inventory, barcodes, expiration dates

✅ Manage sales, orders, payments

✅ Manage revenue by day, month, cost, profit

✅ Manage users by role: admin, sales staff, warehouse staff

✅ Modern interface, compatible on many devices

✅ Support authentication with GitHub (via NextAuth)

## Features

- [x] [Next.js](https://nextjs.org): Full-fledged framework for React apps
- [x] [TypeScript](https://www.typescriptlang.org): Type checking and better code quality
- [x] [TailwindCSS](https://tailwindcss.com): Utility-first CSS framework
- [x] [ESLint](https://eslint.org): Linting for clean and consistent code
- [x] [Prettier](https://prettier.io): Code formatting

## Use this boilerplate

You can either clone this repository using command line or clicking on the "Use this template" button to create a new repository with the same directory structure.

```sh
npm install
npm run dev
```

## Project Structure

- All common things (project-wide, global) are placed in the `src` directory. This includes components, types, styles, and utility functions. This is where we put things that are shared across the project.
- In the project wide components, we have `ui` directory that contains atomic design components like `Button`, `Tag`. Outside of the `ui` directory, there are components composed of atomic components like `Header`, `Footer`.
- In the `app` directory we have domains/features. This includes components, types, hooks, api (route handler) ... that are only used in that domain/feature. Basically these directories include things similar to the global things but are only used in the domain/feature.
- The project uses Next.js App Router to handle routing. The router is divided into two groups: `auth` and `unauth`. The `auth` group contains routes that require authentication, while the `unauth` group contains public routes.

```
|-- public                              # Static files (e.g., images, fonts)
|-- src                                 # Next.js source directory
|   |-- app                             # Next.js App Router
|   |   |-- (auth)                      # Route group for authentication pages (e.g., login, register)
|   |   |   |-- layout.tsx              # Authenticated layout
|   |   |-- (main)                      # (Group) Private routes
|   |   |   |-- layout.tsx              # Main layout
|   |   |-- globals.css                 # Global css
|   |   |-- layout.tsx                  # App layout
|   |   |-- not-found.tsx               # 404 file
|   |   `-- provider.tsx                # App-level providers (context, theme, etc.)
|   |-- components                      # Global components
|   |   |-- common                      # Shared/common components (e.g., Button, Input)
|   |   `-- elements                    # Atomic design UI elements (e.g., Header, Footer)
|   |       |-- Footer.tsx
|   |       `-- Header.tsx
|   |   `-- layouts                     # Page layout components
|   |       |-- MainLayout
|   |       `-- AuthLayout
|   |-- api                             # Server-side API route handlers (Next.js API routes)
|   |   `-- auth                        # Authentication-related APIs
|   |-- styles                          # Additional global/local styles
|   |   `-- global.css                  # Global styles
|   |-- types                           # Global types
|   |-- libs                            # 3rd-party libraries
|   |   `-- auth.ts
|   `-- utils                           # Utility/helper functions
|       `-- helpers.ts
|-- .eslintrc.json                      # ESLint configuration
|-- README.md
|-- next-env.d.ts
|-- next.config.ts
|-- package-lock.json
|-- package.json
|-- tailwind.config.ts                  # Tailwind configuration
|-- postcss.config.mjs                  # PostCSS configuration
`-- tsconfig.json                       # Typescript configuration
```

## Commit message convention

- The project uses Husky and Lint-staged to run ESLint and Prettier on staged files before committing.
- Commit messages must follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Eslint configuration

- The project uses common Eslint configuration for Typescript projects. The configuration is based on the following packages:
    - [eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript): Airbnb's ESLint config with TypeScript support.
    - [typescript-eslint](https://typescript-eslint.io/): Enables Eslint to lint TypeScript code.

## Contributing

If you have a question or have found a bug, or have any suggestions for improvement, feel free to create an issue or a pull request. Everyone is welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
