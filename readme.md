Server-16: API Gateway Proxy



📌 Overview

Server-16 is a CORS Proxy Server that helps securely route API requests while keeping the original API endpoints hidden. This project is built with Node.js and Express, utilizing http-proxy-middleware to forward requests dynamically.

🚀 Features

✔️ API Gateway – Acts as a proxy for multiple backend APIs.
✔️ CORS Support – Handles cross-origin requests.
✔️ Environment-Based Routing – Uses .env variables for easy API configuration.
✔️ Logging & Debugging – Displays request paths and errors for monitoring.
✔️ Secure API Routing – Prevents exposing backend URLs directly to clients.
✔️ Vercel Deployment – Hosted as a serverless function for fast and efficient performance.

🔧 Technologies Used

Node.js

Express.js

http-proxy-middleware

CORS

Vercel Serverless Functions


🛠 Setup & Installation

1️⃣ Clone the Repository

git clone https://github.com/AmanKadam-16/Server-16.git
cd Server-16

2️⃣ Install Dependencies

npm install

3️⃣ Create a .env File

Define your API URLs in a .env file:

RIT_API_URL=https://your-rit-api.com
RIT_API_TEST_URL=https://your-rit-test-api.com
RIT_BASE_URL=https://your-rit-base-api.com
TA_BASE_URL=https://your-ta-api.com

4️⃣ Run the Server Locally

node proxy.js

Server will start on http://localhost:4000

🌍 API Usage

Append your request path after the respective endpoint:

https://server16.vercel.app/[endpoint]/your-route

Example:

https://server16.vercel.app/rit-api/v1/data

Available API Routes

📸 UI Dashboard

Server-16 includes a modern and clean UI dashboard hosted at server16.vercel.app.
This dashboard provides a visual representation of the API routes, their statuses, and usage guidelines, making it easier for developers to interact with the API Gateway.

🚀 Deployment on Vercel

To deploy, install Vercel CLI and run:

vercel deploy

The project will be hosted as a serverless function.

🔥 Future Improvements

Add authentication support for secured API access.

Implement rate limiting to prevent abuse.

Improve logging and monitoring.



---

Developed with passion by Code_RED 🌿
