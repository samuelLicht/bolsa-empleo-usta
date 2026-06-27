const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const JobOffer = require('../models/JobOffer');
const Application = require('../models/Application');
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

const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const allowedFields = ['name', 'birthDate', 'photo', 'career', 'semester', 'skills', 'description', 'cvLink'];
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
    const student = await Student.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const { location, modality, contractType, salaryCurrency } = req.query;

    const filter = { status: 'Activo' };

    if (location) filter.location = { $regex: location, $options: 'i' };
    if (modality) filter.modality = modality;
    if (contractType) filter.contractType = contractType;
    if (salaryCurrency) filter.salaryCurrency = salaryCurrency;

    const jobs = await JobOffer.find(filter)
      .populate('company', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, total: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const applyToJob = async (req, res) => {
  try {
    const { jobOfferId, coverLetter } = req.body;

    const jobOffer = await JobOffer.findById(jobOfferId);
    if (!jobOffer) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }
    if (jobOffer.status !== 'Activo') {
      return res.status(400).json({ message: 'La oferta no está disponible' });
    }

    const application = await Application.create({
      student: req.user.id,
      jobOffer: jobOfferId,
      coverLetter,
    });

    res.status(201).json({ success: true, application });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ya aplicaste a esta oferta' });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getProfile, updateProfile, getJobs, applyToJob };