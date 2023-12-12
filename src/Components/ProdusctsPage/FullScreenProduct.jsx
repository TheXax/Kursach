import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { addToCart, removeFromCart } from "../../assets/Redux/slices/cart";

import Style from "../MainStyle.module.scss";

export default function FullScreenProduct({ props, turnOff }) {
  const [sclrollY, setScrollY] = useState(0); //убираем скрол

  const dispatch = useDispatch();//REDUX, вывоз reduc'еров

  useEffect(() => {
    setScrollY(window.scrollY);
  });

  return ( //знак ?, чтобы была проверка и не было ошибок
    <> 
      <div style={{ top: sclrollY }} className={Style.product_bg}>
        <section className={Style.product_full}>
          <img src={`http://localhost:5173/src/assets/${props?.img}`} /> 

          <section className={Style.card_info}>
            <h1>{props?.title}</h1>
            <p className={Style.price}>{props?.price}</p>
            <p>Отборные пионы сорта “Сара Бернар”</p>

            <div className={Style.border}></div>

            <button
              onClick={() => {
                dispatch(addToCart({ ...props }));//отправления сведений в хранилище Redux
              }}
            >
              Добавить в корзину
            </button>
          </section>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="24"
            viewBox="0 0 21 24"
            fill="none"
            onClick={turnOff}
          >
            <line
              x1="1.11786"
              y1="2.0682"
              x2="19.1179"
              y2="22.1858"
              stroke="black"
              stroke-width="3"
            />
            <line
              x1="19.0253"
              y1="0.945527"
              x2="2.00909"
              y2="21.9019"
              stroke="black"
              stroke-width="3"
            />
          </svg>
        </section>
      </div>
    </>
  );
}
