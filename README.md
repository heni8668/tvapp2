Television Networks App
This project is a Television Networks App built using React, Node.js, Express, and PostgreSQL. The application allows users to manage movies, channels, categories, and types. Users can also save movies to a "Watch Later" list and mark movies as favorites. The project includes an admin panel for CRUD operations and a dashboard with charts for data visualization.

Features
Admin Panel: Manage movies, channels, categories, and types.
CRUD Operations: Add, edit, delete movies, channels, categories, and types.
User Features: Save movies to watch later and mark as favorites.
Responsive Design: Optimized for both desktop and mobile screens.
Real-time Updates: Data updated live using Socket.io.
Charts and Analytics: Dashboard includes user count, program count, channel count, and charts for program categories and types.

Technologies Used
Frontend: React, Material UI
Backend: Node.js, Express
Database: PostgreSQL
ORM: Prisma
Validation: Zod
Charts: Victory Chart / Recharts
Real-time Updates: Socket.io

Prerequisites
Node.js (v14.x or later)
PostgreSQL

Project Structure

.
├── client
│ ├── public
│ ├── src
├── admin
│ │ │ ├── component files
│ │ │ ├── context files
│ │ │ ├── pages files
│ │ │ ├── services files
│ │ │  
│ │ ├── assets
│ │ │  
│ │ ├── components
│ │ │ ├── Banner.js
│ │ │ ├── maincontent.js
│ │ │ ├── protectedRoute.js
│ │ │ ├── sidebarleft.js
│ │ │ └── sidebarRight.js
│ │ │ └── TopBar.js
│ │ ├── services
│ │ │ ├── detailPage.js
│ │ │ ├── front.js
│ │ │ ├── Login.js
│ │ │ └── register.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── ...
├── server
│ ├── controllers
│ │ ├── categoryController.js
│ │ ├── channelController.js
│ │ ├── movieController.js
│ │ ├── typeController.js
│ │ ├── userController.js
│ ├── middleware
│ │ ├── client.js
│ │  
│ ├── prisma
│ │ ├── client.js
│ │ └── schema.prisma
│ │ └── seed.js
│ ├── routes
│ │ ├── categoryRoutes.js
│ │ ├── channelRoutes.js
│ │ ├── movieRoutes.js
│ │ ├── typeRoutes.js
│ │ └── userRoutes.js
│ ├── utils
│ │ ├── validation.js
│ ├── .env
│ ├── server.js
│ └── ...
├── package.json
└── README.md

API Endpoints
Movies
GET /api/movies/get-movie - Get all movies
POST /api/movies/add-movie - Create a new movie
PUT /api/movies/update-movie:id - Update a movie
DELETE /api/movies/delete-movie/:id - Delete a movie
Channels
GET /api/channels/get-channel - Get all channels
POST /api/channels/add-channel - Create a new channel
PUT /api/channels/update-channel/:id - Update a channel
DELETE /api/channels/delete-channel/:id - Delete a channel
Categories
GET /api/categories/get-category - Get all categories
POST /api/categories/create-category - Create a new category
PUT /api/categories/update-category/:id - Update a category
DELETE /api/categories/delete-category:id - Delete a category
Types
GET /api/types/get-type - Get all types
POST /api/types/add-type - Create a new type
PUT /api/types/update-type/:id - Update a type
DELETE /api/types/delete-type/:id - Delete a type
User
POST /api/users/watch-later - Add to watch later list
POST /api/users/favorites - Add to favorites list
DELETE /api/users/watch-later - Remove from watch later list
DELETE /api/users/favorites - Remove from favorites list
