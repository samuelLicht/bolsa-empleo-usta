const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    jobOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobOffer',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pendiente', 'Aceptado', 'Rechazado'],
      default: 'Pendiente',
    },
    coverLetter: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Un estudiante no puede aplicar dos veces a la misma oferta
applicationSchema.index({ student: 1, jobOffer: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);