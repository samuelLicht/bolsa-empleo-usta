const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65f1a7c6e4b0a2f3c4d5e6f7
 *         name:
 *           type: string
 *           example: Juan Perez
 *         email:
 *           type: string
 *           format: email
 *           example: juan.perez@usta.edu.co
 *         birthDate:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: 2000-05-20
 *         photo:
 *           type: string
 *           nullable: true
 *           example: https://usta.edu.co/foto.png
 *         career:
 *           type: string
 *           example: Ingeniería de Sistemas
 *         semester:
 *           type: number
 *           minimum: 1
 *           maximum: 10
 *           example: 7
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: [JavaScript, Node.js, MongoDB]
 *         description:
 *           type: string
 *           example: Estudiante interesado en desarrollo backend
 *         cvLink:
 *           type: string
 *           nullable: true
 *           example: https://usta.edu.co/cv.pdf
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     StudentUpdateProfile:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Juan Perez
 *         birthDate:
 *           type: string
 *           format: date
 *           example: 2000-05-20
 *         photo:
 *           type: string
 *           nullable: true
 *           example: https://usta.edu.co/nueva-foto.png
 *         career:
 *           type: string
 *           example: Ingeniería de Sistemas
 *         semester:
 *           type: number
 *           minimum: 1
 *           maximum: 10
 *           example: 8
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: [JavaScript, Node.js, MongoDB]
 *         description:
 *           type: string
 *           example: Estudiante interesado en desarrollo backend
 *         cvLink:
 *           type: string
 *           nullable: true
 *           example: https://usta.edu.co/cv.pdf
 */
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener mínimo 6 caracteres'],
    },
    birthDate: { type: Date },
    photo: { type: String, default: null },
    career: { type: String, trim: true },
    semester: { type: Number, min: 1, max: 10 },
    skills: { type: [String], default: [] },
    description: { type: String, trim: true },
    cvLink: { type: String, default: null },
  },
  { timestamps: true }
);

// Hashear contraseña antes de guardar
studentSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Comparar contraseñas
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Student', studentSchema);