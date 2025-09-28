# Online-Pharmacy-Store

Single-page React application that provides a front-end for an online pharmacy/store. Features user authentication, product catalog, cart & wishlist, prescription upload, orders, interactions/allergies checks and a simple career application flow. Uses React Router for routing and Redux for client-side state.

## Key features
- User authentication: register, login, email flow, forgot-password + tokenized reset
- Profile: view and edit user profile
- Catalog: product listing and detail pages (dynamic route `/product/:id`)
- Shopping: cart, checkout-ready UI, orders history, wishlist
- Medical: upload prescriptions, manage allergies, check drug interactions
- Careers: apply for jobs via ApplyJob page
- Layout: dashboard wrapper layout component for authenticated sections
- State: Redux store for app state management

## Routes (defined in src/App.js)
- / — Home (PhContent) inside dashboard layout (PhStore)
- /cart
- /profile
- /editprofile
- /upload-prescription
- /my-orders
- /interaction
- /product/:id
- /allergies
- /wishList
- /applyJob
- /ph-login
- /ph-register
- /ph-sentEmail
- /ph-forgot-password
- /password-reset/:token

## Quick start
1. Clone repo
2. Install deps
   npm install
3. Start dev server
   npm start
4. Build for production
   npm run build

## Important files
- src/App.js — routing
- src/index.js — app bootstrap (BrowserRouter + Redux Provider)
- src/layout/Dashboard.js — dashboard / layout
- src/Components/authLogin.js — auth wrapper used for login route
- src/pages/* — page components (Ph-login, Ph-register, Cart, Product, Profile, etc.)
- src/states/index.js — Redux store

## Notes & troubleshooting
- Reset password file import in App.js points to `./pages/ResetPassworf` — verify and either rename file to `ResetPassworf.js` or correct the import to `ResetPassword.js`.
- CSS: index imports `./index.css`, `./all.min.css`, and Bootstrap from node_modules.
- If you use a backend, set environment variables (example): REACT_APP_API_BASE_URL and update API client code.

