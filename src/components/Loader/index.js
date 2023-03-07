import React from "react";
import { useSelector } from "react-redux";
import style from "./styles.module.scss";

export const Loader = () => {
  const { loading } = useSelector((state) => state.loading);
  return (
    <div
      style={loading ? { display: "flex" } : { display: "none" }}
      className={style.container}
    >
      <div className={style.loader}></div>
      <span className={style.text}> Завантаження ...</span>
    </div>
  );
};
