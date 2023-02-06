import React from "react";
import { OrderList } from "../Order_list";
import style from "./styles.module.scss";

export const Order = () => {
  const onClick = () => {
    document.getElementById("payment").style.display = "block";
  };
  return (
    <div className={style.container}>
      <div className={style.up_container}>
        <div className={style.top_container}>Order #324234</div>
        <div className={style.middle_container}>
          <input name="deliv" type="radio" id="dineIn" value="DineIn" />
          <label htmlFor="dineIn" className={style.delivery_button}>
            Dine In
          </label>
          <input name="deliv" type="radio" id="toGo" value="ToGo" />
          <label htmlFor="toGo" className={style.delivery_button}>
            To Go
          </label>
          <input name="deliv" type="radio" id="delivery" value="Delivery" />
          <label htmlFor="delivery" className={style.delivery_button}>
            Delivery
          </label>
        </div>
        <div className={style.bottom_container}>
          <div className={style.item}>Item</div>
          <div className={style.qty}>Qty</div>
          <div className={style.price}>Price</div>
        </div>
      </div>
      <OrderList />
      <button onClick={onClick} className={style.payment_button}>
        Continue to Payment
      </button>
    </div>
  );
};
