// Verificar rol del usuario autenticado
const verifyRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Acceso denegado. No autenticado' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Acceso denegado. No tienes permisos para esta acción' 
      });
    }

    next();
  };
};

module.exports = { verifyRole };