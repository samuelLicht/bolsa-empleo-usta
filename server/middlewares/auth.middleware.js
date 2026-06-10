const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

// Verificar token JWT
const verifyToken = (req, res, next) => {
  try {
    // Obtener el token del header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        message: 'Acceso denegado. Token no proporcionado' 
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ 
      message: 'Token inválido o expirado' 
    });
  }
};

module.exports = { verifyToken };