import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import decorationOne from "../../assets/login/decorations/blueShape.png";

function LoginForm({ setMascotState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      email,
      password,
      rememberMe,
    });

    setMascotState("happy");
  };

  const handlePasswordFocus = () => {
    setMascotState(showPassword ? "normal" : "cover");
  };

  const handlePasswordBlur = () => {
    setMascotState("normal");
  };

  const handleTogglePassword = () => {
    setShowPassword((currentValue) => {
      const nextValue = !currentValue;
      setMascotState(nextValue ? "normal" : "cover");
      return nextValue;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-[clamp(10px,1.7dvh,16px)] pt-[clamp(28px,5dvh,56px)] sm:pt-10 lg:pt-8"
    >
      <img
        src={decorationOne}
        alt=""
        className="mb-1 w-16 sm:w-20 md:w-24"
      />

      <div>
        <h1 className="text-3xl font-bold leading-tight text-[#00245c] sm:text-4xl lg:text-[2.35rem] xl:text-4xl">
          Bienvenido
        </h1>
        <p className="text-base font-semibold text-cyan-500 sm:text-lg lg:text-lg xl:text-xl">
          a tu portal empresarial
        </p>
        <div className="mt-2 h-1 w-12 rounded-full bg-yellow-400 sm:mt-3 sm:w-16" />
      </div>

      <label
        htmlFor="company-email"
        className="mt-2 text-[11px] font-semibold text-[#00245c] sm:mt-4"
      >
        Correo institucional
      </label>
      <div className="relative">
        <Mail
          aria-hidden="true"
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#002778]"
          strokeWidth={2}
        />
        <input
          id="company-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          className="h-10 w-full rounded-full border border-blue-600 px-5 pl-12 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200 sm:h-11"
        />
      </div>

      <label
        htmlFor="company-password"
        className="text-[11px] font-semibold text-[#00245c]"
      >
        Contraseña
      </label>
      <div className="relative">
        <LockKeyhole
          aria-hidden="true"
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#002778]"
          strokeWidth={2}
        />
        <input
          id="company-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
          placeholder="Ingresa tu contraseña"
          autoComplete="current-password"
          required
          className="h-10 w-full rounded-full border border-blue-600 px-12 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200 sm:h-11"
        />
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleTogglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0057d9]"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? (
            <Eye aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          ) : (
            <EyeOff aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between px-4 text-[10px] font-semibold text-blue-600 sm:px-6 sm:text-[11px]">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="sr-only"
          />
          Recordarme
        </label>
        <button type="button">¿Olvidaste tu contraseña?</button>
      </div>

      <button
        type="submit"
        className="relative mt-3 h-11 rounded-full bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 sm:mt-4"
      >
        Ingresar
        <ArrowRight
          aria-hidden="true"
          className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2"
          strokeWidth={2}
        />
      </button>

      <p className="text-center text-xs font-semibold text-[#00245c] sm:text-sm">
        ¿No tienes una cuenta?{" "}
        <Link to="/company/register" className="text-blue-700 underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
