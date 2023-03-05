import React, { useEffect, useState } from "react";
import style from "./styles.module.scss";
import { FilterButton } from "../../components/Filter_button";
import { ItemCard } from "../../components/item_card";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  getTypeDelivery,
  getTypeDishes,
} from "../../store/action/items";
// import { getCountOrder } from "../../store/action/orders";
import { NavLink } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();

  const { typeDishes, items } = useSelector((state) => state.items);
  const { basketData } = useSelector((state) => state.basket);
  const { promoCod } = useSelector((state) => state.orders);
  const [selected, setSelected] = useState("Піца");
  let price = 0;
  basketData.map((el) => (price += el.count * el.price));
  const totalPrice = (
    price - (promoCod.sale === 0 ? 0 : (price / 100) * promoCod.sale)
  ).toFixed();

  const onClick = (event) => {
    setSelected(event.target.innerText);
    dispatch(getItems(event.target.innerText));
  };
  useEffect(() => {
    dispatch(getItems(selected));
    dispatch(getTypeDishes());
    dispatch(getTypeDelivery());
    // dispatch(getCountOrder());
  }, [dispatch, selected]);

  return (
    <div className={style.container}>
      <div className={style.left_container_wrap}>
        <div className={style.left_container}>
          <div className={style.header_container}>
            <div className={style.header_text}>
              <div className={style.header_main_text}>Jaegar Resto</div>
            </div>
            <div className={style.header_right_container}>
              <div className={style.hover_container}>
                <NavLink
                  to={"/busket"}
                  className={({ isActive }) =>
                    isActive && window.location.pathname === "/busket"
                      ? style.active_busket
                      : style.link_busket_container
                  }
                >
                  <div className={style.busket_price}>{totalPrice} грн</div>
                  <svg
                    className={style.icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </NavLink>
              </div>
              <div className={style.search_container}>
                <input
                  type="text"
                  placeholder="Пошук за назвою"
                  className={style.search}
                ></input>
                <svg
                  className={style.search_icon}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.16667 9.16667C4.16667 6.40917 6.40917 4.16667 9.16667 4.16667C11.9242 4.16667 14.1667 6.40917 14.1667 9.16667C14.1667 11.9242 11.9242 14.1667 9.16667 14.1667C6.40917 14.1667 4.16667 11.9242 4.16667 9.16667M17.2558 16.0775L14.4267 13.2475C15.3042 12.1192 15.8333 10.705 15.8333 9.16667C15.8333 5.49083 12.8425 2.5 9.16667 2.5C5.49083 2.5 2.5 5.49083 2.5 9.16667C2.5 12.8425 5.49083 15.8333 9.16667 15.8333C10.705 15.8333 12.1192 15.3042 13.2475 14.4267L16.0775 17.2558C16.24 17.4183 16.4533 17.5 16.6667 17.5C16.88 17.5 17.0933 17.4183 17.2558 17.2558C17.5817 16.93 17.5817 16.4033 17.2558 16.0775"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={style.filter_container}>
            {typeDishes.map((item, index) => {
              return (
                <FilterButton
                  onClick={onClick}
                  name={item.name}
                  selected={selected}
                  key={index}
                />
              );
            })}
          </div>
          <div className={style.text_container}>
            <div className={style.text_block}>Виберіть страву</div>
          </div>
          <div className={style.content_container}>
            {items.map((el, index) => (
              <ItemCard
                page={true}
                src={el.src}
                name={el.nameItem}
                price={el.price}
                description={el.description}
                id={el.id}
                key={index + 10}
                imagePath={el.imagePath}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
