
## 🛠️ Installation

1. Install dependencies:
  ```bash
  npm install
  # or
  yarn install
  ```

2. Start the server:
  ```bash
  npm run start
  # or
  yarn start
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Utility-first approach for rapid development
- Custom theme configuration
- Responsive design utilities

# ORO24 Mini Web App

A modern React application for ORO24 facilities management services with login, service categories, and service details.

## Features

- 🔐 **Secure Authentication** with token-based login
- 📱 **Fully Responsive** design for all screen sizes
- ⚡ **Optimized Performance** with lazy loading and code splitting
- 🎨 **Modern UI** matching Figma design specifications
- 🛡️ **Error Handling** with error boundaries and user-friendly messages
- 🔄 **Real-time Updates** with context-based state management

## Tech Stack

- **React 18** with Functional Components & Hooks
- **React Router v6** for navigation
- **Context API** for state management
- **Axios** for API requests with interceptors
- **SASS** for styling
- **Class Variance Authority** for variant management
- **React Helmet Async** for SEO

## Project Structure
src/
├── components/
│ ├── common/ # Reusable layout components
│ └── ui/ # Reusable UI components
├── contexts/ # React Context providers
├── hooks/ # Custom React hooks
├── pages/ # Page components
├── services/ # API services
├── styles/ # Global styles
├── utils/ # Utility functions
└── assets/ # Static assets



## Setup & Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd oro24-app

2.install Dependencies
npm install

4.Start the development server
npm run dev

5.Build for production
npm run build

-----------------------------------------------------------------
API Integration
The application integrates with four main APIs:

Login API - User authentication

Get Categories - Fetch service categories

Get Services - Fetch services by category

Service Details - Get detailed service information

-----------------------------------------------------------------
Demo Credentials
Email: oro_1993@yopmail.com

Password: *123@Abc

----------------------------------------------------------------

Live Demo: [https://monumental-moonbeam-5cf416.netlify.app]
------------------------------------------------