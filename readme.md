# Log Ingestor and Query Interface 📊

Log Ingestor and Query Interface is a powerful tool designed for efficient log data management. It allows seamless log ingestion over HTTP and provides a user-friendly query interface with full-text search and various field filters. Whether you need to analyze logs, troubleshoot issues, or extract valuable insights, this application has got you covered.

## Features 🚀

- **Log Ingestion:** Ingest logs effortlessly over HTTP to populate your log database.
- **Query Interface:** Search logs with ease using a robust query interface, including full-text search and multiple field filters.

## Technologies Used 🛠️

- **MongoDB:** A scalable NoSQL database for storing log data efficiently.
- **Express.js:** A minimalist web application framework for the backend.
- **React:** A JavaScript library for building interactive user interfaces for the frontend.
- **Node.js:** A runtime for executing JavaScript on the server.
- **Apache Kafka:** A distributed streaming platform for handling large volumes of data asynchronously.
- **Redis:** A caching mechanism to optimize log search queries.

## Prerequisites 🌐

Make sure you have the following installed globally on your system:

- **Node.js and npm:** [Download and install Node.js](https://nodejs.org/).
- **Nodemon:** Install globally using `npm install -g nodemon`.
- **Concurrently:** Install globally using `npm install -g concurrently`.
- **Apache Kafka:** Follow the [Kafka Quickstart guide](https://kafka.apache.org/quickstart) for installation.
- **Redis:** Follow the [Redis installation documentation](https://redis.io/docs/install/install-redis).

## Setup ⚙️

1. Clone the repository:

   ```bash
   git clone https://github.com/rohitvpatil0810/log-ingestor-and-query-interface.git
   ```

2. Install dependencies:

   ```bash
   cd log-ingestor-and-query-interface/backend
   npm install

   cd ../frontend
   npm install
   ```

3. Configure environment variables:

- For the backend, create a config.env file in the backend directory with the following content:

  ```bash
  MONGODB_URI=mongodb://<username>:<password>@localhost:27017/log-data
  PORT=3000
  ```

- For the frontend, create a .env file in the frontend directory with the following content:

  ```bash
  REACT_APP_API_URL=http://localhost:3000
  PORT=5000
  ```

4. Start the application:

   ```bash
   npm run start:dev
   ```

## Log Ingestion Script 📤

To ingest logs, you can use the following `curl` script:

```
curl --location 'http://localhost:3000/logs/' \
    --header 'Content-Type: application/json' \
    --data '{
        "level": "error",
        "message": "Server timeout",
        "resourceId": "server-9876",
        "timestamp": "2023-09-16T16:45:00Z",
        "traceId": "vwx-yzab-789",
        "spanId": "span-012",
        "commit": "e4f5g6h",
        "metadata": {
        "parentResourceId": "server-7654"
        }
    }'
```

## Usage 🚀

- Access the log ingestor and query interface at [http://localhost:5000](http://localhost:5000/).
- Ingest logs over HTTP and explore the powerful log search capabilities.

**Developed by Rohit Patil | [GitHub](https://github.com/rohitvpatil0810)**

Feel free to customize it further based on your project's specific needs!
