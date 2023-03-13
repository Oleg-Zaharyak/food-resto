import React, { useEffect, useState } from "react";
import style from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../store/action/currentUser";
import { cleanBasket } from "../../store/slices/basketSlice";
import { cleanPromoOrder } from "../../store/slices/ordersSlice";
import { ConfirmPopUp } from "../../components/ConfirmPopUp";
import { OrderTableItem } from "../../components/Oreder_table";
import { MostOrderScreen } from "../../components/MostOrderedScreen";
import { getUserMostOrder, getUserOrder } from "../../store/action/orders";

export const UserPage = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmOrderModal, setShowConfirmOrderModal] = useState(false);
  const { userProfile } = useSelector((state) => state.currentUser);

  const { userOrders } = useSelector((state) => state.orders);
  const { userMostOrder } = useSelector((state) => state.statistic);
  const obj = userMostOrder.slice();

  if (userMostOrder.length > 0) {
    obj.sort((a, b) => b.count - a.count);
  }

  const LogOut = () => {
    setShowConfirmOrderModal(true);
  };
  const LogOutUser = () => {
    dispatch(removeUser());
    localStorage.clear("items");
    dispatch(cleanBasket());
    dispatch(cleanPromoOrder());
    navigate("/");
  };
  
  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getUserOrder({ id: id }));
    dispatch(getUserMostOrder({ id: id }));
  }, [dispatch, id]);

  return (
    <div className={style.wrap}>
      <div className={style.container}>
        <div className={style.header_block}>
          <div className={style.header}>
            <div className={style.user_header_block}>
              <div className={style.user_name}>{userProfile.userName}</div>
              <div className={style.info_block}>
                <div className={style.info_block_head}>Телефон:</div>
                <div className={style.info_block_text}>
                  {userProfile.phoneNumber}
                </div>
              </div>
              <div className={style.info_block}>
                <div className={style.info_block_head}>Адреса:</div>
                <div className={style.info_block_text}>
                  {userProfile.city}, {userProfile.street},{" "}
                  {userProfile.buildNumber}
                </div>
              </div>
            </div>
            <button className={style.log_out_button} onClick={LogOut}>
              <svg
                className={style.icon}
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.33097 0.0214844C11.7102 0.0214844 13.6521 1.89542 13.7611 4.24772L13.766 4.45648V5.38948C13.766 5.8037 13.4302 6.13948 13.016 6.13948C12.6363 6.13948 12.3225 5.85733 12.2728 5.49125L12.266 5.38948V4.45648C12.266 2.89358 11.044 1.61575 9.50341 1.52647L9.33097 1.52148H4.45597C2.89392 1.52148 1.61623 2.74362 1.52696 4.28406L1.52197 4.45648V15.5865C1.52197 17.1493 2.74388 18.4272 4.28363 18.5165L4.45597 18.5215H9.34097C10.8983 18.5215 12.172 17.3039 12.261 15.7693L12.266 15.5975V14.6545C12.266 14.2403 12.6018 13.9045 13.016 13.9045C13.3957 13.9045 13.7095 14.1866 13.7591 14.5527L13.766 14.6545V15.5975C13.766 17.9687 11.8992 19.9046 9.55533 20.0164L9.34097 20.0215H4.45597C2.07753 20.0215 0.135813 18.1474 0.0267998 15.7952L0.0219727 15.5865V4.45648C0.0219727 2.07743 1.89573 0.135347 4.24728 0.0263125L4.45597 0.0214844H9.33097ZM17.326 6.50234L17.4103 6.57478L20.3383 9.48978C20.3647 9.51594 20.3878 9.54256 20.409 9.57073L20.3383 9.48978C20.3689 9.52019 20.3963 9.55258 20.4205 9.58653C20.4376 9.61028 20.4533 9.63538 20.4676 9.66142C20.4702 9.66648 20.4728 9.67145 20.4754 9.67645C20.4881 9.70042 20.4993 9.72529 20.5092 9.75084C20.5132 9.76202 20.5173 9.77334 20.5211 9.78473C20.5284 9.80575 20.5345 9.8274 20.5397 9.84942C20.5421 9.86118 20.5445 9.87286 20.5467 9.88457C20.5508 9.90501 20.5538 9.9261 20.5559 9.94745C20.557 9.96231 20.558 9.97701 20.5586 9.99174C20.5593 10.0016 20.5595 10.0115 20.5595 10.0214L20.5586 10.0497C20.5581 10.0651 20.557 10.0805 20.5555 10.0958L20.5595 10.0214C20.5595 10.0682 20.5552 10.1141 20.547 10.1585C20.5445 10.1696 20.5421 10.1814 20.5394 10.193C20.5343 10.2162 20.5279 10.2387 20.5205 10.2607C20.5167 10.2709 20.513 10.2813 20.509 10.2915C20.4997 10.3164 20.4889 10.3405 20.4769 10.3639C20.4739 10.3692 20.4708 10.3751 20.4675 10.381C20.4331 10.4443 20.39 10.5015 20.3398 10.5517L20.3384 10.5527L17.4104 13.4687C17.1169 13.761 16.642 13.76 16.3498 13.4665C16.084 13.1997 16.0607 12.783 16.2791 12.4898L16.3519 12.4059L17.991 10.7705L7.76847 10.7714C7.35426 10.7714 7.01847 10.4356 7.01847 10.0214C7.01847 9.64169 7.30063 9.32789 7.6667 9.27823L7.76847 9.27139L17.993 9.27048L16.352 7.63779C16.0852 7.37212 16.06 6.95551 16.2772 6.66142L16.3497 6.57714C16.6153 6.31028 17.0319 6.28514 17.326 6.50234Z" />
              </svg>
            </button>
          </div>
        </div>
        <div className={style.info}></div>
        <div className={style.mostOrderedDishes}>
          <MostOrderScreen title="Найпопулярніші:" data={obj.slice(0, 4)} />
        </div>
        <div className={style.orderTable}>
          <div className={style.order_table_wrap}>
            <div className={style.order_table_text}>Ваші замовлення</div>
            <OrderTableItem data={userOrders} />
          </div>
        </div>
      </div>
      {showConfirmOrderModal ? (
        <ConfirmPopUp
          title={"Підтверджуєте вихід?"}
          confirmFunc={LogOutUser}
          setShowPopUp={setShowConfirmOrderModal}
        />
      ) : null}
    </div>
  );
};
