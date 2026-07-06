const express = require('express');
const router = express.Router();
const { decideApplication } = require('../controllers/application.controller');
const { verifyToken: protect } = require('../middlewares/auth.middleware');
const { verifyRole } = require('../middlewares/role.middleware');

/**
 * @swagger
 * /api/applications/{id}/status:
 *   patch:
 *     summary: Aceptar o rechazar una aplicacion
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la aplicacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Aceptado, Rechazado]
 *                 example: Aceptado
 *     responses:
 *       200:
 *         description: Aplicacion actualizada correctamente
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
 *                   example: Aplicacion aceptado correctamente
 *                 application:
 *                   type: object
 *       400:
 *         description: Estado invalido
 *       401:
 *         description: Token no proporcionado, invalido o expirado
 *       403:
 *         description: No tienes permisos para modificar esta aplicacion
 *       404:
 *         description: Aplicacion no encontrada
 *       500:
 *         description: Error del servidor
 */
router.patch('/:id/status', protect, verifyRole('company'), decideApplication);

module.exports = router;
