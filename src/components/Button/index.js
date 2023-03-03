import React from "react";
import style from "./styles.module.scss";

export const Button = ({ title, onClick, disabled, width }) => {
  return (
    <button
      onClick={onClick}
      className={style.button}
      disabled={disabled}
      style = {{width: width}}
    >
      {title}
    </button>
  );
};
