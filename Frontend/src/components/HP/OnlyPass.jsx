import Sostenible from "../../images/Sostenible.png";

export default function OnlyPass() {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full h-auto bg-[#A8DADC] justify-center items-center p-4">
      <img
        src={Sostenible}
        alt="Sostenible"
        className="w-full md:w-auto h-48 md:h-86 shadow-xl my-4 md:my-10"
      />
      <div className="flex flex-col w-full md:w-1/2 my-4 md:my-10 text-justify p-2">
        <h3 className="text-2xl md:text-4xl font-bold my-2 md:my-4">
          Consumo Responsable
        </h3>
        <p className="text-[#212121] tracking-normal">
          En OnlyEat, estamos dedicados a proteger el medio ambiente. Utilizamos
          empaques ecológicos y promovemos prácticas sostenibles para
          asegurarnos de que tu pedido no solo sea delicioso, sino también
          responsable.
        </p>
      </div>
    </div>
  );
}
