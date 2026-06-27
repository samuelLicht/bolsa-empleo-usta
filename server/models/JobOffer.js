const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     JobOffer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65f1a7c6e4b0a2f3c4d5e6f7
 *         title:
 *           type: string
 *           example: Desarrollador Frontend Junior
 *         description:
 *           type: string
 *           example: Apoyo en el desarrollo de interfaces web para plataformas internas.
 *         requirements:
 *           type: string
 *           example: React, JavaScript, CSS
 *         salary:
 *           type: number
 *           example: 1300000
 *         location:
 *           type: string
 *           example: Bogota
 *         modality:
 *           type: string
 *           enum: [Presencial, Remoto, Hibrido]
 *           example: Hibrido
 *         contractType:
 *           type: string
 *           enum: [Tiempo completo, Medio tiempo, Contrato temporal]
 *           example: Contrato temporal
 *         salaryCurrency:
 *           type: string
 *           enum: [COP, USD, EUR]
 *           example: COP
 *         status:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           example: Activo
 *         company:
 *           type: string
 *           example: 65f1a7c6e4b0a2f3c4d5e6f7
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     JobOfferCreate:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - requirements
 *         - location
 *         - modality
 *         - contractType
 *         - salaryCurrency
 *       properties:
 *         title:
 *           type: string
 *           example: Desarrollador Frontend Junior
 *         description:
 *           type: string
 *           example: Apoyo en el desarrollo de interfaces web para plataformas internas.
 *         requirements:
 *           type: string
 *           example: React, JavaScript, CSS
 *         salary:
 *           type: number
 *           example: 1300000
 *         location:
 *           type: string
 *           example: Bogota
 *         modality:
 *           type: string
 *           enum: [Presencial, Remoto, Hibrido]
 *           example: Hibrido
 *         contractType:
 *           type: string
 *           enum: [Tiempo completo, Medio tiempo, Contrato temporal]
 *           example: Contrato temporal
 *         salaryCurrency:
 *           type: string
 *           enum: [COP, USD, EUR]
 *           example: COP
 *         status:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           example: Activo
 *     JobOfferUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Desarrollador Frontend Junior Actualizado
 *         description:
 *           type: string
 *           example: Apoyo en desarrollo frontend con React.
 *         requirements:
 *           type: string
 *           example: React, JavaScript, CSS, Git
 *         salary:
 *           type: number
 *           example: 1500000
 *         location:
 *           type: string
 *           example: Bogota
 *         modality:
 *           type: string
 *           enum: [Presencial, Remoto, Hibrido]
 *           example: Remoto
 *         contractType:
 *           type: string
 *           enum: [Tiempo completo, Medio tiempo, Contrato temporal]
 *           example: Medio tiempo
 *         salaryCurrency:
 *           type: string
 *           enum: [COP, USD, EUR]
 *           example: COP
 *         status:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           example: Inactivo
 */
const jobOfferSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    requirements: { type: String, required: true, trim: true },
    salary: { type: Number, min: 0 },
    location: { type: String, required: true, trim: true },
    modality: {
      type: String,
      enum: ['Presencial', 'Remoto', 'Hibrido'],
      required: [true, 'La modalidad es obligatoria'],
    },
    contractType: {
      type: String,
      enum: ['Tiempo completo', 'Medio tiempo', 'Contrato temporal'],
      required: [true, 'El tipo de contrato es obligatorio'],
    },
    salaryCurrency: {
      type: String,
      enum: ['COP', 'USD', 'EUR'],
      required: [true, 'La moneda del salario es obligatoria'],
    },
    status: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('JobOffer', jobOfferSchema);
