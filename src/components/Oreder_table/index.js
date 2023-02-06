import React from "react";
import style from "./styles.module.scss";

export const OrderTableItem = (props) => {
  return (
    <div className={style.table_item_container}>
      <div className={style.table_item_customer}>
        <div className={style.customer_icon}></div>
        {props.name}
      </div>
      <div className={style.table_item_menu}>{props.menu}</div>
      <div className={style.table_item_payment}>{props.payment}</div>
      <div
        className={[
          style.table_item_status,
          props.status === "Completed"
            ? style.green_color
            : props.status === "Pending"
            ? style.orange_color
            : style.purple_color,
        ].join(" ")}
      >
        {props.status}
      </div>
    </div>
  );
};
