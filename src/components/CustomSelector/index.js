import React, { useEffect, useState } from "react";
import style from "./styles.module.scss";

export const CustomSelector = ({ selected, data, setTypeOf, name }) => {
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setType(selected);
  }, [selected]);
  const openTypeMenu = () => setOpen(!open);

  const chooseType = (event) => {
    setType(event.target.innerText);
    setOpen(false);
    if (setTypeOf) {
      setTypeOf({ target: { value: event.target.innerText, name: name } });
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
          style={{ transform: `rotate(${open ? 180 : 0}deg)` }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 13.3333C9.81001 13.3333 9.62084 13.2691 9.46667 13.1399L4.46667 8.97328C4.11334 8.67911 4.06501 8.15328 4.36001 7.79995C4.65417 7.44661 5.17917 7.39911 5.53334 7.69328L10.0092 11.4233L14.4775 7.82745C14.8358 7.53911 15.3608 7.59578 15.6492 7.95411C15.9375 8.31245 15.8808 8.83661 15.5225 9.12578L10.5225 13.1491C10.37 13.2716 10.185 13.3333 10 13.3333Z"
          />
        </svg>
        {type}
      </div>
      <div
        onClick={chooseType}
        style={{ display: open ? "block" : "none" }}
        className={style.option_container}
      >
        {data.map((el, index) => (
          <div key={index} className={style.option}>
            {el.name}
          </div>
        ))}
      </div>
    </div>
  );
};
