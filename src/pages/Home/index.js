import React, { useState } from "react";
import style from "./styles.module.scss";
import { Order } from "../../components/Order/index.js";
import { FilterButton } from "../../components/Filter_button";
import { ItemCard } from "../../components/item_card";
import { Payment } from "../../components/Payment_scren";

export const Home = () => {
  const filter_array = [
    "Hot Dishes",
    "Cold Dishes",
    "Soup",
    "Grill",
    "Appetizer",
    "Dessert",
  ];
  const [selected, setSelected] = useState("100button");
  const onClick = (event) => {
    setSelected(event.target.id);
  };
  const data = [
    {
      src: "Image1",
      name: "Spicy seasoned seafood noodles",
      price: "$" + 2.29,
      bowl: "20 Bowls available",
    },
    {
      src: "Image2",
      name: "Salted Pasta with mushroom sauce",
      price: "$" + 2.69,
      bowl: "10 Bowls available",
    },
    {
      src: "Image3",
      name: "Beef dumpling in hot and sour soup",
      price: "$" + 3.29,
      bowl: "18 Bowls available",
    },
    {
      src: "Image4",
      name: "Healthy noodle with spinach leaf",
      price: "$" + 4.99,
      bowl: "22 Bowls available",
    },
    {
      src: "Image5",
      name: "Hot spicy fried rice with omelet",
      price: "$" + 3.49,
      bowl: "27 Bowls available",
    },
    {
      src: "Image6",
      name: "Spicy instant noodle with special omelette",
      price: "$" + 7.0,
      bowl: "30 Bowls available",
    },
  ];
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
            {filter_array.map((item, index) => {
              return (
                <FilterButton
                  onClick={onClick}
                  name={item}
                  id={index + 100 + "button"}
                  selected={selected}
                />
              );
            })}
          </div>
          <div className={style.text_container}>
            <div className={style.text_block}>Choose Dishes</div>
            <div className={style.select_container}>
              <div className={style.select_option}>
                <svg
                  className={style.select_icon}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 13.3333C9.81001 13.3333 9.62084 13.2691 9.46667 13.1399L4.46667 8.97328C4.11334 8.67911 4.06501 8.15328 4.36001 7.79995C4.65417 7.44661 5.17917 7.39911 5.53334 7.69328L10.0092 11.4233L14.4775 7.82745C14.8358 7.53911 15.3608 7.59578 15.6492 7.95411C15.9375 8.31245 15.8808 8.83661 15.5225 9.12578L10.5225 13.1491C10.37 13.2716 10.185 13.3333 10 13.3333Z"
                  />
                </svg>
                Dine In
              </div>
              <div className={style.option_container}>
                <div className={style.option}>Dine In</div>
                <div className={style.option}>Out</div>
                <div className={style.option}>Pedro</div>
              </div>
            </div>
          </div>
          <div className={style.content_container}>
            {data.map((el, index) => (
              <ItemCard
                src={el.src}
                name={el.name}
                price={el.price}
                bowl={el.bowl}
                key={index + 10}
              />
            ))}
          </div>
        </div>
      </div>
      <Order />
      <div className={style.payment_container}>
        <Payment />
      </div>
    </div>
  );
};
