import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import style from "./styles.module.scss";

export const Basket = () => {
  const navigate = useNavigate();
  const { basketData } = useSelector((state) => state.basket);
  return (
    <div className={style.main_wrap}>
      {basketData.length ? (
        <div className={style.main_container}>
            
        </div>
      ) : (
        <div className={style.empty_busket}>
          <div className={style.empty_busket_text}>Busket is empty</div>
          <Button title="Return home" onClick={() => navigate("/")} />
        </div>
      )}
    </div>
  );
};
