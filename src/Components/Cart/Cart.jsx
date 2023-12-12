import { useState, useEffect } from "react"; //useEffect для загрузки станицы, когда м ыеё открываем(вызывается один раз)
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { tryFetchCartFromLocalStorage } from "../../assets/Redux/slices/cart";

import BurgerMeny from "../Burger/BurgerMeny";
import Product from "./Product";

import Style from "../MainStyle.module.scss";
import searchBtn from "../../assets/search.svg";

export default function Cart() {
  const dispatch = useDispatch();//REDUX

  const [refresh, setRefresh] = useState(true);

  const [burgerState, setBurgerState] = useState(false);
  const [deliverPrice, setDeliverPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { cart } = useSelector((state) => state.cart);//с помощью useSelect получает доступ к хранилищу Redux. Хранилище Redux — это объект, который управляет состоянием всего приложения и позволяет изменять его с помощью действий.

  useEffect(() => {
    dispatch(tryFetchCartFromLocalStorage());//получение товаров
    setTotalPrice(0);//по стандарту цена = 0
 //далее вычисление общей стоимости в корзине
    for (let i = 0; i < cart.length; i++) {
      let price = cart[i].price.replace("p", "");//заменяет символ р на пустую строку(вырежет букву р(рубли) в стоимости товара)
      setTotalPrice((prevent) => prevent + price * cart[i].count);
    }

    setTotalPrice((prevent) => prevent + deliverPrice);
  }, [deliverPrice, refresh]);

  useEffect(() => {
    setTotalPrice(0);

    for (let i = 0; i < cart.length; i++) {
      let price = cart[i].price.replace("p", "");
      setTotalPrice((prevent) => prevent + price * cart[i].count);
    }

    setTotalPrice((prevent) => prevent + deliverPrice);
  }, [cart]);

  return (
    <>
      <header className={Style.cart_header}>
        <BurgerMeny props={{ isActive: burgerState, setter: setBurgerState }} />
        <nav className={Style.products_nav}>
          <section className={`${Style.container} ${Style.nav_display}`}>
            <section className={Style.logo}>
              <h3>FLOWER HOUSE</h3>
              <p>ЦВЕТКИ | ДЕКОР</p>
            </section>

            <section className={Style.nav_interface}>
              <Link to="/">О нас</Link>
              <Link to="/products">Каталог</Link>
              <Link to="/cart">Доставка</Link>
              <Link to="/">Контакты</Link>
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

      <main className={Style.cart_main}>
        <h1>Ваша корзина</h1>

        <section className={`${Style.cart_products} ${Style.container}`}>
          {cart.length > 0 ? (
            cart.map((item, id) => (
              <Product
                key={id}
                props={item}
                refresh={{ state: refresh, setRefresh }}
              />
            ))
          ) : (
            <h2 style={{ textAlign: "center" }}>Вы ничего не заказали :(</h2>
          )}
        </section>

        <p className={Style.total_price}></p>

        <section className={Style.deliver_bg}>
          <section className={`${Style.container} ${Style.deliver}`}>
            <h2>Доставка</h2>
            <p>Укажите контактные данные и выберите способ доставки</p>

            <section className={Style.contact_fields}>
              <form>
                <p>Ваше Имя</p>
                <input placeholder="Укажите имя" type="text" />
              </form>

              <form>
                <p>Ваш телефон</p>
                <input placeholder="+375 (__) ___ - __ - __" type="text" />
              </form>
            </section>

            <form className={Style.deliver_type}>
              <p>Способ доставки</p>

              <section className={Style.deliver_variants}>
                <button
                  onClick={(e) => {
                    e.preventDefault();//событие нажатия на кнопку
                    setDeliverPrice(12);//добавление цены к общей стоимости
                  }}
                >
                  Доставка курьером по Минску
                  <br /> <span>12 руб.</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDeliverPrice(15);
                  }}
                >
                  Срочная доставка по Минску
                  <br /> <span>15 руб.</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDeliverPrice(20);
                  }}
                >
                  Доставка по Минской области
                  <br /> <span>20 руб.</span>
                </button>
              </section>
            </form>

            <form className={Style.adress}>
              <p>Адрес доставки</p>
              <input placeholder="Укажите адрес доставки" type="text" />
            </form>

            <form className={Style.deliver_date}>
              <p>Дата получения</p>
              <input type="date" />
            </form>
          </section>
        </section>

        <section className={`${Style.container} ${Style.total_info}`}>
          <p>
            Итоговая сумма заказа вместе с доставкой: <span>{totalPrice}p</span>
          </p>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Оформить заказ
          </button>
        </section>
      </main>
    </>
  );
}
