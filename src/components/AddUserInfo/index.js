import React, { useState } from "react";
import style from "./styles.module.scss";

export const AddUserInfo = ({ setShowPopUp, confirmFunc }) => {
  const [dataItem, setDataItem] = useState({});

  const addItemData = (event) => {
    const { name, value } = event.target;
    setDataItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closePopUp = () => {
    setShowPopUp(false);
  };
  const addData = () => {
    confirmFunc(dataItem);
  };

  return (
    <div className={style.wrap}>
      <div onClick={closePopUp} className={style.blur_wrap}></div>
      <div className={style.container}>
        <div className={style.container_title}>
          Pleace enter your information.
        </div>
        <label className={style.label}>
          Name
          <input
            name="userName"
            className={style.input}
            type="text"
            placeholder="Enter your name"
            onChange={addItemData}
          ></input>
        </label>
        <label className={style.label}>
          Phone number*
          <input
            name="phoneNumber"
            className={style.input}
            type="text"
            placeholder="Enter your phone number"
            onChange={addItemData}
          ></input>
        </label>
        <label className={style.label}>
          Address
          <input
            name="address"
            className={style.input}
            type="text"
            placeholder="Enter your address"
            onChange={addItemData}
          ></input>
        </label>
        <button onClick={addData} className={style.button}>
          Send
        </button>
      </div>
    </div>
  );
};
