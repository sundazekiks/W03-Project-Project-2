const swaggerAutogen = require('swagger-autogen');
const { config } = require('dotenv');

config();

const host = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_HOST : 'localhost:8081';

const doc = {
    info: {
        title: 'CSE341 API',
        description: 'API for CSE341 project'
    },
    host: host,
    schemes: ['http', 'https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);