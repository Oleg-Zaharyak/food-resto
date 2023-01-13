import React from "react";
import style from "./styles.module.scss";
import img from "./../../assets/images/image4.png";

export const ItemCard = () => {
  return (
    <div className={style.container}>
      <div className={style.second_container}>
        <img src={img} alt="img" className={style.image} />
        <div className={style.text_block}>
          <span className={style.top_text}>Spicy seasoned seafood noodles</span>
          <span className={style.middle_text}>$ 2.29</span>
          <span className={style.bottom_text}>20 Bowls available</span>
        </div>
      </div>
    </div>
  );
};
