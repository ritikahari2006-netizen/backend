
const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const cors = require('cors');

const app = express();

app.set("view engine", "ejs");

const indexRouter = require('./Routes/index.js');

const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use('/', indexRouter);


// ================= SWAGGER CONFIGURATION =================

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "My Node.js API",
            version: "1.0.0",
            description: "API documentation for my Node.js project"
        },

        servers: [
            {
                url: "https://backend-1-di3j.onrender.com"
            }
        ]
    },

    apis: ["./Routes/*.js"]
};


// Generate Swagger documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);


// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ================= SERVER =================

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger is running at /api-docs`);
});