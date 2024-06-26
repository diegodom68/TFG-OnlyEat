import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/HP/Navbar";
import { useParams } from "react-router-dom";
import RestaurantInfo from "../components/restaurant/RestaurantInfo";
import SearchProduct from "../components/products/SearchProduct";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CartContext } from "../components/context/CartContext";
import BackArrow from "../components/buttons/BackArrow";

export default function Products() {
  const { id_restaurante } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const productResponse = await axios.get(
          `http://localhost:8000/restaurantes/${id_restaurante}/productos`
        );
        const productsByType = productResponse.data.reduce((acc, product) => {
          const type = product.tipos_producto.nombre_tipo;
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(product);
          return acc;
        }, {});
        setProducts(productsByType);
        setFilteredProducts(productsByType);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchRestaurantData();
  }, [id_restaurante]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = Object.keys(products).reduce((acc, type) => {
        const filteredProducts = products[type].filter((product) =>
          product.nombre_producto
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        if (filteredProducts.length > 0) {
          acc[type] = filteredProducts;
        }
        return acc;
      }, {});
      setFilteredProducts(filtered);
    }
  };

  const getCartItem = (productId) => {
    return cartItems.find((item) => item.id_producto === productId);
  };

  return (
    <>
      <Navbar />
      <main className="w-full h-full bg-slate-100">
        <div className="absolute top-16 left-4">
          <BackArrow />
        </div>
        <RestaurantInfo />
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-full max-w-screen-xl px-4">
            <SearchProduct onSearch={handleSearch} />
            {Object.keys(filteredProducts).map((type) => (
              <div key={type}>
                <h2 className="text-xl font-bold mb-3">{type}</h2>
                <div className="flex flex-wrap -mx-2">
                  {filteredProducts[type].map((product) => {
                    const cartItem = getCartItem(product.id_producto);
                    return (
                      <div
                        key={product.id_producto}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                      >
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="flex flex-col h-full">
                            <img
                              src={product.imagen_prod}
                              alt={product.nombre_producto}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col justify-between flex-grow">
                              <div>
                                <h3 className="font-bold text-lg">
                                  {product.nombre_producto}
                                </h3>
                                <p className="text-gray-500">
                                  {product.precio} €
                                </p>
                                <p className="text-sm text-gray-700">
                                  {product.descripcion}
                                </p>
                              </div>
                              <div className="flex items-center justify-between mt-4">
                                <span className="text-xs font-semibold text-red-600 bg-red-100 py-1 px-2 rounded-full">
                                  Popular
                                </span>
                                {cartItem ? (
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => removeFromCart(product)}
                                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                    >
                                      -
                                    </button>
                                    <span className="mx-2">
                                      {cartItem.quantity}
                                    </span>
                                    <button
                                      onClick={() => addToCart(product)}
                                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                    >
                                      +
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => addToCart(product)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                  >
                                    <AddShoppingCartIcon />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
