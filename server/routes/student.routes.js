const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, getJobs, applyToJob, getApplicationHistory } = require('../controllers/student.controller');
const { verifyToken: protect } = require('../middlewares/auth.middleware');
const { verifyRole } = require('../middlewares/role.middleware');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Endpoints del módulo de estudiantes
 */

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
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan.perez@usta.edu.co
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Estudiante registrado correctamente
 *       400:
 *         description: El email ya está registrado
 *       500:
 *         description: Error del servidor
 */
router.post('/register', register);

/**
 * @swagger
 * /api/students/login:
 *   post:
 *     summary: Iniciar sesión como estudiante
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan.perez@usta.edu.co
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login correcto, devuelve token JWT
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 */
router.post('/login', login);

/**
 * @swagger
 * /api/students/profile:
 *   get:
 *     summary: Ver perfil del estudiante autenticado
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes rol de estudiante
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/profile', protect, verifyRole('student'), getProfile);

/**
 * @swagger
 * /api/students/profile:
 *   put:
 *     summary: Editar perfil del estudiante autenticado
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               career:
 *                 type: string
 *               semester:
 *                 type: number
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               cvLink:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes rol de estudiante
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/profile', protect, verifyRole('student'), updateProfile);

/**
 * @swagger
 * /api/students/jobs:
 *   get:
 *     summary: Ver ofertas de trabajo activas con filtros opcionales
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filtrar por ciudad
 *       - in: query
 *         name: modality
 *         schema:
 *           type: string
 *           enum: [Presencial, Remoto, Hibrido]
 *         description: Filtrar por modalidad
 *       - in: query
 *         name: contractType
 *         schema:
 *           type: string
 *           enum: [Tiempo completo, Medio tiempo, Contrato temporal]
 *         description: Filtrar por tipo de contrato
 *       - in: query
 *         name: salaryCurrency
 *         schema:
 *           type: string
 *           enum: [COP, USD, EUR]
 *         description: Filtrar por moneda del salario
 *     responses:
 *       200:
 *         description: Lista de ofertas activas
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes rol de estudiante
 *       500:
 *         description: Error del servidor
 */
router.get('/jobs', protect, verifyRole('student'), getJobs);

/**
 * @swagger
 * /api/students/apply:
 *   post:
 *     summary: Aplicar a una oferta de trabajo
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [jobOfferId]
 *             properties:
 *               jobOfferId:
 *                 type: string
 *                 example: 65f1a7c6e4b0a2f3c4d5e6f7
 *               coverLetter:
 *                 type: string
 *                 example: Me interesa esta oferta porque...
 *     responses:
 *       201:
 *         description: Aplicación creada correctamente
 *       400:
 *         description: Ya aplicaste a esta oferta o la oferta no está disponible
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes rol de estudiante
 *       404:
 *         description: Oferta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.post('/apply', protect, verifyRole('student'), applyToJob);

/**
 * @swagger
 * /api/students/history:
 *   get:
 *     summary: Ver historial de aplicaciones del estudiante autenticado
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial de aplicaciones obtenido correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes rol de estudiante
 *       500:
 *         description: Error del servidor
 */
router.get('/history', protect, verifyRole('student'), getApplicationHistory);

module.exports = router;