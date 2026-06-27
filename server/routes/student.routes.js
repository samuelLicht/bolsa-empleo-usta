const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, getJobs, applyToJob } = require('../controllers/student.controller');
const { verifyToken: protect } = require('../middlewares/auth.middleware');
const { verifyRole } = require('../middlewares/role.middleware');

// Rutas públicas — no requieren token
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas — requieren token JWT y rol estudiante
router.get('/profile', protect, verifyRole('student'), getProfile);
router.put('/profile', protect, verifyRole('student'), updateProfile);
router.get('/jobs', protect, verifyRole('student'), getJobs);
router.post('/apply', protect, verifyRole('student'), applyToJob);

module.exports = router;