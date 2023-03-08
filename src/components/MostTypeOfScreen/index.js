import React from "react";
import { useSelector } from "react-redux";
import style from "./styles.module.scss";

export const MostTypeOfScreen = () => {
  const { typeOfOrders } = useSelector((state) => state.statistic);

  return (
    <div className={style.main_continer}>
      <div className={style.second_container}>
        <div className={style.header_text}>Тип доставки:</div>
        <div className={style.block}>
          <div className={style.block_text}>Доставка</div>
          <div className={style.block_count}>{typeOfOrders.typeDelivery}</div>
        </div>
        <div className={style.block}>
          <div className={style.block_text}>Самовивіз</div>
          <div className={style.block_count}>{typeOfOrders.typeOut}</div>
        </div>
      </div>
      <div className={style.second_container}>
        <div className={style.header_text}>Тип оплати</div>
        <div className={style.block}>
          <div className={style.block_text}>Готівка</div>
          <div className={style.block_count}>{typeOfOrders.typeCash}</div>
        </div>
        <div className={style.block}>
          <div className={style.block_text}>Онлайн</div>
          <div className={style.block_count}>{typeOfOrders.typeOnline}</div>
        </div>
        <div className={style.block}>
          <div className={style.block_text}>Карткою</div>
          <div className={style.block_count}>{typeOfOrders.typeCard}</div>
        </div>
      </div>
    </div>
  );
};
