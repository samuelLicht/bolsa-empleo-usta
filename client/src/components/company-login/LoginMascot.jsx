import mascotNormal from "../../assets/login/mascot/mascot-normal.png";
import mascotCover from "../../assets/login/mascot/mascot-cover-eyes.png";
import mascotHappy from "../../assets/login/mascot/mascot-happy.png";
import mascotSad from "../../assets/login/mascot/mascot-sad.png";

const mascotImages = {
  normal: mascotNormal,
  cover: mascotCover,
  happy: mascotHappy,
  sad: mascotSad,
};

function LoginMascot({ state }) {
  const currentImage = mascotImages[state] || mascotImages.normal;

  return (
    <div className="absolute bottom-[-10px] left-1/2 z-40 h-[300px] w-[230px] -translate-x-1/2 sm:bottom-0 sm:h-[380px] sm:w-[300px] md:bottom-[-18px] md:h-[500px] md:w-[390px] lg:bottom-0 lg:h-[82dvh] lg:max-h-[660px] lg:w-[76%] lg:max-w-[600px]">
      <img
        key={state}
        src={currentImage}
        alt="Mascota del portal empresarial"
        className="h-full w-full object-contain object-bottom"
      />
    </div>
  );
}

export default LoginMascot;
