import Sostenible from '../../images/Sostenible.png'

export default function OnlyPass () {
    return (
        <div className="flex flex-row gap-8  w-full h-96 bg-[#A8DADC] justify-center">
            <img src={Sostenible} alt="Sostenible" className="h-86 shadow-xl my-10"/>
            <div className='flex flex-col w-1/4 my-10 text-justify '>
                <h3 className='text-4xl font-bold my-4'>Consumo Responsable</h3>
                <p className='w-96 text-[#212121] tracking-normal space-y-0.5 '>En OnlyEat, estamos dedicados a proteger el medio ambiente. Utilizamos empaques ecológicos y promovemos prácticas sostenibles para asegurarnos de que tu pedido no solo sea delicioso, sino también responsable.</p>
            </div>
        </div>
    )
}