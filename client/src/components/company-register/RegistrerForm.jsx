import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import blueShape from "../../assets/login/decorations/blueShape.png"
import logo from "../../assets/login/logo/mascot.png"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Globe,
  IdCardIcon,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"

const initialFormData = {
  companyName: "",
  companyLogo: "",
  nit: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
  phone: "",
  sector: "",
  city: "",
  website: "",
  companyDescription: "",
  companyType: "",
  companySize: "",
}

const stepFields = {
  1: ["companyName", "nit", "email", "password", "confirmPassword", "termsAccepted"],
  2: ["phone", "sector", "city"],
  3: ["companyDescription", "companyType", "companySize"],
}

const steps = [
  { id: 1, label: "Empresa", icon: Building2 },
  { id: 2, label: "Contacto", icon: Phone },
  { id: 3, label: "Perfil", icon: IdCardIcon },
]

const requiredFields = Object.values(stepFields).flat()

const sectorOptions = [
  "Tecnología",
  "Salud",
  "Educación",
  "Financiero",
  "Industrial",
  "Comercio",
  "Construcción",
  "Transporte",
  "Agropecuario",
  "Otro",
]

const companyTypeOptions = ["Privada", "Pública", "Mixta", "Otro"]

const companySizeOptions = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001+"]

function RegistrerForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => validateForm(formData), [formData])
  const completedFields = requiredFields.filter((field) => {
    const value = formData[field]

    if (typeof value === "boolean") return value
    return String(value ?? "").trim().length > 0 && !errors[field]
  }).length
  const completionPercentage = Math.round((completedFields / requiredFields.length) * 100)

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleBlur = (event) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [event.target.name]: true,
    }))
  }

  const markStepAsTouched = (step) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      ...Object.fromEntries(stepFields[step].map((field) => [field, true])),
    }))
  }

  const isStepValid = (step) => stepFields[step].every((field) => !errors[field])

  const goNext = () => {
    markStepAsTouched(currentStep)
    if (!isStepValid(currentStep)) return
    setCurrentStep((step) => Math.min(step + 1, 3))
  }

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 1))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    markStepAsTouched(currentStep)
    if (!isStepValid(currentStep)) return
    const companyPayload = { ...formData }
    delete companyPayload.confirmPassword
    console.log("Empresa lista para registrar:", companyPayload)
  }

  const getFieldError = (name) => (touched[name] || submitted ? errors[name] : "")

  return (
    <form className="mx-auto w-full" onSubmit={handleSubmit} noValidate>
      <header className="mb-3 lg:mb-2">
        <div className="mb-1 flex items-center gap-2">
          <img className="h-7 lg:h-5" src={blueShape} alt="Shape" />
          <p className="mb-1 text-xs font-bold text-cyan-500 sm:text-sm lg:text-sm">
            Portal empresarial
          </p>
        </div>

        <h1 className="text-3xl font-bold leading-tight text-[#00245c] sm:text-4xl lg:text-[1.6rem] xl:text-[1.85rem]">
          Registra tu empresa
        </h1>

        <p className="mt-1 text-base font-semibold text-cyan-500 sm:text-sm lg:text-[13px] xl:text-sm">
          Crea tu cuenta empresarial en pocos pasos
        </p>

        <div className="mt-2 h-1 w-12 rounded-full bg-yellow-400 sm:w-14" />
      </header>

      <StepNavigation
        completedFields={completedFields}
        completionPercentage={completionPercentage}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        totalFields={requiredFields.length}
      />

      {currentStep === 1 && (
        <div className="grid gap-2 md:grid-cols-2">
          <TextField error={getFieldError("companyName")} icon={Building2} label="Nombre de la empresa" name="companyName" onBlur={handleBlur} onChange={handleChange} placeholder="Nombre de la empresa" value={formData.companyName} />
          <TextField error={getFieldError("nit")} icon={IdCardIcon} label="NIT" name="nit" onBlur={handleBlur} onChange={handleChange} placeholder="NIT de la empresa" value={formData.nit} />
          <TextField error={getFieldError("email")} icon={Mail} label="Correo institucional" name="email" onBlur={handleBlur} onChange={handleChange} placeholder="nombre@empresa.com" type="email" value={formData.email} />
          <TextField required={false} error={getFieldError("companyLogo")} icon={Globe} label="Logo de la empresa" name="companyLogo" onBlur={handleBlur} onChange={handleChange} placeholder="URL del logo" value={formData.companyLogo} />
          <PasswordField error={getFieldError("password")} label="Contraseña" name="password" onBlur={handleBlur} onChange={handleChange} placeholder="Crea una contraseña" setVisible={setShowPassword} value={formData.password} visible={showPassword} />
          <PasswordField error={getFieldError("confirmPassword")} label="Confirmar contraseña" name="confirmPassword" onBlur={handleBlur} onChange={handleChange} placeholder="Confirma tu contraseña" setVisible={setShowConfirmPassword} value={formData.confirmPassword} visible={showConfirmPassword} />

          <div className="md:col-span-2">
            <div className="hidden">
              <img src={logo} alt="Mascota USTA" className="h-12 w-16" />
              <p className="text-xs text-[#00245c] sm:text-sm">Mínimo 6 caracteres</p>
            </div>

            <label className="flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-[#00245c]">
              <input checked={formData.termsAccepted} className="h-5 w-5 rounded border-blue-600 text-blue-600 focus:ring-blue-300 lg:h-4 lg:w-4" name="termsAccepted" onBlur={handleBlur} onChange={handleChange} type="checkbox" />
              Acepto los <span className="underline">términos y condiciones</span>
            </label>
            <FieldError message={getFieldError("termsAccepted")} />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="grid gap-3 md:grid-cols-2">
          <TextField error={getFieldError("phone")} icon={Phone} label="Teléfono" name="phone" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresa un número de contacto" value={formData.phone} />
          <SelectField error={getFieldError("sector")} label="Sector" name="sector" onBlur={handleBlur} onChange={handleChange} options={sectorOptions} value={formData.sector} />
          <TextField error={getFieldError("city")} icon={MapPin} label="Ciudad" name="city" onBlur={handleBlur} onChange={handleChange} placeholder="Ingresa la ciudad" value={formData.city} />
          <TextField required={false} error={getFieldError("website")} icon={Globe} label="Sitio web" name="website" onBlur={handleBlur} onChange={handleChange} placeholder="https://empresa.com" value={formData.website} />
        </div>
      )}

      {currentStep === 3 && (
        <div className="grid gap-3 md:grid-cols-2">
          <SelectField error={getFieldError("companyType")} label="Tipo de empresa" name="companyType" onBlur={handleBlur} onChange={handleChange} options={companyTypeOptions} value={formData.companyType} />
          <SelectField error={getFieldError("companySize")} label="Tamaño de empresa" name="companySize" onBlur={handleBlur} onChange={handleChange} options={companySizeOptions} value={formData.companySize} />

          <div className="md:col-span-2">
            <label htmlFor="companyDescription" className="mb-2 block text-sm font-bold text-[#00245c]">
              Descripción de la empresa <span className="text-red-500">*</span>
            </label>
            <textarea className={getInputClass(Boolean(getFieldError("companyDescription")))} id="companyDescription" name="companyDescription" onBlur={handleBlur} onChange={handleChange} placeholder="Cuéntanos brevemente qué hace tu empresa" value={formData.companyDescription} />
            <FieldError message={getFieldError("companyDescription")} />
          </div>
        </div>
      )}

      <footer className="mt-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          {currentStep > 1 && (
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-blue-600 px-6 font-semibold text-blue-700 transition hover:bg-blue-50 lg:h-10 lg:text-sm" onClick={goBack} type="button">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              Atrás
            </button>
          )}

          {currentStep < 3 ? (
            <button className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#003fc0] px-6 font-semibold text-white transition hover:bg-blue-700 lg:h-10 lg:text-sm" onClick={goNext} type="button">
              Continuar
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          ) : (
            <button className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#003fc0] px-6 font-semibold text-white transition hover:bg-blue-700 lg:h-10 lg:text-sm" type="submit">
              Registrar empresa
              <Check className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
         <p className="mt-3 text-center text-sm font-semibold text-[#00245c]">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/company/login" className="text-blue-700 underline">
            Inicia sesión
          </Link>
        </p>

        

        
      </footer>
    </form>
  )
}

function StepNavigation({ completedFields, completionPercentage, currentStep, onStepChange, totalFields }) {
  const activeStep = steps.find((step) => step.id === currentStep) ?? steps[0]

  return (
    <section className="mb-3">
      <div className="mb-2 rounded-2xl p-2 lg:p-1">
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <p className="text-sm font-black text-[#003fc0] lg:text-[11px]">
            Paso {currentStep} de {steps.length}
            <span className="text-cyan-500"> · {activeStep.label}</span>
          </p>
          <p className="text-xs font-bold text-blue-400 lg:text-[11px]">
            {completedFields} de {totalFields} campos completos
          </p>
          <p className="px-3 py-1 text-xs font-black text-cyan-500 lg:text-[11px]">
            {completionPercentage}%
          </p>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-yellow-400 transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <nav className="grid grid-cols-3 gap-2" aria-label="Pasos del registro">
        {steps.map((step) => {
          const isActive = step.id === currentStep
          const StepIcon = step.icon

          return (
            <button
              key={step.id}
              className={`flex min-w-0 items-center justify-center gap-2 rounded-2xl border p-2 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-200 sm:justify-start sm:gap-2 sm:p-2 lg:rounded-xl lg:p-1.5 ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.28)]"
                  : "border-blue-100 bg-white text-blue-800 shadow-sm hover:border-blue-300 hover:bg-blue-50"
              }`}
              title={step.label}
              onClick={() => onStepChange(step.id)}
              type="button"
            >
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-2xl sm:h-10 sm:w-10 lg:h-6 lg:w-6 lg:rounded-lg ${isActive ? "bg-white text-blue-600" : "bg-blue-100 text-blue-700"}`}>
                <StepIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-4 lg:w-4" aria-hidden="true" />
              </span>
              <span className="hidden min-w-0 flex-1 sm:block">
                <span className="block truncate text-sm font-black sm:text-base lg:text-xs">{step.label}</span>
              </span>
            </button>
          )
        })}
      </nav>
    </section>
  )
}

function validateForm(data) {
  const errors = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const urlPattern = /^https?:\/\/.+\..+/

  if (!data.companyName.trim()) errors.companyName = "Ingresa el nombre de la empresa."
  if (!data.nit.trim()) errors.nit = "Ingresa el NIT."
  if (!data.email.trim()) errors.email = "Ingresa el correo institucional."
  else if (!emailPattern.test(data.email)) errors.email = "Ingresa un correo válido."
  if (data.password.length < 6) errors.password = "La contraseña debe tener mínimo 6 caracteres."
  if (!data.confirmPassword) errors.confirmPassword = "Confirma tu contraseña."
  else if (data.confirmPassword !== data.password) errors.confirmPassword = "Las contraseñas no coinciden."
  if (!data.termsAccepted) errors.termsAccepted = "Debes aceptar los términos y condiciones."
  if (!data.phone.trim()) errors.phone = "Ingresa un teléfono de contacto."
  if (!data.sector.trim()) errors.sector = "Ingresa el sector de la empresa."
  if (!data.city.trim()) errors.city = "Ingresa la ciudad."
  if (data.companyLogo.trim() && !urlPattern.test(data.companyLogo)) errors.companyLogo = "Incluye una URL válida con http:// o https://."
  if (data.website.trim() && !urlPattern.test(data.website)) errors.website = "Incluye una URL válida con http:// o https://."
  if (!data.companyDescription.trim()) errors.companyDescription = "Describe brevemente la empresa."
  if (!data.companyType) errors.companyType = "Selecciona el tipo de empresa."
  if (!data.companySize) errors.companySize = "Selecciona el tamaño de la empresa."

  return errors
}

function TextField({ error, icon: Icon, label, name, onBlur, onChange, placeholder, required = true, type = "text", value }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-bold text-[#00245c] lg:mb-1 lg:text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00245c] lg:left-3 lg:h-4 lg:w-4" aria-hidden="true" />
        <input className={getInputClass(Boolean(error), "pl-11 lg:pl-9")} id={name} name={name} onBlur={onBlur} onChange={onChange} placeholder={placeholder} type={type} value={value} />
      </div>
      <FieldError message={error} />
    </div>
  )
}

function PasswordField({ error, hint, label, name, onBlur, onChange, placeholder, setVisible, value, visible }) {
  const helperText = hint || (name === "password" ? "Mínimo 6 caracteres" : "")

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-bold text-[#00245c] lg:mb-1 lg:text-xs">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <LockKeyhole className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00245c] lg:left-3 lg:h-4 lg:w-4" aria-hidden="true" />
        <input className={getInputClass(Boolean(error), "pl-11 pr-11 lg:pl-9 lg:pr-9")} id={name} name={name} onBlur={onBlur} onChange={onChange} placeholder={placeholder} type={visible ? "text" : "password"} value={value} />
        <button aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-700" onClick={() => setVisible((state) => !state)} type="button">
          {visible ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>
      {helperText && (
        <div className="mt-1 flex items-center gap-2">
          <img src={logo} alt="Mascota USTA" className="h-8 w-10 lg:h-7 lg:w-9" />
          <p className="text-xs text-[#00245c]">{helperText}</p>
        </div>
      )}
      <FieldError message={error} />
    </div>
  )
}

function SelectField({ error, label, name, onBlur, onChange, options, value }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-bold text-[#00245c] lg:mb-1 lg:text-xs">
        {label} <span className="text-red-500">*</span>
      </label>
      <select className={getInputClass(Boolean(error), "pl-5")} id={name} name={name} onBlur={onBlur} onChange={onChange} value={value}>
        <option value="">Selecciona una opción</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  )
}

function FieldError({ message }) {
  if (!message) return <p className="mt-1 min-h-5 text-xs font-semibold text-red-500" aria-live="polite" />
  return (
    <p className="mt-1 min-h-5 text-xs font-semibold text-red-500" aria-live="polite">
      {message}
    </p>
  )
}

function getInputClass(hasError, extraClass = "") {
  const borderClass = hasError ? "border-red-500 focus:border-red-600 focus:ring-red-100" : "border-blue-600 focus:border-blue-700 focus:ring-blue-200"
  return `h-10 w-full rounded-full border bg-white px-4 text-sm text-[#00245c] outline-none transition placeholder:text-blue-400 focus:ring-2 sm:h-11 lg:h-8 lg:text-[11px] ${borderClass} ${extraClass}`
}

export default RegistrerForm
