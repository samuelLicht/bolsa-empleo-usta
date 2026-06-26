

const Company = require('../models/Company');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');

//*generar token JWT el id y el rol() empresa)
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

//* Registrar una nueva empresa
const registerCompany = async (req, res) => {
    try {
        const {companyName, companyLogo, nit, email, password, phone, sector, city, website, companyDescription, companyType, companySize, isVerified } = req.body;
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
             return res.status(400).json({ message: 'El email ya está registrado' });
        }
        const company = await Company.create({companyName, companyLogo, nit, email, password, phone, sector, city, website, companyDescription, companyType, companySize, isVerified });
        const token = generateToken(company._id, 'company');
        res.status(201).json({ token, company });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

//* Login de empresa
const loginCompany = async (req, res) => {
    try {
        const { email, password } = req.body;
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        const isMatch = await company.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        const token = generateToken(company._id, 'company');
        res.json({ token, company });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//* Obtener todas las empresas
const getCompanies = async (req, res) => {
     try {
        const companies = await Company.find();
        res.status(200).json({ companies });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//* Obetener una empresa 
const getCompanyProfile = async (req, res) => {
    try {
        const company = await Company.findById(req.user.id).select('-password');
        if (!company) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.status(200).json({ company });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//* actualizar una empresa
const updateCompanyProfile = async (req, res) => {
  try {
    const allowedFields = [
      'companyName',
      'companyLogo',
      'phone',
      'sector',
      'city',
      'website',
      'companyDescription',
      'companyType',
      'companySize'
    ];

    const updates = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const company = await Company.findByIdAndUpdate(
      req.user.id,
      updates,
      {
        returnDocument: 'after',
        runValidators: true
      }
    ).select('-password');

    if (!company) {
      return res.status(404).json({
        message: 'Empresa no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Perfil de empresa actualizado correctamente',
      company
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



module.exports = {
  registerCompany,
  loginCompany,
  getCompanies,
  getCompanyProfile,
  updateCompanyProfile
};
