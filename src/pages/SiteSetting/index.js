import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddItemCard } from "../../components/Add_item_card";
import { FilterButton } from "../../components/Filter_button";
import { ItemCard } from "../../components/item_card";
import {
  getItems,
  getTypeDelivery,
  getTypeDishes,
} from "../../store/action/items";
import style from "./styles.module.scss";

export const SiteSetting = () => {
  const dispatch = useDispatch();
  const { items, typeDishes } = useSelector((state) => state.items);

  const [selected, setSelected] = useState("Піца");

  const onClick = (event) => {
    setSelected(event.target.innerText);
    dispatch(getItems(event.target.innerText));
  };

  useEffect(() => {
    dispatch(getItems(selected));
    dispatch(getTypeDishes());
    dispatch(getTypeDelivery());
  }, [dispatch, selected]);

  return (
    <div className={style.wrap}>
      <div className={style.header}>
        <div className={style.header_up_container}>
          <div className={style.header_text}>Налаштування</div>
          <AddItemCard />
        </div>
        <div className={style.filter_container}>
          {typeDishes.map((item, index) => {
            return (
              <FilterButton
                onClick={onClick}
                name={item.name}
                selected={selected}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className={style.container}>
        {items.map((el, index) => (
          <ItemCard
            page={false}
            src={el.src}
            name={el.nameItem}
            price={el.price}
            description={el.description}
            key={index + 10}
            id={el.id}
            imagePath={el.imagePath}
          />
        ))}
      </div>
    </div>
  );
};
