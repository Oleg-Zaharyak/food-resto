import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddItemCard } from "../../components/Add_item_card";
import { ItemCard } from "../../components/item_card";
import {
  getAllItems,
  getTypeDelivery,
  getTypeDishes,
} from "../../store/action/items";
import style from "./styles.module.scss";

export const SiteSetting = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getTypeDishes());
    dispatch(getTypeDelivery());
  }, [dispatch]);

  return (
    <div className={style.container}>
      {items.map((el, index) => (
        <ItemCard
          page={false}
          src={el.src}
          name={el.nameItem}
          price={el.price}
          bowl={el.bowls + " Bowls available"}
          key={index + 10}
          id={el.id}
        />
      ))}
      <AddItemCard />
    </div>
  );
};
