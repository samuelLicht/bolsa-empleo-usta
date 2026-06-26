const express = require('express');
const router = express.Router();
const { registerCompany, loginCompany, getCompanyProfile,  updateCompanyProfile} = require('../controllers/company.controller');
const { verifyToken: protect } = require('../middlewares/auth.middleware');
const { verifyRole } = require('../middlewares/role.middleware');


//*Rutas públicas 
/**
 * @swagger
 * /api/companies/register:
 *   post:
 *     summary: Registrar una empresa
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyRegister'
 *     responses:
 *       201:
 *         description: Empresa registrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyAuthResponse'
 *       400:
 *         description: El email ya esta registrado
 *       500:
 *         description: Error del servidor
 */
router.post('/register', registerCompany);

/**
 * @swagger
 * /api/companies/login:
 *   post:
 *     summary: Iniciar sesion como empresa
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyLogin'
 *     responses:
 *       200:
 *         description: Login correcto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyAuthResponse'
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 */
router.post('/login', loginCompany);

/**
 * @swagger
 * /api/companies/profile:
 *   get:
 *     summary: Ver perfil de la empresa autenticada
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil de empresa obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *       401:
 *         description: Token no proporcionado, invalido o expirado
 *       403:
 *         description: El usuario autenticado no tiene rol de empresa
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/profile', protect, verifyRole('company'), getCompanyProfile);

/**
 * @swagger
 * /api/companies/profile:
 *   put:
 *     summary: Editar perfil de la empresa autenticada
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyUpdateProfile'
 *     responses:
 *       200:
 *         description: Perfil de empresa actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Perfil de empresa actualizado correctamente
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *       401:
 *         description: Token no proporcionado, invalido o expirado
 *       403:
 *         description: El usuario autenticado no tiene rol de empresa
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/profile', protect, verifyRole('company'), updateCompanyProfile);

module.exports = router;
