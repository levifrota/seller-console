# Mini Seller Console

A sales management application built with React, TypeScript and Vite. This project is a code challenge for CoverPin.

## 🚀 Features

### Lead Management
- View and filter leads by status (New, Contacted, Qualified, Unqualified)
- Search leads by name or company
- Lead scoring and priority indicators
- Edit lead information with validation
- Convert leads to opportunities
- Responsive design for mobile and desktop

### Opportunity Management
- Track sales opportunities through different stages
- Filter by stage and amount ranges
- Sort by various criteria (name, stage, amount, company, date)
- Pipeline value tracking and statistics
- Win rate analysis
- Stage-based progress indicators

### User Experience
- UI made with Tailwind CSS
- Responsive design
- Loading states and error handling
- Slide-over panels for detailed views

## 🛠 Tech Stack

### Core Technologies
- **React 19.1.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.1.2** - Build tool and development server
- **React Router DOM 7.9.1** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.13** - Tailwind CSS Vite plugin
- **Lucide React 0.544.0** - Icon library
- **Class Variance Authority 0.7.1** - Component variant management
- **clsx 2.1.1** & **tailwind-merge 3.3.1** - Conditional styling utilities

### Development Tools
- **ESLint 9.33.0** - Code linting
- **TypeScript ESLint 8.39.1** - TypeScript-specific linting rules
- **@vitejs/plugin-react 5.0.0** - React support for Vite

### Other Dependencies
- **@radix-ui/react-slot 1.2.3** - Composition utilities
- **Redux 5.0.1** - State management

## 📋 Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd seller-console-gideao
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint
```

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppIcon.tsx      # Icon wrapper component
│   ├── Button.tsx       # Button component with variants
│   ├── Input.tsx        # Form input component
│   ├── Select.tsx       # Dropdown select component
│   ├── Checkbox.tsx     # Checkbox component
│   ├── Header.tsx       # Application header
│   ├── TabNavigation.tsx # Navigation tabs
│   └── ...
├── pages/              # Page components
│   ├── lead/           # Lead management pages
│   │   ├── index.tsx   # Main lead dashboard
│   │   └── components/ # Lead-specific components
│   ├── opportunity/    # Opportunity management pages
│   │   ├── index.tsx   # Main opportunity dashboard
│   │   └── components/ # Opportunity-specific components
│   └── NotFound.tsx    # 404 page
├── styles/             # Global styles and CSS
│   └── index.css       # Main stylesheet with Tailwind
├── utils/              # Utility functions
│   └── cn.ts           # Class name utility
├── types.ts            # TypeScript type definitions
├── Routes.tsx          # Application routing
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up

Key responsive features:
- Collapsible navigation on mobile
- Card-based layouts for small screens
- Adaptive table layouts
- Touch-friendly interactive elements

## 🔍 Key Features Implementation

### Lead Management
- Mock data simulation with realistic lead information
- Status-based filtering and search functionality
- Lead scoring visualization
- Conversion to opportunities workflow
- Persistent user preferences

### Opportunity Management
- Pipeline tracking with stage management
- Amount-based filtering and sorting
- Statistics dashboard with key metrics
- Win rate calculation and display
- Created date tracking

### State Management
- Local state with React hooks
- LocalStorage for user preferences
- Optimistic updates for better UX
- Error boundary for graceful error handling
