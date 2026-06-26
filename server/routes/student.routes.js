const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/student.controller');
const { verifyToken: protect } = require('../middlewares/auth.middleware');
const { verifyRole } = require('../middlewares/role.middleware');

// Rutas públicas — no requieren token
/**
 * @swagger
 * /api/students/register:
 *   post:
 *     summary: Registrar un estudiante
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Perez
 *               email:
 *                 type: string
 *                 example: juan.perez@usta.edu.co
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Estudiante registrado correctamente
 *       400:
 *         description: El email ya esta registrado
 *       500:
 *         description: Error del servidor
 */
router.post('/register', register);

/**
 * @swagger
 * /api/students/login:
 *   post:
 *     summary: Iniciar sesion como estudiante
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan.perez@usta.edu.co
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login correcto
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 */
router.post('/login', login);

// Rutas protegidas — requieren token JWT y rol estudiante
router.get('/profile', protect, verifyRole('student'), getProfile);
router.put('/profile', protect, verifyRole('student'), updateProfile);

module.exports = router;
