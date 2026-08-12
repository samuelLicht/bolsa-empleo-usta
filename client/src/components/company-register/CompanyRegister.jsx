import RegistrerForm from "./RegistrerForm"
import RegistrerMascot from "./RegistrerMascot"
import yellow from "../../assets/login/decorations/yellow-star.png";
import logo from "../../assets/login/decorations/menu-hamburguesa-fondo-santoto-tunja-boyaca-7.png";

import university from "../../assets/login/backgrounds/university.webp";
function CompanyRegister() {
  return (
      <main className="relative min-h-dvh w-full overflow-y-auto bg-[#fff8eb] px-4 py-6 lg:h-dvh lg:overflow-hidden lg:px-0 lg:py-0">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
        src={university}
        alt="Campus universitario"
        className="absolute bottom-10 z-20 hidden w-[40%] lg:block"
      />
      
         <img
                  src={yellow}
                  alt=""
                  className="absolute -left-10 -top-16 w-40 opacity-90 sm:w-52 lg:-top-50 lg:left-0"
                />
        
                 <img
                  src={logo}
                  alt=""
                  className="absolute bottom-0 right-0 hidden w-[35%] lg:block"
                />
        </div>

        <div className="relative z-10 mx-auto grid min-h-full w-full max-w-[1250px] gap-6 lg:gap-8 lg:grid-cols-[0.86fr_0.72fr] lg:items-center  ">
          
          <RegistrerMascot />

          <section className="flex min-w-0 flex-col items-center justify-start lg:items-center lg:justify-center">
            <RegistrerMascot compact />
            <div className="w-full rounded-[18px] bg-white px-5 py-5 shadow-xl sm:px-7 sm:py-6 lg:px-5 lg:py-3.5 xl:px-6">
              <RegistrerForm />
            </div>
          </section>
        </div>
    </main>
  )
}

export default CompanyRegister
