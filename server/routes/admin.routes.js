const express = require('express');
const router = express.Router();
const { register, login, getPendingCompanies, approveCompany, rejectCompany } = require('../controllers/admin.controller');
const { verifyToken: protect } = require('../middlewares/auth.middleware');
const { verifyRole } = require('../middlewares/role.middleware');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Endpoints del módulo de administrador
 */

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Registrar un administrador
 *     tags: [Admin]
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
 *                 example: Admin USTA
 *               email:
 *                 type: string
 *                 example: admin@usta.edu.co
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Administrador registrado correctamente
 *       400:
 *         description: El email ya está registrado
 *       500:
 *         description: Error del servidor
 */
router.post('/register', register);

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     tags: [Admin]
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
 *                 example: admin@usta.edu.co
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
 * /api/admin/companies/pending:
 *   get:
 *     summary: Ver listado de empresas pendientes de aprobación
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de empresas pendientes
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes rol de administrador
 *       500:
 *         description: Error del servidor
 */
router.get('/companies/pending', protect, verifyRole('admin'), getPendingCompanies);

/**
 * @swagger
 * /api/admin/companies/{id}/approve:
 *   put:
 *     summary: Aprobar una empresa
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Empresa aprobada correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes rol de administrador
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/companies/:id/approve', protect, verifyRole('admin'), approveCompany);

/**
 * @swagger
 * /api/admin/companies/{id}/reject:
 *   put:
 *     summary: Rechazar una empresa
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Empresa rechazada correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No tienes rol de administrador
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/companies/:id/reject', protect, verifyRole('admin'), rejectCompany);

module.exports = router;