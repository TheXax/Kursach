import { useDispatch } from "react-redux";

import {
  removeFromCart,
  changeProductCount,
} from "../../assets/Redux/slices/cart";

import Style from "../MainStyle.module.scss";

export default function Product({ props, refresh }) {
  const dispatch = useDispatch();

  return (
    <section className={Style.item}>
      <img src={`http://localhost:5173/src/assets/${props?.img}`} />

      <section className={Style.sub_item}>
        <section className={Style.main_product_info}>
          <h2>{props?.title}</h2>
          <section className={Style.count}></section> 
        </section>

        <section className={Style.order_info}>
          <section className={Style.counter}>
            <button
              onClick={() => {
                dispatch(changeProductCount({ ...props, growth: -1 }));
                refresh.setRefresh(!refresh.state);
              }}
            >
              <svg
                width="10"
                height="3"
                viewBox="0 0 10 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.559375 2.29173V0.401728H9.31938V2.29173H0.559375Z"
                  fill="black"
                />
              </svg>
            </button>

            <p>{props.count}</p>
            <button
              onClick={() => {
                dispatch(changeProductCount({ ...props, growth: 1 }));
                refresh.setRefresh(!refresh.state);
              }}
            >
              <svg
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.32555 5.03173V6.71173H5.60555V10.7617H3.71555V6.71173H-0.00445309V5.03173H3.71555V0.981728H5.60555V5.03173H9.32555Z"
                  fill="black"
                />
              </svg>
            </button>
          </section>

          <p className={Style.item_price}>
            Цена: <span>{props?.price}</span>
          </p>
        </section>
      </section>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="24"
        viewBox="0 0 21 24"
        fill="none"
        onClick={() => {
          dispatch(removeFromCart(props));
        }}
        className={Style.delete_item}
      >
        <line
          x1="1.11786"
          y1="2.0682"
          x2="19.1179"
          y2="22.1858"
          stroke="black"
          strokeWidth="3"
        />
        <line
          x1="19.0253"
          y1="0.945527"
          x2="2.00909"
          y2="21.9019"
          stroke="black"
          strokeWidth="3"
        />
      </svg>
    </section>
  );
}
