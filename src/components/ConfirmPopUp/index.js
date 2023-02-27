import React from "react";
import style from "./styles.module.scss";

export const ConfirmPopUp = ({ title, confirmFunc, setShowPopUp }) => {
  const closePopUp = () => {
    setShowPopUp(false);
  };
  const confirmPopUp = () => {
    confirmFunc();
    setShowPopUp(false);
  };
  return (
    <div className={style.confirm_wrap}>
      <div onClick={closePopUp} className={style.confirm_wrap_blur} />
      <div className={style.confirm_container}>
        <div className={style.confirm_text}>{title}</div>
        <div className={style.confirm_button_ccontainer}>
          <button onClick={confirmPopUp} className={style.confirm_button}>
            Yes
          </button>
          <button onClick={closePopUp} className={style.confirm_button}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
