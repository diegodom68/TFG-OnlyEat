import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  if (!isOpen) return null;

  // Función para formatear los precios en formato europeo
  const formatPrice = (price) => {
    return price.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#E63946]">Carrito</h2>
          <button className="text-[#C53030]" onClick={onClose}>
            Cerrar
          </button>
        </div>
        <div className="mt-4">
          {cartItems.length === 0 ? (
            <h2 className="text-lg font-bold text-[#C53030]">
              Tu carrito está vacío
            </h2>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  className="flex justify-between items-center p-4 bg-[#FFD9D1] rounded-lg shadow-md"
                  key={`${item.id_producto}-${item.uniqueIdentifier}`}
                >
                  <div className="flex gap-4">
                    <img
                      src={item.imagen_prod}
                      alt={item.nombre_producto}
                      className="rounded-md h-24 w-24 object-cover"
                    />
                    <div className="flex flex-col justify-center">
                      <h1 className="text-lg font-bold text-[#E63946]">
                        {item.nombre_producto}
                      </h1>
                      <p className="text-[#8C8C8C]">
                        {formatPrice(item.precio)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="px-4 py-2 bg-[#657E7F] text-white text-xs font-bold uppercase rounded hover:bg-[#8C8C8C] focus:outline-none focus:bg-[#8C8C8C]"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                    <p className="text-[#212121]">{item.quantity}</p>
                    <button
                      className="px-4 py-2 bg-[#657E7F] text-white text-xs font-bold uppercase rounded hover:bg-[#8C8C8C] focus:outline-none focus:bg-[#8C8C8C]"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4">
                <h2 className="text-lg font-bold text-[#E63946]">
                  Total: {formatPrice(getCartTotal())}
                </h2>
                <button
                  className="px-4 py-2 bg-[#C53030] text-white text-xs font-bold uppercase rounded hover:bg-[#E63946] focus:outline-none focus:bg-[#E63946]"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
