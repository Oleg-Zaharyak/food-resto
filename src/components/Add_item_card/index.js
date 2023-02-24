import React, { useState } from "react";
import style from "./styles.module.scss";
import { TypeDelivery } from "../Type_delivery";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewDishes,
  getTypeDishes,
  updateDishes,
} from "../../store/action/items";
import { setChangeItem } from "../../store/slices/itemsSlice";

export const AddItemCardData = ({ id }) => {
  const dispatch = useDispatch();
  const data_delivery = [
    { name: "Dine In", id: "dineIn" },
    { name: "Out", id: "out" },
    { name: "Delivery", id: "delivery" },
  ];
  const { typeDishes } = useSelector((state) => state.items);
  const { changeItem } = useSelector((state) => state.items);
  const { deleteItem } = useSelector((state) => state.items);

  const closePopUp = () => {
    document.getElementById("addItemData").style.display = "none";
    document.getElementById("changeCardData").style.display = "none";
    dispatch(
      setChangeItem({
        nameItem: "",
        src: "",
        bowls: "",
        price: "",
        typeDishes: "Choose Dishes",
        typeDelivery: "Choose Delivery",
      })
    );
  };

  const [dataItem, setDataItem] = useState({});

  const setTypeDelivery = (el) => {
    const typeDelivery = "typeDelivery";
    setDataItem((prevState) => ({
      ...prevState,
      [typeDelivery]: el,
    }));
  };
  const setTypeDishes = (el) => {
    const typeDishes = "typeDishes";
    setDataItem((prevState) => ({
      ...prevState,
      [typeDishes]: el,
    }));
  };

  const addItemData = (event) => {
    const { name, value } = event.target;
    setDataItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addNewItem = () => {
    if (id === "addItemData") {
      dispatch(addNewDishes(dataItem));
    }
    if (id === "changeCardData") {
      dispatch(updateDishes({ data: dataItem, id: deleteItem }));
    }
    document.getElementById("addItemData").style.display = "none";
  };

  // console.log(changeItem.typeDishes);

  return (
    <div id={id} className={style.wrap_shadow}>
      <div className={style.data_container}>
        <button onClick={closePopUp} className={style.exit_button}>
          <svg
            className={style.exit_icon}
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
        </button>
        <div className={style.add_new_item_text}>Add new item</div>
        <div className={style.name_input}>
          <label className={style.lable}>
            Name
            <input
              type="text"
              name="nameItem"
              placeholder="Enter dishes name"
              defaultValue={changeItem.nameItem}
              onChange={addItemData}
              className={style.input}
            ></input>
          </label>
        </div>
        <div className={style.src_input}>
          <label className={style.lable}>
            Src
            <input
              onChange={addItemData}
              name="src"
              type="text"
              defaultValue={changeItem.src}
              placeholder="Enter photo src"
              className={style.input}
            ></input>
          </label>
        </div>
        <div className={style.price_input}>
          <label className={style.lable}>
            Price
            <input
              onChange={addItemData}
              name="price"
              type="number"
              defaultValue={changeItem.price}
              placeholder="Enter dishes price"
              className={style.input}
            ></input>
          </label>
        </div>
        <div className={style.bowls_input}>
          <label className={style.lable}>
            Bowls
            <input
              onChange={addItemData}
              name="bowls"
              type="number"
              defaultValue={changeItem.bowls}
              placeholder="Enter dishes bowls"
              className={style.input}
            ></input>
          </label>
        </div>
        <div className={style.type_delivery}>
          <div className={style.type_text}>Select type of delivery</div>
          <TypeDelivery data={data_delivery} setTypeOf={setTypeDelivery} />
        </div>
        <div className={style.type_dishes}>
          <div className={style.type_text}>Select type of dishes</div>
          <TypeDelivery data={typeDishes} setTypeOf={setTypeDishes} />
        </div>
        <button onClick={addNewItem} className={style.add_button}>
          {id === "addItemData" ? "Add Item" : "Change Item"}
        </button>
      </div>
    </div>
  );
};

export const AddItemCard = (props) => {
  const dispatch = useDispatch();

  const openPopUp = () => {
    document.getElementById("addItemData").style.display = "flex";
    dispatch(getTypeDishes());
  };

  return (
    <div className={style.wrap}>
      <div className={style.container} onClick={openPopUp}>
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
      <AddItemCardData id={"addItemData"} />
    </div>
  );
};
