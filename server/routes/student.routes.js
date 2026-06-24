const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/student.controller');
const { verifyToken: protect } = require('../middlewares/auth.middleware');

// Rutas públicas — no requieren token
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas — requieren token JWT
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;