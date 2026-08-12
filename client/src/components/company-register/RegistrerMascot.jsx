
import mascotaCompany from "../../assets/login/mascot/company-mascot-happy.png";

import blue from "../../assets/login/decorations/blue-shape.svg";
import yellow from "../../assets/login/decorations/yellow.png";
import university_1 from "../../assets/login/backgrounds/university.webp";




import university from "../../assets/login/decorations/universidad-santoto.webp";

function RegistrerMascot({ compact = false }) {
  if (compact) {
    return (
      <section className="relative mb-5 h-[360px] w-full max-w-[420px] overflow-hidden rounded-[22px] lg:hidden">
        <img
          src={yellow}
          alt=""
          className="absolute right-6 top-3 z-30 w-24"
        />

        <img
          src={university_1}
          alt=""
          className="absolute bottom-10 right-0 z-10 "
        />

        <img
          src={blue}
          alt=""
          className="absolute bottom-8 left-4 z-20 w-[62%]"
        />

        <img
          src={mascotaCompany}
          alt="Mascota del portal empresarial"
          className="absolute bottom-0 left-1/2 z-30 w-[46%] max-w-[180px] -translate-x-1/2"
        />
      </section>
    )
  }

  return (
    <section className="relative hidden h-full w-full overflow-hidden lg:block">

     
      
      <img
        src={yellow}
        alt="Campus universitario"
        className="absolute top-10 right-20 w-[20%]" 
      />
      <img
              src={university}
              alt="Campus universitario"
              className="absolute bottom-20 right-0 z-10  w-[90%]"
            />
      <img
              src={blue}
              alt="Campus universitario"
              className="absolute bottom-8 right-10 w-[50%] z-20"
            />
      

<div className="absolute left-1/2 top-20 z-40 w-[80%] max-w-[450px] -translate-x-1/2 rounded-[24px] bg-gradient-to-br from-[#00267c] to-[#0142b9] px-6 py-5 text-white shadow-[0_18px_35px_rgba(0,36,92,0.24)]">
  <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-[34px] rounded-tr-[24px] bg-yellow-400" />

  <p className="relative max-w-[320px] text-2xl font-black leading-[1.15] tracking-normal xl:text-[1.8rem]">
    Tu empresa crea nuevas{" "}
    <span className="text-cyan-300">oportunidades</span>
  </p>

  <p className="relative mt-3 text-sm font-semibold leading-relaxed text-blue-50 xl:text-base">
    Conecta con el talento Tomasino
  </p>
</div>

      

      
      

      <img
        src={mascotaCompany}
        alt="Mascota del portal empresarial"
        className="absolute bottom-0 left-1/2 z-30 w-[37%] -translate-x-1/2"
      />
    </section>
   
  )
}

export default RegistrerMascot
