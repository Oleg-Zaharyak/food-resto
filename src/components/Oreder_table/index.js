import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getOrderById } from "../../store/action/orders";
import { OrderInfoScreen } from "../ViewOrderInfoScreen";
import style from "./styles.module.scss";

export const OrderTableItem = ({ data }) => {
  const dispatch = useDispatch();
  const [showOrderInfoScreen, setShowOrderInfoScreen] = useState(false);

  const openOrderInfo = (el) => {
    console.log(el);
    dispatch(getOrderById(el));
    setShowOrderInfoScreen(true);
  };
  return (
    <div className={style.wrap}>
      <table className={style.table_item_container}>
        <thead className={style.thead}>
          <tr className={style.header}>
            <th className={style.number_header}>№</th>
            <th className={style.userName_header}>Користувач</th>
            <th className={style.totalPrice_header}>Сума </th>
            <th className={style.data_header}>Дата </th>
            <th className={style.status_header}>Статус</th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {data.map((el, index) => (
            <tr
              onClick={() => openOrderInfo(el.id)}
              key={index}
              className={style.body}
            >
              <td className={style.number_body}>{index + 1}</td>
              <td className={style.userName_body}>{el.userName}</td>
              <td className={style.totalPrice_body}>{el.totalPrice} грн.</td>
              <td className={style.data_body}>{el.timeOrder}</td>
              <td className={style.status_body}>
                <span
                  className={[
                    style.status_body_text,
                    el.status === "Очікує"
                      ? style.orang_status
                      : el.status === "Приготування"
                      ? style.purple_status
                      : el.status === "Завершено"
                      ? style.green_status
                      : style.red_status,
                  ].join(" ")}
                >
                  {el.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showOrderInfoScreen ? (
        <OrderInfoScreen setShowPopUp={setShowOrderInfoScreen} />
      ) : null}
    </div>
  );
};
