import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { ConfirmPopUp } from "../../components/ConfirmPopUp";
import { CustomRadioButton } from "../../components/CustomRadioButton";
import { InfoPopUp } from "../../components/InfoPopUp";
import { OrderItemCard } from "../../components/OrderItemCard";
import { CustomSelector } from "../../components/CustomSelector";
import {
  checkPromoCod,
  createOrder,
  getRestourantsAddress,
} from "../../store/action/orders";
import { cleanPromoOrder } from "../../store/slices/ordersSlice";
import style from "./styles.module.scss";
import { cleanBasket } from "../../store/slices/basketSlice";
import { useAuth, useUserAdmin } from "../../hooks/use-auth";
import { getCurrentUser } from "../../store/action/currentUser";

export const Basket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminLogin } = useUserAdmin();
  const { isAuth } = useAuth();

  const { basketData } = useSelector((state) => state.basket);
  const { userProfile } = useSelector((state) => state.currentUser);
  const { availablePromoCod, promoCod, restourantsAddress } = useSelector(
    (state) => state.orders
  );

  let price = 0;
  basketData.map((el) => (price += el.count * el.price));

  const totalPrice = (
    price - (promoCod.sale === 0 ? 0 : (price / 100) * promoCod.sale)
  ).toFixed();

  const saleAmont = (
    promoCod.sale === 0 ? 0 : (price / 100) * promoCod.sale
  ).toFixed();

  const typeDeliveryData = [
    {
      value: "Доставка",
      id: "delivery",
    },
    {
      value: "Самовивіз",
      id: "out",
    },
  ];
  const typePaymentData = [
    {
      value: "Готівка",
      id: "cash",
    },
    {
      value: "Онлайн",
      id: "online",
    },
    {
      value: "Карткою",
      id: "card",
    },
  ];

  const [typePayment, setTypePayment] = useState("Готівка");
  const [typeDelivery, setTypeDelivery] = useState("Доставка");
  const [showInfoPopUp, setShowInfoPopUp] = useState(false);
  const [showCancelConfirmModal, setshowCancelConfirmModal] = useState(false);
  const [showConfirmOrderModal, setshowConfirmOrderModal] = useState(false);

  const [promo, setPromo] = useState("");
  const [dataItem, setDataItem] = useState({
    userName: "",
    phoneNumber: "",
    street: "",
    city: "",
    buildNumber: "",
    userCash: "",
    orderNote: "",
    restourantsAddress: "Виберіть адресу магазину",
  });

  if (isAuth && !adminLogin) {
    dataItem.userName = userProfile.userName;
    dataItem.phoneNumber = userProfile.phoneNumber;
    dataItem.city = userProfile.city;
    dataItem.street = userProfile.street;
    dataItem.buildNumber = userProfile.buildNumber;
  }

  const addItemData = (event) => {
    const { name, value } = event.target;
    setDataItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const PromoCod = () => {
    dispatch(checkPromoCod(promo.toUpperCase()));
    setShowInfoPopUp(true);
  };

  const CancelPromoCod = () => {
    dispatch(cleanPromoOrder());
  };

  const checkField = () => {
    let result = true;
    if (typeDelivery === "Доставка") {
      result =
        dataItem.userName.length > 0 &&
        dataItem.phoneNumber.length > 0 &&
        dataItem.street.length > 0 &&
        dataItem.city.length > 0 &&
        dataItem.buildNumber.length > 0 &&
        !adminLogin
          ? false
          : true;
    }
    if (typeDelivery === "Самовивіз") {
      result =
        dataItem.userName.length > 0 &&
        dataItem.phoneNumber.length > 0 &&
        dataItem.restourantsAddress !== "Виберіть адресу магазину" &&
        !adminLogin
          ? false
          : true;
    }
    return result;
  };

  const openConfirmOrderModal = () => {
    setshowConfirmOrderModal(true);
    dataItem.typeDelivery = typeDelivery;
    dataItem.typePayment = typePayment;
    dataItem.menu = basketData;
    dataItem.timeOrder = new Date().toLocaleString();
    dataItem.totalPrice = totalPrice;
    dataItem.saleAmont = saleAmont;
    dataItem.status = "Очікує";
  };
  const sendOrderData = () => {
    dispatch(
      createOrder({
        promoCod: promoCod,
        available: availablePromoCod,
        dataItem: dataItem,
      })
    );
    dispatch(cleanBasket());
    dispatch(cleanPromoOrder());
    navigate("/");
  };

  useEffect(() => {
    dispatch(getRestourantsAddress());
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className={style.main_wrap}>
      {basketData.length ? (
        <>
          <div className={style.header}>Ваше замовлення</div>
          <div className={style.main_container}>
            <div className={style.left_container}>
              <div className={style.left_container_header}>
                <div className={style.left_container_col_one}>Товар</div>
                <div className={style.left_container_col_two}>К-сть</div>
                <div className={style.left_container_col_three}>Ціна</div>
              </div>
              <div className={style.left_container_order}>
                <div className={style.order_container}>
                  {basketData.map((el, index) => (
                    <OrderItemCard data={el} key={index} />
                  ))}
                </div>
                <div className={style.left_bottom_container}>
                  <textarea
                    name="orderNote"
                    placeholder="Коментар до замовлення"
                    className={style.order_note}
                    onChange={addItemData}
                    defaultValue={dataItem.orderNote}
                  ></textarea>
                  <div className={style.promo_cod_container}>
                    <label className={style.label}>
                      Промо-код
                      <input
                        className={style.input}
                        type="text"
                        style={{ textTransform: "uppercase" }}
                        onChange={(el) => setPromo(el.target.value)}
                        disabled={availablePromoCod}
                        defaultValue={availablePromoCod ? promoCod.id : ""}
                      ></input>
                    </label>

                    <Button
                      title="Додати"
                      onClick={PromoCod}
                      disabled={availablePromoCod}
                    />
                    <Button
                      title="Відмінити"
                      onClick={setshowCancelConfirmModal}
                      disabled={!availablePromoCod}
                    />
                  </div>
                  <div className={style.total_container}>
                    <div className={style.total_discount_container}>
                      Знижка: {saleAmont} грн
                    </div>
                    <div className={style.total_price_container}>
                      Разом: {totalPrice} грн
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.right_container}>
              <div className={style.right_up_container}>
                <div className={style.delivery_container}>
                  <div className={style.delivery_type_container}>
                    <div className={style.delivery_type_text}>
                      Спосіб доставки:
                    </div>
                    <div className={style.delivery_type_buttons}>
                      {typeDeliveryData.map((el, index) => (
                        <CustomRadioButton
                          name="delivery"
                          value={el.value}
                          id={el.id}
                          selected={typeDelivery}
                          setTypeDelivery={(elem) => setTypeDelivery(elem)}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={style.user_name_block}>
                    <label className={style.lable}>
                      Ім'я*
                      <input
                        name="userName"
                        className={style.input}
                        type="text"
                        placeholder="Введіть ваше ім'я"
                        onChange={addItemData}
                        defaultValue={dataItem.userName}
                      ></input>
                    </label>
                    <label className={style.lable}>
                      Номер телефону*
                      <input
                        name="phoneNumber"
                        className={style.input}
                        type="tel"
                        placeholder="Введіть ваш номер телефону"
                        onChange={addItemData}
                        defaultValue={dataItem.phoneNumber}
                      ></input>
                    </label>
                  </div>
                  {typeDelivery === "Доставка" ? (
                    <div className={style.user_adress_block}>
                      <label className={style.lable}>
                        Місто*
                        <input
                          name="city"
                          className={style.input}
                          type="text"
                          placeholder="Введіть місто"
                          onChange={addItemData}
                          defaultValue={dataItem.city}
                        ></input>
                      </label>

                      <label className={style.lable}>
                        Вулиця*
                        <input
                          name="street"
                          className={style.input}
                          type="text"
                          placeholder="Введіть вулицю"
                          onChange={addItemData}
                          defaultValue={dataItem.street}
                        ></input>
                      </label>

                      <label className={style.lable}>
                        № буд.*
                        <input
                          name="buildNumber"
                          className={style.input}
                          type="text"
                          placeholder="Введіть номер будинку"
                          onChange={addItemData}
                          defaultValue={dataItem.buildNumber}
                        ></input>
                      </label>
                    </div>
                  ) : typeDelivery === "Самовивіз" ? (
                    <CustomSelector
                      selected={dataItem.restourantsAddress}
                      data={restourantsAddress}
                      setTypeOf={addItemData}
                      name={"restourantsAddress"}
                    />
                  ) : null}
                </div>
                <div className={style.payment_container}>
                  <div className={style.payment_type_container}>
                    <div className={style.payment_type_text}>
                      Спосіб оплати:
                    </div>
                    <div className={style.payment_type_buttons}>
                      {typePaymentData.map((el, index) => (
                        <CustomRadioButton
                          key={index}
                          name="payment"
                          value={el.value}
                          id={el.id}
                          selected={typePayment}
                          setTypeDelivery={(elem) => setTypePayment(elem)}
                        />
                      ))}
                    </div>
                  </div>
                  {typePayment === "Готівка" ? (
                    <div className={style.user_cash}>
                      <label className={style.lable}>
                        Підготувати решту з:
                        <input
                          name="userCash"
                          className={style.input}
                          type="text"
                          placeholder="Введіть суму"
                          onChange={addItemData}
                          defaultValue={dataItem.userCash}
                        ></input>
                      </label>
                    </div>
                  ) : null}
                  <div className={style.payment_container}></div>
                </div>
              </div>
              <Button
                title="Готово"
                width="100%"
                onClick={openConfirmOrderModal}
                disabled={checkField()}
              />
            </div>
          </div>
        </>
      ) : (
        <div className={style.empty_busket}>
          <div className={style.empty_busket_text}>Корзина порожня</div>
          <Button
            title="Повернутись на головну"
            onClick={() => navigate("/")}
          />
        </div>
      )}
      {showInfoPopUp ? (
        <InfoPopUp
          title={
            availablePromoCod
              ? `Промо-код "${promoCod.note}" активовано`
              : "Промо-код не знайдено"
          }
          setShowPopUp={(el) => setShowInfoPopUp(el)}
        />
      ) : null}
      {showCancelConfirmModal ? (
        <ConfirmPopUp
          title={"Скасувати промо код?"}
          confirmFunc={CancelPromoCod}
          setShowPopUp={setshowCancelConfirmModal}
        />
      ) : null}
      {showConfirmOrderModal ? (
        <ConfirmPopUp
          title={"Створити замовлення?"}
          confirmFunc={sendOrderData}
          setShowPopUp={setshowConfirmOrderModal}
        />
      ) : null}
    </div>
  );
};
