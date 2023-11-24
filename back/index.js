import express, { json } from 'express';
import { createPool } from 'mysql2/promise';
import userRoutes from './routes/users.js';
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import path from "path";
import cors from 'cors';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node Swagger API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

const app = express();
const PORT = 5000;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users',
};

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

// Initialize the MySQL connection pool
export const pool = createPool(dbConfig);

// Test the database connection
pool.getConnection()
  .then((connection) => {
    console.log('Connected to the database');
    connection.release();
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



