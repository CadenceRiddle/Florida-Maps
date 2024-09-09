Florida Maps Project
--------------------------------

This project is a Node.js web application for managing locations and finding the shortest path between them. It provides an API for CRUD operations on locations and an algorithm to compute the shortest path between locations using Dijkstra's algorithm.

Features
---------------------
Location Management: Create, read, update, and delete locations with neighbors information.

Shortest Path Calculation: Find the shortest path between two locations using Dijkstra's algorithm.

Graph Representation: Convert locations and neighbors into a graph structure.

Session Management: User sessions are handled with express-session and stored in PostgreSQL using Sequelize.

Database Integration: Sequelize is used as the ORM to interact with a PostgreSQL database.

Setup
---------------
Prerequisites
-------------------
* Node.js (v12.x or higher)
* PostgreSQL database
* A .env file with the following variables:

        DB_NAME=your_db_name
        DB_USER=your_db_user
        DB_PASSWORD=your_db_password
        DB_DIALECT=postgres
        PORT=3000

Installation
-------------------
Clone the repository:

        git clone https://github.com/your-username/florida-maps.git
        cd florida-maps
        
Install dependencies:

        npm install
        
Set up the database by configuring the .env file as mentioned in the prerequisites.

Sync the database models:

        npm run sync-db
        
Start the server:

        npm start
        
The server will run on http://localhost:3000.

API Endpoints
-------------------
* Location Routes (/api/locations)
* GET /locations - Fetch all locations.
* POST /locations - Add a new location with neighbors.
* PUT /locations/:locationId - Update an existing location.
* DELETE /locations/locationName/:locationName - Delete a location by its name.
* Shortest Path Routes (/api/findPath)
* POST /findPath - Compute the shortest path between two locations using Dijkstra's algorithm. Requires the location names (locationA and locationB).

Files Overview
------------------
* App.js: Main application file that initializes Express, sets up routers, and connects to the database using Sequelize.
* server.js: Starts the server and listens on the defined port from the .env configuration​(server).
* sequelize.js: Defines the Sequelize database instance and the Location model​(sequelize).
* locations_route.js: Handles the CRUD operations for locations, including fetching, updating, and deleting locations​(locations_route).
* shortestPath.js: Implements Dijkstra’s algorithm to compute the shortest path between two locations​(shortestPath).
* priorityQueue.js: Implements a priority queue, used in the shortest path algorithm to determine the next node to visit​(priorityQueue).
* graphify.js: Converts the database of locations and neighbors into a graph structure for pathfinding​(graphify).
* route.js: Defines the route to calculate the shortest path between locations using the graphify and dijkstra functions​(route).

Algorithms
-------------------
* Graphify: Converts location data into a graph for pathfinding by connecting locations based on their neighbor relationships.
* Dijkstra's Algorithm: Finds the shortest path between two locations in the graph by using a priority queue for efficient traversal.

Dependencies
--------------------
* express for handling HTTP requests
* sequelize and pg for PostgreSQL integration
* express-session and connect-session-sequelize for session management
* jest and supertest for testing
