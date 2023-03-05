import React, { useState } from "react";
import style from "./styles.module.scss";

import { useDispatch } from "react-redux";
import { AddItemCardModal } from "../AddItemCardModal";
import { addNewDishes } from "../../store/action/items";
import { Button } from "../Button";

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
      <Button title="Додати нову страву" onClick={showAddItemModal} />
      {showAddItemCardModal ? (
        <AddItemCardModal
          title={"Додати нову страву"}
          setShowAddItemModal={setShowAddItemCardModal}
          confirmFunc={addNewCardItem}
        />
      ) : null}
    </div>
  );
};
