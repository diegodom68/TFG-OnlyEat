import CardHowTo  from "./CardsHowTo";

function HowTo () {

    return (
        <div className="bg-gray-50 w-full h-72 py-16 text-center text-xl ">
            <h3 >Como hacer un pedido</h3>
            <h2 className="font-bold text-5xl text-orange-500">Así de sencillo</h2>
            <CardHowTo />
        </div>
    );
}

export default HowTo;