import { useState, useRef } from "react";//useRef отслеживание состояния эл-та и его изменения, + изменение компонента
import { Link } from "react-router-dom";

import Style from "../MainStyle.module.scss";

import FullScreenProduct from "./FullScreenProduct";
import BurgerMeny from "../Burger/BurgerMeny";

import searchBtn from "../../assets/search.svg";

export default function ProductsPage() {
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
    {
      title: "Нежная пора",
      price: "35p",
      img: "last_group.png",
    },
    {
      title: "Солнечная мечта",
      price: "40p",
      img: "six_group.png",
    },
    {
      title: "Небесное послание",
      price: "50p",
      img: "seventh_group.png",
    },
    {
      title: "Мон амур",
      price: "89p",
      img: "eight_group.png",
    },
    {
      title: "Радостный",
      price: "40p",
      img: "nine_group.png",
    },
  ];

  const [cardState, setCardState] = useState(false);//хук
  const [burgerState, setBurgerState] = useState(false);
  const [filtredCards, setFiltredCards] = useState([...cards]);
  const [searchValue, setSearchValue] = useState("");
  const [cardId, setCardId] = useState(0);

  const refToFullCard = useRef(null);//полная информация о продукте

  const filterByName = () => {
    if (searchValue.trim().length === 0) {
      setFiltredCards(cards);
      return;
    }

    setFiltredCards(cards.filter((item) => item.title.includes(searchValue)));//фильтрация включая поиск
  };

  const changeBurgerState = () => {
    setBurgerState(!burgerState);
  };

  const openFullProduct = (id) => {
    setCardId(id);
    setCardState(true); //карточка открыта

    const body = document.getElementById("body");
    const html = document.querySelector("html");
    body.classList = Style.active_body;//активные стили помогают затемнить фон и вынести вперёд элемент
    html.classList = Style.active_body;
  };

  const closeFullProduct = () => {
    setCardState(false);

    const body = document.querySelector("body");
    const html = document.querySelector("html");
    body.classList = "";
    html.classList = "";
  };

  return (
    <>
      {cardState && ( //если состояни true
        <FullScreenProduct
          props={filtredCards[cardId]}
          turnOff={closeFullProduct}
        />
      )}

      <header className={Style.products_header}>
        <BurgerMeny props={{ isActive: burgerState, setter: setBurgerState }} />
        <nav className={Style.products_nav}>
          <section className={`${Style.container} ${Style.nav_display}`}>
            <section className={Style.logo}>
              <h3>FLOWER HOUSE</h3>
              <p>ЦВЕТКИ | ДЕКОР</p>
            </section>

            <section className={Style.nav_interface}>
              <section className={Style.search_field}>
                <input
                  placeholder="Search..."
                  type="text"
                  onChange={(e) => {
                    setSearchValue(e.target.value); //закидываем то, что находится в инпуте(то, что записываем)
                  }}
                />
                <img src={searchBtn} onClick={filterByName} />
              </section>

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
              onClick={() => {
                setBurgerState(!burgerState);
              }}
            >
              <path
                fill="white"
                d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"
              />
            </svg>
          </section>
        </nav>
      </header>

      <main className={`${Style.container} ${Style.products_main}`}>
        <h1>Каталог</h1>
        <section className={Style.products_content}>
          {filtredCards.length == 0 ? (
            <h2 style={{ textAlign: "center", margin: "0 auto" }}>
              Ничего нет :(
            </h2>
          ) : (
            filtredCards.map((item, id) => ( //перебор массива карточек, чтобы открыть одну
              <section
                key={id}
                className={`${Style.products_card} ${Style.card}`}
                onClick={() => {
                  openFullProduct(id);
                }}
              >
                <img src={`http://localhost:5173/src/assets/${item.img}`} />
                <p>{item.title}</p>
                <p>{item.price}</p>
              </section>
            ))
          )}
        </section>
      </main>
    </>
  );
}
