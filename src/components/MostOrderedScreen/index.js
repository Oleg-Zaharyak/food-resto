import React from "react";
import style from "./styles.module.scss";

export const MostOrderScreen = ({ title, data }) => {
  return (
    <div className={style.main_container}>
      <div className={style.main_text}>{title}</div>
      <div className={style.content_container}>
        {data.map((el, index) => (
          <div key={index} className={style.content_item}>
            <div className={style.item_image_name}>
              <img src={el.src} alt="img" className={style.item_img}></img>
              <div className={style.item_name}>{el.name}</div>
            </div>
            <div className={style.item_count}>{el.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
