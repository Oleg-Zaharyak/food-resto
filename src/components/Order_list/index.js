import React from "react";
import { useSelector } from "react-redux";
import { OrderItem } from "../Order_item";
import style from "./styles.module.scss";

export const OrderList = () => {
  const { basketData } = useSelector((state) => state.basket);
  let price = 0;
  basketData.map((el) => (price += el.count * el.price));
  const totalPrice = price.toFixed(2);
  return (
    <>
      <div className={style.item_container}>
        {basketData.map((elem, index) => (
          <OrderItem data={elem} key={index} />
        ))}
      </div>
      <div className={style.down_container}>
        <div className={style.summary_block}>
          <div className={style.discount}>Discount</div>
          <div className={style.discount_price}>$0</div>
          <div className={style.sub_total}>Sub total</div>
          <div className={style.sub_total_price}>$ {totalPrice}</div>
        </div>
      </div>
    </>
  );
};
