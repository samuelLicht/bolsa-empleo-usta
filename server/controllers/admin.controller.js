const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Company = require('../models/Company');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    const admin = await Admin.create({ name, email, password });
    const token = generateToken(admin._id, 'admin');
    res.status(201).json({
      success: true,
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const token = generateToken(admin._id, 'admin');
    res.status(200).json({
      success: true,
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ status: 'Pendiente' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, total: companies.length, companies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { status: 'Aprobada', isVerified: true },
      { new: true }
    ).select('-password');
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { status: 'Rechazada', isVerified: false },
      { new: true }
    ).select('-password');
    if (!company) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }
    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getPendingCompanies, approveCompany, rejectCompany };