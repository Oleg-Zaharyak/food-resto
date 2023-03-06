import React from "react";
import style from "./styles.module.scss";

export const SummaryCard = (props) => {
  return (
    <div className={style.container}>
      <div className={style.upper_container}>
        <img
          src=""
          // src={require(`./../../assets/images/${props.src}.svg`)}
          className={style.img}
          alt={props.src}
        ></img>
        <div
          style={
            props.arrow === "GreenArrow"
              ? { color: "#50d1aa" }
              : { color: "#FF6471" }
          }
          className={style.procend}
        >
          {props.proc}
        </div>
        <img
          src=""
          // src={require(`./../../assets/images/${props.arrow}.svg`)}
          className={style.arrow_icon}
          alt={props.arrow}
        ></img>
      </div>
      <div className={style.main_text}>{props.sum}</div>
      <div className={style.second_text}>{props.name}</div>
    </div>
  );
};
