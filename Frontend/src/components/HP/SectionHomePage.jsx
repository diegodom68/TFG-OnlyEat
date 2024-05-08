import React from "react";
import { ReactComponent as MedalIcon } from "../../images/MI.svg";
import { ReactComponent as CommentIcon } from "../../images/CommentIcon.svg";
import { ReactComponent as StarIcon } from "../../images/StarIcon.svg";

const FeatureCard = ({
  Icon,
  title,
  description1,
  description2,
  description3,
}) => {
  return (
    <div className="flex flex-col m-4 p-6 max-w-xs md:max-w-sm lg:max-w-md bg-white shadow-md rounded-lg items-center">
      <div className="text-3xl mb-4">
        {typeof Icon === "string" ? (
          <img src={Icon} alt={title} className="mx-auto" />
        ) : (
          <Icon className="mx-auto" width={64} height={64} />
        )}
      </div>
      <h3 className="font-semibold text-lg mb-4 text-center">{title}</h3>
      <ul className="list-disc list-inside space-y-2 text-center">
        {description1 && (
          <li className="text-[#212121] text-sm">{description1}</li>
        )}
        {description2 && (
          <li className="text-[#212121] text-sm">{description2}</li>
        )}
        {description3 && (
          <li className="text-[#212121] text-sm">{description3}</li>
        )}
      </ul>
    </div>
  );
};

function FeaturesSection() {
  const features = [
    {
      id: 1,
      Icon: MedalIcon,
      title: "Programas de fidelización",
      description1:
        "Obtén sellos, promociones, descuentos, noticias y más a través de nuestras newsletters y redes sociales",
    },
    {
      id: 2,
      Icon: CommentIcon,
      title: "Nuestra promesa",
      description1: "Servicio excelente y reseñas auténticas de usuarios",
      description2: "Reseñas auténticas de usuarios",
    },
    {
      id: 3,
      Icon: StarIcon,
      title: "Ventajas para ti",
      description1: "Más de 33.500 establecimientos entre los que elegir",
      description2: "Pago electrónico o en efectivo",
      description3:
        "Haz tu pedido en cualquier momento, lugar y en cualquier dispositivo",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center py-12 bg-[#F7F7F7]">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          Icon={feature.Icon}
          title={feature.title}
          description1={feature.description1}
          description2={feature.description2}
          description3={feature.description3}
        />
      ))}
    </div>
  );
}

export default FeaturesSection;
