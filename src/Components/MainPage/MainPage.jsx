import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; //Link позволяет переходить по routerам навигации, useNavigate для того, чтобы получитть текущий путь

import BurgerMeny from "../Burger/BurgerMeny";

import Style from "../MainStyle.module.scss";

import moreSection from "../../assets/lastCard.png";
import aboutUs from "../../assets/Rose.png";
import pre_footer from "../../assets/Footer.png";

export default function MainPage() {
  const [burgerState, setBurgerState] = useState(false); //состояние бургер-меню

  const navigate = useNavigate(); //изменнение местоположения

  const cards = [
    {
      title: "Аструм",
      price: "105p",
      img: "First_item.png",
    },
    {
      title: "Гармония",
      price: "95p",
      img: "Second_item.png",
    },
    {
      title: "Сладкая вата",
      price: "48p",
      img: "third_group.png",
    },
    {
      title: "Берри",
      price: "64p",
      img: "fourth_item.png",
    },
    {
      title: "Нежность",
      price: "52p",
      img: "fivth_group.png",
    },
  ];

  const changeBurgerState = () => {
    setBurgerState(!burgerState);
  };//изменение состояния бургер-меню

  return (
    <>
      <header className={Style.main_header}>
        <div className={Style.container}>
          <BurgerMeny
            props={{ isActive: burgerState, setter: setBurgerState }}
          />
          <nav className={Style.main_nav}>
            <section className={Style.logo}>
              <h3>FLOWER HOUSE</h3>
              <p>ЦВЕТКИ | ДЕКОР</p>
            </section>

            <section className={Style.nav_interface}>
              <Link to="/">О нас</Link>
              <Link to="/products">Каталог</Link>
              <Link to="/cart">Доставка</Link>
              <Link to="/">Контакты</Link>

              <Link to="/cart" className={Style.make_order_btn}>
                Заказать
              </Link>
            </section>

            <svg
              className={Style.burger_btn}
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="48"
              onClick={changeBurgerState}
            >
              <path
                fill="white"
                d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"
              />
            </svg>
          </nav>

          <h1>
            СОЗДАЁМ ЛЮБОВЬ <br /> ЧЕРЕЗ ЦВЕТЫ
          </h1>
        </div>
      </header>

      <main className={Style.main}>
        <section className={`${Style.products} ${Style.container}`}>
          <h2>Наши товары</h2>

          <section className={Style.cards}>
            {cards.map((item, i) => (
              <section key={i} className={Style.card}>
                <img src={`http://localhost:5173/src/assets/${item.img}`} />
                <p>{item.title}</p>
                <p>{item.price}</p>
              </section>
            ))}

            <section
              onClick={() => {
                navigate("/products");
              }}
              className={`${Style.card}`}
            >
              <img src={moreSection} />
              <p className={Style.last_card_p}>Все товары</p>
            </section>
          </section>
        </section>

        <section className={Style.our_task}>
          <img src={aboutUs} />

          <section className={Style.info}>
            <h1>
              Наша <br /> миссия
            </h1>
            <p>
              Мы знаем, как важно каждый день любить, благодарить, радовать и
              вдохновлять, поэтому наша задача дать вам простой инструмент,
              через который легко говорить о чувствах.
            </p>
          </section>
        </section>

        <section className={`${Style.delivery} ${Style.container}`}>
          <h2>У нас есть доставка!</h2>

          <section className={Style.deliver_info}>
            <p>Доставка курьером по Минску: 12 руб.</p>
            <div></div>
            <p>Срочная доставка по Минску: 15 руб.</p>
            <div></div>
            <p>Доставка по Минской области: 20 руб.</p>
          </section>
        </section>
      </main>

      <img src={pre_footer} className={Style.pre_footer} />

      <footer className={Style.footer}>
        <p>
          Факультет информационных технологий | Информационные системы и
          технологии
        </p>
        <p>Стрелковская Вероника Андреевна, 2 группа 2023 год</p>
      </footer>
    </>
  );
}
