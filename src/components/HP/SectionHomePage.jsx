import { ReactComponent as MedalIcon } from '../../images/MI.svg';
import { ReactComponent as CommentIcon } from '../../images/CommentIcon.svg';
import { ReactComponent as StarIcon } from '../../images/StarIcon.svg';

const FeatureCard = ({ Icon, title, description1, description2, description3 }) => {
    return (
        <div className="flex flex-col m-4 px-12 pt-12 max-w-sm h-80 items-center  bg-white shadow-md rounded-lg ">
            <div className="text-3xl mb-2">
                {/* Renderiza el ícono como un componente si es un ícono de Material-UI o como una imagen si es una ruta de archivo */}
                {typeof Icon === 'string' ? <img src={Icon} alt={title}  className="mx-auto" /> : <Icon className="mx-auto" width={64} height={64} />}
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <ul className='list-image-[url(https://img.icons8.com/material-outlined/24/checkmark--v3.png)]'>
                {description1 && <li className="text-[#212121] text-sm">{description1}</li>}
                {description2 && <li className="text-[#212121] text-sm">{description2}</li>}
                {description3 && <li className="text-[#212121] text-sm">{description3}</li>}            
            </ul>
        </div>
    );
} 

function FeaturesSection() {
    const features = [
    {
    id: 1,
    Icon: MedalIcon,
    title: 'Programas de fidelización',
    description1: 'Obtén sellos, promociones, descuentos, noticias y más a través de nuestras newsletters y redes sociales',
    },
    {
    id: 2,
    Icon: CommentIcon,
    title: 'Nuestra promesa',
    description1: 'Servicio excelente y reseñas auténticas de usuarios',
    description2: 'Reseñas auténticas de usuarios',
    
    },
    {
    id: 3,
    Icon: StarIcon,
    title: 'Ventajas para ti',
    description1: 'Más de 33.500 establecimientos entre los que elegir ',
    description2: 'Pago electrónico o en efectivo',
    description3: 'Haz tu pedido en cualquier momento lugar y en cualquier dispositivo',
    },
];

return (
    <div className="flex justify-center py-12 bg-[#F7F7F7]">
        {features.map((feature) => (
            <FeatureCard key={feature.id} Icon={feature.Icon} title={feature.title} description1={feature.description1} description2={feature.description2} description3={feature.description3} />
        ))}
    </div>
);
}

export default FeaturesSection;
