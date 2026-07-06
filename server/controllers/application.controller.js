const Application = require('../models/Application');

const ALLOWED_DECISIONS = ['Aceptado', 'Rechazado'];

const decideApplication = async (req, res) => {
  try {
    const { id: applicationId } = req.params;
    const { status } = req.body;

    if (!ALLOWED_DECISIONS.includes(status)) {
      return res.status(400).json({
        message: 'Estado invalido. Debe ser Aceptado o Rechazado',
      });
    }

    const application = await Application.findById(applicationId).populate('jobOffer');

    if (!application) {
      return res.status(404).json({
        message: 'Aplicacion no encontrada',
      });
    }

    if (!application.jobOffer) {
      return res.status(404).json({
        message: 'La oferta asociada a esta aplicacion no existe',
      });
    }

    const jobOfferCompanyId = application.jobOffer.company.toString();

    if (jobOfferCompanyId !== req.user.id) {
      return res.status(403).json({
        message: 'No tienes permisos para modificar esta aplicacion',
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Aplicacion ${status.toLowerCase()} correctamente`,
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  decideApplication,
};
