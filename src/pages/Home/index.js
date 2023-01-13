import React from "react";
import style from "./styles.module.scss";
import { OrderList } from "../../components/Order_list/index.js";

export const Home = () => {
  return (
    <div className={style.container}>
      <div className={style.left_container}></div>
      <OrderList />
    </div>
  );
};
