const express = require('express');
const router = express.Router();
const {
  createJobOffer,
  updateJobOffer,
  deleteJobOffer,
} = require('../controllers/jobOffer.controller');
const { verifyToken: protect } = require('../middlewares/auth.middleware');
const { verifyRole } = require('../middlewares/role.middleware');

/**
 * @swagger
 * /api/job-offers:
 *   post:
 *     summary: Publicar una oferta laboral
 *     tags: [JobOffers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobOfferCreate'
 *     responses:
 *       201:
 *         description: Oferta de trabajo creada correctamente
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
 *                   example: Oferta de trabajo creada correctamente
 *                 jobOffer:
 *                   $ref: '#/components/schemas/JobOffer'
 *       401:
 *         description: Token no proporcionado, invalido o expirado
 *       403:
 *         description: El usuario autenticado no tiene rol de empresa
 *       500:
 *         description: Error del servidor
 */
router.post('/', protect, verifyRole('company'), createJobOffer);

/**
 * @swagger
 * /api/job-offers/{id}:
 *   put:
 *     summary: Editar una oferta laboral
 *     tags: [JobOffers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la oferta laboral
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobOfferUpdate'
 *     responses:
 *       200:
 *         description: Oferta actualizada correctamente
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
 *                   example: Oferta actualizada correctamente
 *                 jobOffer:
 *                   $ref: '#/components/schemas/JobOffer'
 *       401:
 *         description: Token no proporcionado, invalido o expirado
 *       403:
 *         description: No tienes permisos para editar esta oferta
 *       404:
 *         description: Oferta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', protect, verifyRole('company'), updateJobOffer);

/**
 * @swagger
 * /api/job-offers/{id}:
 *   delete:
 *     summary: Eliminar una oferta laboral
 *     tags: [JobOffers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la oferta laboral
 *     responses:
 *       200:
 *         description: Oferta eliminada correctamente
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
 *                   example: Oferta eliminada correctamente
 *       401:
 *         description: Token no proporcionado, invalido o expirado
 *       403:
 *         description: No tienes permisos para eliminar esta oferta
 *       404:
 *         description: Oferta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', protect, verifyRole('company'), deleteJobOffer);

module.exports = router;
