const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('./config/env');

// Importar middlewares
const { errorHandler, notFound } = require('./middlewares/error.middleware');

const app = express();

// Conexión a la base de datos
connectDB();

// Middlewares base
app.use(cors());
app.use(express.json());

// Rutas (se descomentan conforme se desarrollan)
app.use('/api/students', require('./routes/student.routes'));
// app.use('/api/companies', require('./routes/company.routes'));
// app.use('/api/jobs', require('./routes/job.routes'));
// app.use('/api/applications', require('./routes/application.routes'));
// app.use('/api/admin', require('./routes/admin.routes'));

// Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'Bolsa de Empleo USTA API' });
});

// Middlewares de manejo de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;