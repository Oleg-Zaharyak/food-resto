import React from "react";
import style from "./styles.module.scss";
import defaultImage from "./../../assets/images/no-image-available.png";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export const PromotionCard = () => {
  const navigate = useNavigate();
  return (
    <div className={style.main_container}>
      <img className={style.img} src={defaultImage} alt="promotion"></img>
      <Button title="Детальніше" onClick={() => navigate("/")} />
    </div>
  );
};
