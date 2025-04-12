# Shelf

Shelf is a full-stack application with a Next.js frontend and Node.js backend.

## Repository Structure

```
/
├── client/             # Frontend Next.js application
│   ├── .next/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   └── tsconfig.tsbuildinfo
│
├── server/             # Backend Node.js application
│   ├── logs/
│   ├── node_modules/
│   ├── src/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── .gitignore
```

## Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- MongoDB (local or Atlas connection)
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kkapil94/shelf.git
cd shelf
```

### 2. Backend Setup

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create .env file with the following content
echo "MONGO_URI=your_mongodb_connection_string
PORT=4000" > .env

# Start the development server
npm run dev
```

The backend server should now be running at `http://localhost:4000`.

### 3. Frontend Setup

```bash
# Navigate to the client directory from the project root
cd client

# Install dependencies
npm install

# Create .env file with the following content
echo "NEXT_PUBLIC_API_URL=Your-backend-url" > .env

# Start the development server
npm run dev
```

The frontend should now be running at `http://localhost:3000`.

## Environment Variables

### Backend (.env)

```
MONGO_URI=your_mongodb_connection_string
PORT=4000
```

### Frontend (.env)

```
NEXT_PUBLIC_API_URL=https://shelf-ljlb.onrender.com/api/v1
```

For local development, you might want to change the `NEXT_PUBLIC_API_URL` to point to your local backend:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

## Available Scripts

### Backend

- `npm run dev`: Start the development server with hot reload
- `npm run build`: Build the production version
- `npm start`: Start the production server

### Frontend

- `npm run dev`: Start the development server
- `npm run build`: Build the production version
- `npm start`: Start the production server
- `npm run lint`: Run ESLint to check code quality

## Deployment

The application is currently deployed at:

- Frontend: https://shelf-sable.vercel.app/
- Backend: https://shelf-ljlb.onrender.com/api/v1

## Contact

Project Link: https://github.com/kkapil94/shelf
