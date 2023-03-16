import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles.module.scss";
import { MostOrderScreen } from "../../components/MostOrderedScreen";
import { ConfirmPopUp } from "../ConfirmPopUp";
import { useUserAdmin } from "./../../hooks/use-auth";
import { changeOrderStatusTo } from "../../store/action/orders";
import { CustomSelector } from "../CustomSelector";
import { setDefaultStatus } from "../../store/slices/statisticSlice";

export const OrderInfoScreen = ({
  setShowPopUp,
  blockChangeStatus = false,
}) => {
  const dispatch = useDispatch();
  const { adminLogin } = useUserAdmin();
  const { orderById } = useSelector((state) => state.orders);
  const [showSelectedPopUp, setShowSelectedPopUp] = useState(false);
  const [orderStatus, setOrderStatus] = useState();
  const ordersStatusData = [
    { name: "Очікує" },
    { name: "Приготування" },
    { name: "Завершено" },
    { name: "Скасовано" },
  ];

  const addItemData = (event) => {
    const { value } = event.target;
    setShowSelectedPopUp(true);
    setOrderStatus(value);
  };
  const changeStatus = () => {
    dispatch(changeOrderStatusTo({ status: orderStatus, id: orderById.id }));
    dispatch(setDefaultStatus(orderStatus));
    setShowPopUp(false);
  };

  const closeInfoScreen = () => {
    setShowPopUp(false);
  };

  return (
    <div className={style.wrap}>
      <div onClick={closeInfoScreen} className={style.blur_wrap}></div>
      <div className={style.main_wrap}>
        <div className={style.main_container}>
          <button className={style.exit_button}>
            <svg
              onClick={closeInfoScreen}
              className={style.exit_icon}
              xmlns="http://www.w3.org/2000/svg"
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
          <div className={style.headerBlock}>
            <div className={style.headerBlock_text}>Замовлення:</div>
            {adminLogin && blockChangeStatus ? (
              <div className={style.status_block_selector}>
                <CustomSelector
                  selected={orderById?.status}
                  data={ordersStatusData}
                  setTypeOf={addItemData}
                  name={"status"}
                />
              </div>
            ) : (
              <div className={style.status_block}>
                <div className={style.status_block_text}> Статус: </div>
                <div
                  className={[
                    style.status,
                    orderById.status === "Очікує"
                      ? style.orang_status
                      : orderById.status === "Приготування"
                      ? style.purple_status
                      : orderById.status === "Завершено"
                      ? style.green_status
                      : style.red_status,
                  ].join(" ")}
                >
                  {orderById.status}
                </div>
              </div>
            )}
          </div>
          <div className={[style.userName, style.info_block].join(" ")}>
            <div className={style.info_block_head}>Ім'я користувача:</div>
            <div className={style.info_block_text}>{orderById.userName}</div>
          </div>
          <div className={[style.phoneNumber, style.info_block].join(" ")}>
            <div className={style.info_block_head}>Телефон:</div>
            <div className={style.info_block_text}>{orderById.phoneNumber}</div>
          </div>
          <div className={[style.address, style.info_block].join(" ")}>
            <div className={style.info_block_head}>
              {orderById.restourantsAddress ? "Адреса магазину:" : "Адреса:"}
            </div>
            <div className={style.info_block_text}>
              {orderById.restourantsAddress
                ? orderById.restourantsAddress
                : orderById.city}
              , {orderById.street}, {orderById.buildNumber}
            </div>
          </div>
          <div className={[style.delivery, style.info_block].join(" ")}>
            <div className={style.info_block_head}>Тип доставки:</div>
            <div className={style.info_block_text}>
              {orderById.typeDelivery}
            </div>
          </div>
          <div className={[style.payment, style.info_block].join(" ")}>
            <div className={style.info_block_head}>Тип оплати:</div>
            <div className={style.info_block_text}>{orderById.typePayment}</div>
          </div>
          <div className={[style.timeData, style.info_block].join(" ")}>
            <div className={style.info_block_head}>Дата / час:</div>
            <div className={style.info_block_text}>{orderById.timeOrder}</div>
          </div>
          <div className={[style.orderNote, style.info_block].join(" ")}>
            <div className={style.info_block_head}>Коментар:</div>
            <div className={style.info_block_text}>{orderById.orderNote}</div>
          </div>
          <div className={style.orderMenu}>
            <MostOrderScreen
              title="Замовлення:"
              data={orderById.menu !== undefined ? orderById.menu : []}
            />
          </div>
          <div className={[style.sale, style.info_block].join(" ")}>
            <div className={style.info_block_head}>Знижка:</div>
            <div className={style.info_block_text}>
              {orderById.saleAmont} грн.
            </div>
          </div>
          <div className={[style.totalPrice, style.info_block].join(" ")}>
            <div className={style.info_block_head}>Разом:</div>
            <div className={style.info_block_text}>
              {orderById.totalPrice} грн.
            </div>
          </div>
        </div>
      </div>
      {showSelectedPopUp ? (
        <ConfirmPopUp
          title="Змінити статус?"
          setShowPopUp={setShowSelectedPopUp}
          confirmFunc={changeStatus}
        />
      ) : null}
    </div>
  );
};
