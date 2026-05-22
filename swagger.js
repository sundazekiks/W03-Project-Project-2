const swaggerAutogen = require('swagger-autogen');


const doc = {
    info: {
        title: 'CSE341 API',
        description: 'API for CSE341 project'
    },
    host: 'localhost:8081',
    schemes: ['http', 'https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);