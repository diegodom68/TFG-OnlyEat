import FotoFalafel from "../../images/Browsphoto.png";

function Brows_2() {
  return (
    <div className="flex h-full bg-[#E63946] ">
      <svg
        width="136px"
        height="600px"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="0,100 100,0 0,0" fill="#F7F7F7" />
      </svg>
      <img
        src={FotoFalafel}
        alt="FotoFalafel"
        className="h-8/12 w-8/12 py-6 object-scale-down"
      />
    </div>
  );
}

export default Brows_2;
