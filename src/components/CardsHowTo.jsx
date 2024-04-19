import { ReactComponent as MapIcon } from '../images/MapIcon.svg';
import { ReactComponent as BurgerIcon } from '../images/BurgerIcon.svg';
import { ReactComponent as OrderIcon } from '../images/OrderIcon.svg';


// Componente Card individual
const Card = ({ Icon, title, description }) => {
  return (
    <div className="max-w-sm text-center p-4">
      {/* Renderiza el ícono como un componente si es un ícono de Material-UI o como una imagen si es una ruta de archivo */}
      {typeof Icon === 'string' ? <img src={Icon} alt={title} className="mx-auto" /> : <Icon className="mx-auto" />}
      <h3 className="font-bold text- my-2">{title}</h3>
      <p className='text-sm'>{description}</p>
    </div>
  );
};

// Componente para listar las tarjetas
const CardSection = () => {
  // Datos de ejemplo para las tarjetas
  const cardsData = [
    {
      id: 1,
      Icon: MapIcon, // Este es un componente de React
      title: 'Dinos dónde estás',
      description: 'Te mostraremos tiendas y restaurantes cercanos en los que puedes pedir.',
    },
    {
      id: 2,
      Icon: BurgerIcon, // Este es el path a tu ícono SVG
      title: 'Encuentra lo que quieres',
      description: 'Busca artículos o platos, establecimientos o tipos de cocina.',
    },
    {
        id: 3,
        Icon: OrderIcon,
        title: 'Pedido para entrega o para recoger',
        description: 'Te iremos informando a medida que avance tu pedido.'
    }
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 pt-10">
      {cardsData.map((card) => (
        <Card key={card.id} Icon={card.Icon} title={card.title} description={card.description} />
      ))}
    </div>
  );
};

export default CardSection;
