const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bolsa de Empleo USTA API',
      version: '1.0.0',
      description: 'Documentacion de endpoints para estudiantes y empresas.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    path.join(__dirname, '../routes/*.js').replace(/\\/g, '/'),
    path.join(__dirname, '../models/*.js').replace(/\\/g, '/'),
  ],
};

module.exports = swaggerJsdoc(swaggerOptions);
