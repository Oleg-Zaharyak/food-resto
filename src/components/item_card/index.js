import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteDishes,
  getDishesById,
  updateDishes,
} from "../../store/action/items";
import { addItem } from "../../store/slices/basketSlice";
import { AddItemCardModal } from "../AddItemCardModal";
import { ConfirmPopUp } from "../ConfirmPopUp";
import style from "./styles.module.scss";

export const ItemCard = (props) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddItemCardModal, setShowAddItemCardModal] = useState(false);

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => (count > 1 ? setCount(count - 1) : setCount(1));

  const onClick = () => {
    let obj = {
      name: props.name,
      price: props.price,
      bowls: props.bowl,
      src: props.src,
      count: count,
      imagePath: props.imagePath,
      id: props.id,
    };
    setCount(1);
    dispatch(addItem(obj));
  };

  const deleteCard = () => {
    dispatch(deleteDishes({ id: props.id, imagePath: props.imagePath }));
  };
  const changeCard = () => {
    dispatch(getDishesById(props.id));
    setShowAddItemCardModal(true);
  };

  const changeCardItem = (el) => {
    dispatch(updateDishes({ data: el, id: props.id }));
  };

  return (
    <div className={style.container}>
      <div className={style.second_container}>
        <img src={props.src} alt="img" className={style.image} />
        <div className={style.text_block}>
          <span className={style.top_text}>{props.name}</span>
          <span className={style.middle_text}>$ {props.price}</span>
          <span className={style.bottom_text}>{props.bowl}</span>
        </div>
        <div className={style.shadow_container}>
          {props.page ? (
            <>
              <div className={style.count_container}>
                <button
                  onClick={handleDecrement}
                  className={style.count_button}
                >
                  <svg
                    className={style.decrement_icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />{" "}
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                </button>
                <div className={style.count_text}>{count}</div>
                <button
                  onClick={handleIncrement}
                  className={style.count_button}
                >
                  <svg
                    className={style.increment_icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />{" "}
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
                  </svg>
                </button>
              </div>
              <button onClick={onClick} className={style.buy_button}>
                <svg
                  className={style.icon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </button>
            </>
          ) : (
            <div className={style.setting_button_container}>
              <button onClick={changeCard} className={style.change_button}>
                <svg
                  className={style.change_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />{" "}
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                </svg>
              </button>
              <button
                onClick={() => setShowConfirmModal(true)}
                className={style.delete_button}
              >
                <svg
                  className={style.delete_icon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.8789 8.71882L18.9784 8.72017C19.3475 8.75069 19.6304 9.05716 19.65 9.42605L19.6405 9.63174L19.326 13.483L18.9961 17.2414C18.9263 17.9917 18.8638 18.6245 18.8099 19.1227C18.6225 20.8588 17.4955 21.9323 15.7966 21.9641C13.1494 22.013 10.6048 22.0125 8.13373 21.9591C6.48398 21.9244 5.37366 20.8393 5.18955 19.1297L5.0623 17.8702L4.83994 15.427L4.61216 12.7461L4.35172 9.52788C4.31935 9.11498 4.61951 8.75335 5.02215 8.72016C5.39123 8.68973 5.7183 8.94584 5.79519 9.30677L5.82511 9.60173L6.06966 12.6187L6.33669 15.7459C6.45646 17.0996 6.56034 18.1952 6.64346 18.9648C6.74838 19.939 7.26138 20.4404 8.16411 20.4593C10.6159 20.5124 13.1415 20.5129 15.7701 20.4643C16.7277 20.4464 17.2488 19.9499 17.356 18.9574L17.4827 17.7046C17.5198 17.3185 17.5594 16.8923 17.6013 16.4293L17.8686 13.3538L18.1906 9.4075C18.2204 9.02902 18.5192 8.7389 18.8789 8.71882ZM3.73139 6.98918C3.32745 6.98918 3 6.65338 3 6.23916C3 5.85945 3.27515 5.54564 3.63214 5.49597L3.73139 5.48913H6.91772C7.29636 5.48913 7.62785 5.23928 7.74642 4.87929L7.77543 4.76813L8.02304 3.50533C8.24111 2.66897 8.9492 2.07349 9.779 2.00633L9.93592 2H14.0639C14.9075 2 15.6523 2.54628 15.9391 3.39039L15.9874 3.55209L16.2243 4.76783C16.2987 5.14872 16.6025 5.4332 16.9701 5.48177L17.0821 5.48913H20.2686C20.6725 5.48913 21 5.82493 21 6.23916C21 6.61887 20.7248 6.93267 20.3679 6.98234L20.2686 6.98918H3.73139ZM14.0639 3.50006H9.93592C9.7307 3.50006 9.54829 3.62322 9.47252 3.77803L9.44682 3.84604L9.20979 5.06238C9.1808 5.21084 9.13879 5.3538 9.08512 5.49012L14.9148 5.49031C14.8813 5.40526 14.8523 5.31763 14.8282 5.22768L14.79 5.06208L14.5636 3.8928C14.5107 3.68991 14.3473 3.54138 14.1502 3.50742L14.0639 3.50006Z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      {showConfirmModal ? (
        <ConfirmPopUp
          title={"Confirm delete dishes?"}
          confirmFunc={deleteCard}
          setShowPopUp={setShowConfirmModal}
        />
      ) : null}
      {showAddItemCardModal ? (
        <AddItemCardModal
          title={"Change item"}
          setShowAddItemModal={setShowAddItemCardModal}
          confirmFunc={changeCardItem}
        />
      ) : null}
    </div>
  );
};
