import { useState } from "react";
import { Headphones } from "lucide-react";
import LoginMascot from "./LoginMascot.jsx";
import LoginForm from "./LoginForm.jsx";

import building from "../../assets/login/backgrounds/bulding.png";
import blueShape from "../../assets/login/backgrounds/shape.png";
import yellowShape from "../../assets/login/decorations/yellow-shape.png";

function CompanyLogin() {
  const [mascotState, setMascotState] = useState("normal");

  return (
    <main className="flex min-h-dvh w-full flex-col overflow-y-auto bg-white lg:h-dvh lg:flex-row lg:overflow-hidden">
      <section className="relative h-[clamp(240px,38dvh,320px)] w-full shrink-0 overflow-hidden bg-[#0057d9] sm:h-[clamp(280px,42dvh,360px)] md:h-[44dvh] lg:h-dvh lg:w-[48%]">
        <img
          className="absolute bottom-0 right-0 z-10 h-full w-full object-cover opacity-80"
          src={building}
          alt=""
        />
        <img
          className="absolute bottom-0 left-0 z-20"
          src={blueShape}
          alt=""
        />

        <LoginMascot state={mascotState} />
      </section>

      <section className="relative flex min-h-fit flex-1 items-start justify-center overflow-hidden bg-white px-6 py-[clamp(20px,4dvh,32px)] sm:items-center lg:h-dvh lg:min-h-0 lg:w-[52%] lg:flex-none lg:items-center lg:px-10 lg:py-0">
        <div className="absolute right-8 top-8 z-20 hidden items-center gap-2 text-[11px] font-semibold text-[#00245c] sm:flex">
          <Headphones
            aria-hidden="true"
            className="h-5 w-5 text-[#0057d9]"
            strokeWidth={2}
          />
          <span>¿Necesitas ayuda?</span>
        </div>
        <div className="relative z-20 w-full max-w-sm">
          <LoginForm setMascotState={setMascotState} />
        </div>
        <img
          className="absolute bottom-0 right-0 z-10 w-28 sm:w-40 md:w-52 lg:w-64"
          src={yellowShape}
          alt=""
        />
      </section>
    </main>
  );
}

export default CompanyLogin;
