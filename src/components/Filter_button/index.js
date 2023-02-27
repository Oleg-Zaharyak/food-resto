import React from "react";
import style from "./styles.module.scss";

export const FilterButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      key={props.id}
      className={
        props.name === props.selected
          ? [style.button, style.active].join(" ")
          : style.button
      }
    >
      {props.name}
      <div className={style.button_before}></div>
    </button>
  );
};
