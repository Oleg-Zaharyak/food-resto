import React, { useState } from "react";
import style from "./styles.module.scss";

export const TypeDelivery = ({ data, setTypeOf }) => {
  const [type, setType] = useState({ name: "Choose type", id: "chooseType" });
  const [open, setOpen] = useState(false);

  const openTypeMenu = () => (open ? setOpen(false) : setOpen(true));

  const chooseType = (event) => {
    const { innerText, id } = event.target;
    setType({ name: innerText, id: id });
    setOpen(false);
    if (setTypeOf) {
      setTypeOf(id);
    }
  };
  
  return (
    <div className={style.select_container}>
      <div
        id={"deliveryType"}
        className={style.select_option}
        onClick={openTypeMenu}
      >
        <svg
          className={style.select_icon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          style={
            open ? { transform: "rotate(180deg)" } : { transform: "rotate(0)" }
          }
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 13.3333C9.81001 13.3333 9.62084 13.2691 9.46667 13.1399L4.46667 8.97328C4.11334 8.67911 4.06501 8.15328 4.36001 7.79995C4.65417 7.44661 5.17917 7.39911 5.53334 7.69328L10.0092 11.4233L14.4775 7.82745C14.8358 7.53911 15.3608 7.59578 15.6492 7.95411C15.9375 8.31245 15.8808 8.83661 15.5225 9.12578L10.5225 13.1491C10.37 13.2716 10.185 13.3333 10 13.3333Z"
          />
        </svg>
        {type.name}
      </div>
      <div
        onClick={chooseType}
        style={open ? { display: "block" } : { display: "none" }}
        className={style.option_container}
      >
        {data.map((el, index) => (
          <div key={index} id={el.id} className={style.option}>
            {el.name}
          </div>
        ))}
      </div>
    </div>
  );
};