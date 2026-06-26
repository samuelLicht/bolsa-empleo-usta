const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65f1a7c6e4b0a2f3c4d5e6f7
 *         companyName:
 *           type: string
 *           example: Tech USTA
 *         companyLogo:
 *           type: string
 *           nullable: true
 *           example: https://techusta.com/logo.png
 *         nit:
 *           type: string
 *           example: 900123456-7
 *         email:
 *           type: string
 *           format: email
 *           example: contacto@techusta.com
 *         phone:
 *           type: string
 *           example: "3001234567"
 *         sector:
 *           type: string
 *           example: Tecnología
 *         city:
 *           type: string
 *           example: Bogota
 *         website:
 *           type: string
 *           example: https://techusta.com
 *         companyDescription:
 *           type: string
 *           example: Empresa de desarrollo de software
 *         companyType:
 *           type: string
 *           example: Privada
 *         companySize:
 *           type: string
 *           example: 11-50
 *         isVerified:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CompanyRegister:
 *       type: object
 *       required:
 *         - companyName
 *         - nit
 *         - email
 *         - password
 *       properties:
 *         companyName:
 *           type: string
 *           example: Tech USTA
 *         companyLogo:
 *           type: string
 *           nullable: true
 *           example: https://techusta.com/logo.png
 *         nit:
 *           type: string
 *           example: 900123456-7
 *         email:
 *           type: string
 *           format: email
 *           example: contacto@techusta.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: 123456
 *         phone:
 *           type: string
 *           example: "3001234567"
 *         sector:
 *           type: string
 *           enum:
 *             - Tecnología
 *             - Salud
 *             - Educación
 *             - Financiero
 *             - Industrial
 *             - Comercio
 *             - Construcción
 *             - Transporte
 *             - Agropecuario
 *             - Otro
 *           example: Tecnología
 *         city:
 *           type: string
 *           example: Bogota
 *         website:
 *           type: string
 *           example: https://techusta.com
 *         companyDescription:
 *           type: string
 *           example: Empresa de desarrollo de software
 *         companyType:
 *           type: string
 *           enum:
 *             - Privada
 *             - Pública
 *             - Mixta
 *             - Otro
 *           example: Privada
 *         companySize:
 *           type: string
 *           enum:
 *             - 1-10
 *             - 11-50
 *             - 51-200
 *             - 201-500
 *             - 501-1000
 *             - 1001+
 *           example: 11-50
 *         isVerified:
 *           type: boolean
 *           example: false
 *     CompanyLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: contacto@techusta.com
 *         password:
 *           type: string
 *           example: 123456
 *     CompanyUpdateProfile:
 *       type: object
 *       properties:
 *         companyName:
 *           type: string
 *           example: Tech USTA Actualizada
 *         companyLogo:
 *           type: string
 *           nullable: true
 *           example: https://techusta.com/nuevo-logo.png
 *         phone:
 *           type: string
 *           example: "3019876543"
 *         sector:
 *           type: string
 *           enum:
 *             - TecnologÃ­a
 *             - Salud
 *             - EducaciÃ³n
 *             - Financiero
 *             - Industrial
 *             - Comercio
 *             - ConstrucciÃ³n
 *             - Transporte
 *             - Agropecuario
 *             - Otro
 *           example: TecnologÃ­a
 *         city:
 *           type: string
 *           example: Bogota
 *         website:
 *           type: string
 *           example: https://techusta.com
 *         companyDescription:
 *           type: string
 *           example: Empresa especializada en desarrollo de software y consultoria TI
 *         companyType:
 *           type: string
 *           enum:
 *             - Privada
 *             - PÃºblica
 *             - Mixta
 *             - Otro
 *           example: Privada
 *         companySize:
 *           type: string
 *           enum:
 *             - 1-10
 *             - 11-50
 *             - 51-200
 *             - 201-500
 *             - 501-1000
 *             - 1001+
 *           example: 11-50
 *     CompanyAuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         company:
 *           type: object
 */
const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: [true, 'El nombre de la empresa es obligatorio'],  
            trim: true,
        },
        companyLogo:{
            type: String,
            default: null,
        },
        nit:{
            type: String,
            required: [true, 'El NIT es obligatorio'],
            unique: true,
            trim: true,
        }, 
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true,
            lowercase: true,
            trim: true,
        } ,
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'], 
            minlength: [6, 'La contraseña debe tener mínimo 6 caracteres'],                
        },
        phone: {
            type: String,
            trim: true,
        },
        sector: {
            type: String,
                enum: [
                    "Tecnología",
                    "Salud",
                    "Educación",
                    "Financiero",
                    "Industrial",
                    "Comercio",
                    "Construcción",
                    "Transporte",
                    "Agropecuario",
                    "Otro"
                ],
        },
        city: {
            type: String,
            trim: true,
        },
        website: {
            type: String,
            trim: true, 
        },
        companyDescription: {
            type: String,
            trim: true,
        },
        companyType: {
            type: String,
            enum: ["Privada", "Pública", "Mixta","Otro"],   
        },
        companySize: {
            type: String,
            enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001+"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true}
);



    //* Hashear contraseña antes de guardar
    /*{
            "email": "google@gmail.com",
            "password": "123456" pero esta funcion alamcena algo como $2b$10$J7T0mH7Qm7Nw...
    }*/

companySchema.pre('save', async function () {
    if (!this.isModified('password')) return; 
    this.password = await bcrypt.hash(this.password, 10); 
});






    //* Comparar contraseñas con la de ingreso 
    //!como nos e peude utilizar como que compare la que entre con al que esta en la base de datos

companySchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Company', companySchema);
