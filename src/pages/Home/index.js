import React, { useEffect, useState } from "react";
import style from "./styles.module.scss";
import { Order } from "../../components/Order/index.js";
import { FilterButton } from "../../components/Filter_button";
import { ItemCard } from "../../components/item_card";
import { Payment } from "../../components/Payment_scren";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  getTypeDelivery,
  getTypeDishes,
} from "../../store/action/items";

export const Home = () => {
  const dispatch = useDispatch();
  const [showPaimantScreen, setShowPaymantScreen] = useState(false);

  const { typeDishes } = useSelector((state) => state.items);
  const { items } = useSelector((state) => state.items);
  const { basketData } = useSelector((state) => state.basket);

  const [selected, setSelected] = useState("Cold Dishes");

  const onClick = (event) => {
    setSelected(event.target.innerText);
    dispatch(getItems(event.target.innerText));
  };
  useEffect(() => {
    dispatch(getItems(selected));
    dispatch(getTypeDishes());
    dispatch(getTypeDelivery());
  }, [dispatch, selected]);

  return (
    <div className={style.container}>
      <div className={style.left_container_wrap}>
        <div className={style.left_container}>
          <div className={style.header_container}>
            <div className={style.header_text}>
              <div className={style.header_main_text}>Jaegar Resto</div>
              <div className={style.header_second_text}>
                Tuesday, 2 Feb 2021
              </div>
            </div>
            <div className={style.search_container}>
              <input
                type="text"
                placeholder="Search for food, coffe, etc.."
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
            <div className={style.text_block}>Choose Dishes</div>
          </div>
          <div className={style.content_container}>
            {items.map((el, index) => (
              <ItemCard
                page={true}
                src={el.src}
                name={el.nameItem}
                price={el.price}
                bowl={el.bowls + " Bowls available"}
                id={el.id}
                key={index + 10}
              />
            ))}
          </div>
        </div>
      </div>
      {basketData.length ? (
        <Order setShowPaymant={setShowPaymantScreen} />
      ) : null}
      {showPaimantScreen ? (
        <div className={style.payment_container}>
          <Payment setShowPaymant={setShowPaymantScreen} />
        </div>
      ) : null}
    </div>
  );
};
