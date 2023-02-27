import React, { useState } from "react";
import style from "./styles.module.scss";

import { useDispatch } from "react-redux";
import { AddItemCardModal } from "../AddItemCardModal";
import { addNewDishes } from "../../store/action/items";

export const AddItemCard = (props) => {
  const dispatch = useDispatch();
  const [showAddItemCardModal, setShowAddItemCardModal] = useState(false);
  const showAddItemModal = () => {
    setShowAddItemCardModal(true);
  };
  const addNewCardItem = (el) => {
    dispatch(addNewDishes(el));
  };

  return (
    <div className={style.wrap}>
      <div className={style.container} onClick={showAddItemModal}>
        <svg
          className={style.add_icon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />{" "}
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
        </svg>
      </div>
      {showAddItemCardModal ? (
        <AddItemCardModal
          title={"Add new dishes"}
          setShowAddItemModal={setShowAddItemCardModal}
          confirmFunc={addNewCardItem}
        />
      ) : null}
    </div>
  );
};
