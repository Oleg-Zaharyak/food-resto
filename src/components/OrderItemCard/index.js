import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeCount, removeItem } from "../../store/slices/basketSlice";
import { ConfirmPopUp } from "../ConfirmPopUp";
import style from "./styles.module.scss";

export const OrderItemCard = ({ data, key }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();
  const summary = (data.count * data.price).toFixed();

  const deleteItem = () => {
    dispatch(removeItem(data.id));
  };

  const openPopUp = () => {
    setShowConfirmModal(true);
  };

  const handleDecrement = () => {
    if (data.count === 1) {
      setShowConfirmModal(true);
    } else {
      const obj = {
        id: data.id,
        increment: false,
      };
      dispatch(changeCount(obj));
    }
  };
  const handleIncrement = () => {
    const obj = {
      id: data.id,
      increment: true,
    };
    dispatch(changeCount(obj));
  };

  
  return (
    <div className={style.main_continer}>
      <div className={style.product_container}>
        <img src={data.src} alt="img1" className={style.product_image}></img>
        <div className={style.product_name}>{data.name}</div>
      </div>
      <div className={style.count_container}>
        <button onClick={handleDecrement} className={style.count_dec_button}>
          {data.count === 1 ? (
            <svg
              className={style.decrement_icon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          ) : (
            <svg
              className={style.decrement_icon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          )}
        </button>
        <div className={style.count_text}>{data.count}</div>
        <button onClick={handleIncrement} className={style.count_inc_button}>
          <svg
            className={style.increment_icon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />{" "}
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
          </svg>
        </button>
      </div>
      <div className={style.totalPrice_container}>
        <div onClick={openPopUp} className={style.delete_button}>
          <svg
            className={style.delete_icon}
            xmlns="http://www.w3.org/2000/svg"
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.9498 8.46447C17.3404 8.07394 17.3404 7.44078 16.9498 7.05025C16.5593 6.65973 15.9261 6.65973 15.5356 7.05025L12.0001 10.5858L8.46455 7.05025C8.07402 6.65973 7.44086 6.65973 7.05033 7.05025C6.65981 7.44078 6.65981 8.07394 7.05033 8.46447L10.5859 12L7.05033 15.5355C6.65981 15.9261 6.65981 16.5592 7.05033 16.9497C7.44086 17.3403 8.07402 17.3403 8.46455 16.9497L12.0001 13.4142L15.5356 16.9497C15.9261 17.3403 16.5593 17.3403 16.9498 16.9497C17.3404 16.5592 17.3404 15.9261 16.9498 15.5355L13.4143 12L16.9498 8.46447Z"
            />
          </svg>
        </div>
        <div className={style.totalPrice_text}>{summary} грн</div>
      </div>
      {showConfirmModal ? (
        <ConfirmPopUp
          title={"Підтвердити видалення?"}
          confirmFunc={deleteItem}
          setShowPopUp={setShowConfirmModal}
        />
      ) : null}
    </div>
  );
};
