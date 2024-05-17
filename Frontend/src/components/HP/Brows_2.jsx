import FotoFalafel from "../../images/Browsphoto.png";

function Brows_2() {
  return (
    <div className="relative flex h-screen bg-[#E63946] w-screen">
      <div className="absolute top-0 left-0 w-1/3 h-full">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0,100 100,0 0,0" fill="#F7F7F7" />
        </svg>
      </div>
      <div className="flex items-center justify-center w-2/3 h-full ml-auto">
        <img
          src={FotoFalafel}
          alt="FotoFalafel"
          className="h-8/12 w-8/12 py-6 object-scale-down"
        />
      </div>
    </div>
  );
}

export default Brows_2;
