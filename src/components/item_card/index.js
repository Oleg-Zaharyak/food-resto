import React from "react";
import style from "./styles.module.scss";

export const ItemCard = (props) => {
  return (
    <div className={style.container}>
      <div className={style.second_container}>
        <img
          src={require(`./../../assets/images/${props.src}.png`)}
          alt="img"
          className={style.image}
        />
        <div className={style.text_block}>
          <span className={style.top_text}>{props.name}</span>
          <span className={style.middle_text}>{props.price}</span>
          <span className={style.bottom_text}>{props.bowl}</span>
        </div>
      </div>
    </div>
  );
};
