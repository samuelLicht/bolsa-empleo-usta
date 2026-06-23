const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    const student = await Student.create({ name, email, password });
    const token = generateToken(student._id, 'student');
    res.status(201).json({
      success: true,
      token,
      student: { id: student._id, name: student.name, email: student.email },
    });
  } catch (error) {
  res.status(500).json({ message: error.message });
}
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const token = generateToken(student._id, 'student');
    res.status(200).json({
      success: true,
      token,
      student: { id: student._id, name: student.name, email: student.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };