const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const { run } = require('./db/mongodb');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');
const personRoute = require('./routes/person.route');
config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/person', personRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// error handlers



app.get('/', (req, res) => {
    res.send('Hello World!');
});


async function startServer() {
    try {
        console.log('Connecting to MongoDB...');
        await run();
        console.log('Connected to MongoDB!');

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    } catch (err) {
        console.error(err);
    }
}

startServer();
