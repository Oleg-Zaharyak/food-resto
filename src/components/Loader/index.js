import React from "react";
import style from "./styles.module.scss";

export const Loader = () => {
  return (
    <div className={style.container}>
      <div className={style.loader}></div>
      <span className={style.text}> Loading ...</span>
    </div>
  );
};
