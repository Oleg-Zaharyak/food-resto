import React from "react";
import { OrderItem } from "../Order_item";
import style from "./styles.module.scss";

export const OrderList = () => {
  const item_arr = [
    { name: "Spicy seasoned sea...", price: 2.25 },
    { name: "Salted pasta with mu...", price: 3.0 },
    { name: "Spicy seasoned sea...", price: 2.25 },
    { name: "Salted pasta with mu...", price: 3.0 },
    { name: "Salted pasta with mu...", price: 3.0 },
  ];
  return (
    <>
      <div className={style.item_container}>
        {item_arr.map((elem,index) => (
          <OrderItem data={elem} key={index}/>
        ))}
      </div>
      <div className={style.down_container}>
        <div className={style.summary_block}>
          <div className={style.discount}>Discount</div>
          <div className={style.discount_price}>$0</div>
          <div className={style.sub_total}>Sub total</div>
          <div className={style.sub_total_price}>$23.65</div>
        </div>
      </div>
    </>
  );
};
