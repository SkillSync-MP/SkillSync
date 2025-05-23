SkillSync

SkillSync is a full-stack, skill-based networking and matchmaking platform designed to connect students, professionals, and learners based on their skills, interests, and career goals. It enables users to find study partners, join study groups, and collaborate on learning experiences. Built with modern web technologies, SkillSync offers a secure, responsive, and user-friendly interface.
Table of Contents

Features
Tech Stack
Project Structure
Installation
Usage
API Endpoints
Search Feature
Future Scope
Contributing
License

Features

User Authentication: Secure signup and login with JWT-based authentication and bcrypt password hashing.
Onboarding: Multi-step form to collect user details like department, skills, career path, and availability.
User Profiles: View and edit personal profiles, including name, bio, skills, and more; view other users’ profiles.
Search Functionality: Search for users by all profile fields (e.g., name, skills, department), with responsive results display.
Protected Routes: Middleware ensures only authenticated, onboarded users access sensitive pages (e.g., search, dashboard).
Responsive UI: Modern design with Tailwind CSS, featuring a purple gradient theme and glassmorphism effects.
MongoDB Integration: Flexible schema for dynamic user profiles, with efficient querying for search.

Tech Stack

Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
Backend: Next.js API Routes, MongoDB, Mongoose
Authentication: JSON Web Tokens (JWT), bcryptjs
Libraries:
axios for API requests
react-hot-toast for notifications
jsonwebtoken for auth
mongoose for MongoDB ORM


Fonts: Geist Sans, Geist Mono (via Next.js fonts)
Deployment: Ready for Vercel with MongoDB Atlas (not yet deployed)

Project Structure
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints (verify, logout)
│   │   ├── users/         # User-related endpoints (signup, login, search, etc.)
│   ├── about/             # Static page
│   ├── contacts/          # Static page
│   ├── contact-us/        # Static page
│   ├── dashboard/         # Protected user dashboard
│   ├── features/          # Static page
│   ├── login/             # Login page
│   ├── onboarding/        # Onboarding form and components
│   ├── profile/           # User profile pages (own and others)
│   ├── search/            # Search page
│   ├── signup/            # Signup page
│   ├── study/             # Study resources page
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── middleware.ts      # Authentication middleware
│   ├── globals.css        # Global styles with Tailwind CSS
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer with links
├── dbConfig/              # MongoDB connection
│   ├── dbConfig.ts
├── models/                # Mongoose schemas
│   ├── User.ts
├── public/                # Static assets
│   ├── logo.png           # SkillSync logo
│   ├── placeholder-avatar.png
├── .env.local             # Environment variables (not in repo)
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration

Installation
Follow these steps to set up SkillSync locally.
Prerequisites

Node.js (v18 or higher)
MongoDB (local or MongoDB Atlas)
Git

Steps

Clone the Repository:
git clone https://github.com/your-username/skillsync.git
cd skillsync


Install Dependencies:
npm install


Set Up Environment Variables:Create a .env.local file in the root directory and add:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/skillsync?retryWrites=true&w=majority
JWT_SECRET_KEY=your-secret-key


Replace MONGO_URI with your MongoDB connection string.
Generate a secure JWT_SECRET_KEY (e.g., using openssl rand -base64 32).


Run the Development Server:
npm run dev

Open http://localhost:3000 in your browser.

Build for Production (optional):
npm run build
npm run start



Usage

Sign Up: Navigate to /signup to create an account with name, email, and password.
Onboarding: Complete the multi-step onboarding form at /onboarding to set up your profile (skills, department, etc.).
Log In: Use /login to access the platform.
Search Users: Go to /search to find users by any profile field (e.g., skills, department).
View/Edit Profile: Access /profile to manage your profile or /profile/[id] to view others.
Explore: Use the dashboard (/dashboard), study page (/study), or static pages (/about, /features).

API Endpoints
The backend is powered by Next.js API routes. Key endpoints include:



Endpoint
Method
Description



/api/users/signup
POST
Register a new user


/api/users/login
POST
Authenticate a user


/api/auth/verify
GET
Verify JWT token


/api/auth/logout
POST
Log out and clear token


/api/users/[id]
GET
Fetch user by ID


/api/users/[id]
PUT
Update user profile


/api/users/onboarding
POST
Save onboarding details


/api/users/search
GET
Search users by profile fields


Example: Search API
GET /api/users/search?name=John&known_skills=Python&branch=Computer%20Science

Response:
{
  "success": true,
  "users": [
    {
      "_id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "branch": "Computer Science",
      "known_skills": ["Python", "Java"],
      ...
    }
  ]
}

Search Feature
The search feature is a core component of SkillSync, allowing users to find others based on all User schema fields:

Fields: name, email, branch, passing_year, known_skills, career_path, experience, learning_goal, availability, isOnboarded, isVerified.
Implementation:
Backend: /api/users/search (GET) uses MongoDB queries with regex for text fields and $in for arrays, excluding sensitive fields (password, tokens).
Frontend: /app/search/page.tsx provides a form with inputs for all fields, using checkboxes for multi-select (e.g., skills) and dropdowns for others (e.g., department). Results are displayed as clickable profile cards.
Security: Protected by middleware, ensuring only authenticated, onboarded users can access.
UI: Responsive grid layout with Tailwind CSS, featuring glassmorphism and a purple gradient theme.


Example: Search for users with “Python” skills in “Computer Science” graduating in 2025.

Future Scope

Matchmaking Model: Integrate a Python-based matchmaking algorithm to suggest users based on skill and interest compatibility.
Enhanced Search: Add sorting, pagination UI, and a header search bar.
Study Groups: Implement group creation and management features.
Messaging: Add real-time chat for user collaboration.
Deployment: Host on Vercel with MongoDB Atlas for production use.
Performance: Index MongoDB fields (name, known_skills) and add caching.

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit changes (git commit -m 'Add YourFeature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.

Please follow the Code of Conduct and ensure code is TypeScript-compliant and styled with Tailwind CSS.
License
This project is licensed under the MIT License. See LICENSE for details.

Author: [Your Name]Contact: [Your Email or LinkedIn]Last Updated: May 22, 2025

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
