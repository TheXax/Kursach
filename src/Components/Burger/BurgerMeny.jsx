import { Link } from "react-router-dom";

import Style from "../MainStyle.module.scss";

export default function BurgerMeny({ props }) {
  return (
    <>
      <section
        className={`${Style.burger_meny} ${props.isActive ? Style.active : ""}`}
      >
        <Link to="/">O нас</Link>
        <Link to="/products">Каталог</Link>
        <Link to="/cart">Доставка</Link>
        <Link to="/">Контакты</Link>
      </section>
    </>
  );
}
