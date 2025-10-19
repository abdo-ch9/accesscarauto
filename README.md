# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/96158169-9b98-47ff-88b2-37b9af55d0a4

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/96158169-9b98-47ff-88b2-37b9af55d0a4) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Set up the backend (includes database setup)
node setup-backend.js

# Step 4: Install frontend dependencies
npm i

# Step 5: Start the backend server (in a new terminal)
cd backend
npm run dev

# Step 6: Start the frontend development server (in another terminal)
npm run dev
```

## Database Setup

The application uses MongoDB for data storage. You have two options:

### Option 1: Local MongoDB
1. Install MongoDB locally on your system
2. Start MongoDB service
3. The backend will connect to `mongodb://localhost:27017/aero-car-store`

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `backend/.env` with your MongoDB Atlas connection string

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

**Frontend:**
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcryptjs for password hashing

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/96158169-9b98-47ff-88b2-37b9af55d0a4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
