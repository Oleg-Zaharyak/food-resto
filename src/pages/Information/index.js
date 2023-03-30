import React from "react";
import style from "./styles.module.scss";

export const Information = () => {
  return (
    <div className={style.container}>
      <div className={style.header_text}>Інформація</div>
      <div className={style.content_block}>
        <div className={style.menu_container_wrap}>
          <div className={style.menu_container}></div>
        </div>
        <div className={style.content_container_wrap}>
          <div  className={style.content_container}></div>
        </div>
      </div>
    </div>
  );
};
