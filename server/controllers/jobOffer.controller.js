//! aca van como tal todas las fucniones que nos ofrece el modelo 
const JobOffer = require('../models/JobOffer');


//* Crear una nueva oferta de trabajo */
const createJobOffer = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      modality,
      contractType,
      salaryCurrency,
      status,
    } = req.body;

    const jobOffer = await JobOffer.create({
      title,
      description,
      requirements,
      salary,
      location,
      modality,
      contractType,
      salaryCurrency,
      status,
      company: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Oferta de trabajo creada correctamente',
      jobOffer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateJobOffer = async (req, res) => {
  try {
    const jobOffer = await JobOffer.findById(req.params.id);

    if (!jobOffer) {
      return res.status(404).json({
        message: 'Oferta no encontrada',
      });
    }

    // Verificar si la oferta de trabajo pertenece a la empresa autenticada
    if (jobOffer.company.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'No tienes permisos para editar esta oferta',
      });
    }

    const updatedJobOffer = await JobOffer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Oferta actualizada correctamente',
      jobOffer: updatedJobOffer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteJobOffer = async (req, res) => {
  try {
    const jobOffer = await JobOffer.findById(req.params.id);

    if (!jobOffer) {
      return res.status(404).json({
        message: 'Oferta no encontrada',
      });
    }

    // osea que aca comapra lso dos id el de el logueado y el de la oferta de trabajo para ver si son iguales y asi poder eliminarla
    if (jobOffer.company.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'No tienes permisos para eliminar esta oferta',
      });
    }

    await JobOffer.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Oferta eliminada correctamente',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJobOffer,
  updateJobOffer,
  deleteJobOffer,
};
