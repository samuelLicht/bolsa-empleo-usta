const express = require('express');
const router = express.Router();
const { registerCompany, loginCompany, getCompanies } = require('../controllers/company.controller');

//*Rutas públicas 
/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Obtener todas las empresas
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Lista de empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 companies:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *       500:
 *         description: Error del servidor
 */
router.get('/', getCompanies);

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

module.exports = router;
