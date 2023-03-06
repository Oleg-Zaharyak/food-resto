import React from "react";
import style from "./styles.module.scss";
import defaultImage from "./../../assets/images/no-image-available.png";

export const AddPromotionModal = ({ title, showPromotionModal }) => {
  const CloseModal = () => {
    showPromotionModal(false);
  };
  return (
    <div className={style.main_container}>
      <div onClick={CloseModal} className={style.shadow_container}></div>
      <div className={style.content_container}>
        
        <img className={style.img} src={defaultImage} alt="promotion"></img>
        
      </div>
    </div>
  );
};
