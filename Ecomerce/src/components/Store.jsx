import React, { useState, useEffect } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { setItem, getItem } from "../services/LocalStorage";

export function Store() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(getItem("CarrinhoCompras") || []);

  useEffect(() => {
    const fetchUrl = async () => {
      const url = "https://api.mercadolibre.com/sites/MLB/search?q=celular";
      const fetchItems = await fetch(url);
      const data = await fetchItems.json();

      setItems(data.results);
    };
    fetchUrl();
  }, []);

  const handleClick = (obj) => {
    const element = cart.find((item) => item.id === obj.id);
    if (element) {
      const cartFilter = cart.filter((e) => e.id !== obj.id);
      setCart(cartFilter);
      setItem("CarrinhoCompras", cartFilter);
    } else {
      setCart([...cart, obj]);
      setItem("CarrinhoCompras", [...cart, obj]);
    }
  };

  return (
    <div className="container">
      <header>
        <div className="header">
          <h1>Americanas</h1>
          <Link to="/cart">
            <AiOutlineShoppingCart size={50} color="#fff" />
          </Link>
        </div>
      </header>

      <div className="itemsCart">
        {items.map((item) => (
          <div className="itemsMap" key={item.id}>
            <h3>{item.title}</h3>
            <img src={item.thumbnail} alt="image" />
            <h3>R$ - {item.price}</h3>
            <button className="btnStore" onClick={() => handleClick(item)}>
              {cart.some((itemCart) => itemCart.id === item.id) ? (
                <BsFillCartCheckFill size={30} />
              ) : (
                <BsFillCartPlusFill size={30} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
