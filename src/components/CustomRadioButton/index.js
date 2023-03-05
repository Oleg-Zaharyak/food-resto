import React from "react";
import style from "./styles.module.scss";

export const CustomRadioButton = ({
  name,
  value,
  id,
  selected,
  setTypeDelivery,
}) => {
    
  return (
    <div className={style.payment_type_checkbox}>
      <input
        className={style.input_typeDelivery}
        onChange={(el) => setTypeDelivery(el.target.value)}
        name={name}
        type="radio"
        id={id}
        value={value}
        checked={selected === value}
      />
      <label htmlFor={id} className={style.label_checkbox}>
        {!(selected === value) ? (
          <div className={style.label_checked_circle}></div>
        ) : (
          <svg
            className={style.label_checked_icon}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.8635 5.40362L6.81816 9.40362C6.69283 9.56828 6.49883 9.66562 6.29216 9.66695H6.2875C6.08283 9.66695 5.8895 9.57228 5.76283 9.41095L4.1415 7.33962C3.91483 7.05028 3.9655 6.63095 4.2555 6.40428C4.54483 6.17695 4.96483 6.22762 5.1915 6.51828L6.28016 7.90895L8.80283 4.59628C9.0255 4.30362 9.4435 4.24628 9.7375 4.46962C10.0302 4.69295 10.0868 5.11095 9.8635 5.40362ZM7.00016 0.333618C3.31816 0.333618 0.333496 3.31828 0.333496 7.00028C0.333496 10.6816 3.31816 13.667 7.00016 13.667C10.6822 13.667 13.6668 10.6816 13.6668 7.00028C13.6668 3.31828 10.6822 0.333618 7.00016 0.333618Z"
            />
          </svg>
        )}
        {value}
      </label>
    </div>
  );
};
