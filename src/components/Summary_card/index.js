import React from "react";
import style from "./styles.module.scss";

export const SummaryCard = ({ title, iconName, count }) => {
  return (
    <div className={style.container}>
      <div className={style.container_wrap}>
        <div className={style.upper_container}>
          <img
            src={require(`./../../assets/images/${iconName}.svg`)}
            className={style.img}
            alt="Dolar"
          ></img>
          <div className={style.second_text}>{title}</div>
        </div>
        <div className={style.main_text}>{count}</div>
      </div>
    </div>
  );
};
