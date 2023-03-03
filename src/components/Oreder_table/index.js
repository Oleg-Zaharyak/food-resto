import React from "react";
import style from "./styles.module.scss";

export const OrderTableItem = ({ data, headerText }) => {

  return (
    <div className={style.table_item_container}>
      <table className={style.table_container}>
        <thead className={style.table_header}>
          <tr className={style.table_header_row}>
            {headerText.map((el, index) => (
              <th key={index} className={style.table_header_column}>
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={style.table_body}>
          {data.map((el) => (
            <tr className={style.table_row}>
              <td className={style.table_column}>#{el.orderNumber}</td>
              <td className={style.table_column}>{el.totalPrise} $</td>
              <td className={style.table_column}>{el.typePayment}</td>
              <td className={style.table_column}>
                <div
                  className={[
                    style.table_status,
                    el.status === "Completed"
                      ? style.green_color
                      : data.status === "Pending"
                      ? style.orange_color
                      : style.purple_color,
                  ].join(" ")}
                >
                  {el.status}
                </div>
              </td>
              <td className={style.table_column}>{el.dataOrder}</td>
              <td className={style.table_column}>
                {el.name ? el.name : "Open info"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
