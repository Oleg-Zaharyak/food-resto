import React, { useState } from "react";
import style from "./styles.module.scss";
import { TypeDelivery } from "../Type_delivery";
import { useDispatch, useSelector } from "react-redux";
import { serClearChangeItem } from "../../store/slices/itemsSlice";
import { uploadPhoto } from "../../store/action/items";
import defaultImage from "./../../assets/images/no_photo.png";

export const AddItemCardModal = ({
  title,
  setShowAddItemModal,
  confirmFunc,
}) => {
  const dispatch = useDispatch();
  const { typeDelivery, typeDishes, changeItem } = useSelector(
    (state) => state.items
  );
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [dataItem, setDataItem] = useState({});

  const addItemData = (event) => {
    const { name, value } = event.target;
    setDataItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closePopUp = () => {
    setShowAddItemModal(false);
    dispatch(serClearChangeItem());
    setImage(null);
  };

  const UploadFfile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setUrl(url);
    }
  };

  const callbeck = (e) => {
    if (e) {
      dataItem.src = e.url;
      dataItem.imagePath = e.path;
    }
    confirmFunc(dataItem);
    setImage(null);
  };

  const addNewItem = () => {
    dispatch(uploadPhoto({ image: image, callbeck: callbeck }));
    setShowAddItemModal(false);
    dispatch(serClearChangeItem());
  };

  return (
    <div className={style.wrap_shadow}>
      <div onClick={closePopUp} className={style.confirm_wrap_blur}></div>

      <div className={style.data_container}>
        <div className={style.images_container}>
          <img
            className={style.current_image}
            src={url ? url : changeItem.src ? changeItem.src : defaultImage}
            alt="imag"
          ></img>
        </div>
        <div className={style.input_images_container}>
          <label className={style.lable_upload_image}>
            {image ? image.name : "Press to load image"}
            <input
              type="file"
              name="src"
              onChange={UploadFfile}
              className={style.input_image}
            ></input>
          </label>
        </div>
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
        <div className={style.add_new_item_text}>{title}</div>
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
          <TypeDelivery
            selected={changeItem.typeDelivery}
            data={typeDelivery}
            setTypeOf={addItemData}
            name={"typeDelivery"}
          />
        </div>
        <div className={style.type_dishes}>
          <div className={style.type_text}>Select type of dishes</div>
          <TypeDelivery
            selected={changeItem.typeDishes}
            data={typeDishes}
            setTypeOf={addItemData}
            name={"typeDishes"}
          />
        </div>
        <button onClick={addNewItem} className={style.add_button}>
          {title}
        </button>
      </div>
    </div>
  );
};
