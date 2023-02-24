import React from "react";
import { useSelector } from "react-redux";
import style from "./styles.module.scss";

export const Loader = () => {
  const loadingState = useSelector((state) => state.loading);
  return (
    <div
      style={loadingState.loading ? { display: "flex" } : { display: "none" }}
      className={style.container}
    >
      <div className={style.loader}></div>
      <span className={style.text}> Loading ...</span>
    </div>
  );
};
