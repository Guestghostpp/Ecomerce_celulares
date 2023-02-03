import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getItem, setItem } from "../services/LocalStorage";
import { BsFillCartDashFill } from "react-icons/bs";

export const Cart = () => {
  const [data, setData] = useState(getItem("CarrinhoCompras") || []);

  const handleRemove = (obj) => {
    const filterItems = data.filter((e) => e.id !== obj.id);
    setData(filterItems);
    setItem("CarrinhoCompras", filterItems);
  };

  return (
    <div>
      <header>
        <div className="header aling">
          <Link to="/">Voltar</Link>
        </div>
      </header>
      <div className="itemsCart">
        {data.map((e) => (
          <div className="itemsMap" key={e.id}>
            <h4>{e.title}</h4>
            <img src={e.thumbnail} alt={e.title} />
            <h4>{e.price}</h4>
            <button className="btnStore" onClick={() => handleRemove(e)}>
              <BsFillCartDashFill size={30} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
