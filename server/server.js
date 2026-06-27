const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const swaggerSpec = require('./config/swagger');
require('./config/env');

// Importar middlewares
const { errorHandler, notFound } = require('./middlewares/error.middleware');

const app = express();

// Conexión a la base de datos
connectDB();

// Middlewares base
app.use(cors());
app.use(express.json());

// Documentacion Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas (se descomentan conforme se desarrollan)
app.use('/api/students', require('./routes/student.routes'));
app.use('/api/companies', require('./routes/company.routes'));
app.use('/api/job-offers', require('./routes/jobOffer.routes'));
// app.use('/api/applications', require('./routes/application.routes'));
// app.use('/api/admin', require('./routes/admin.routes'));

// Ruta base

app.get('/', (req, res) => {
  res.json({ message: 'Bolsa de Empleo USTA API' });
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

// Middlewares de manejo de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});

module.exports = app;
