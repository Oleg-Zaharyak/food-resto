import React from "react";
import style from "./styles.module.scss";

export const InformationDeliveryPage = () => {
  return (
    <div className={style.container}>
      <div className={style.container_header}>Доставка</div>
      <div className={style.container_content}>
        <div className={style.content_delivery}>
          <div className={style.delivery_block}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/foodrest-ca621.appspot.com/o/Delivery%2F29-min.svg?alt=media&token=c6b28ef8-db7d-4b4a-971e-afe5a0819314"
              alt="29min dellivery"
              className={style.delivery_img}
            ></img>
            <div className={style.delivery_text_block}>
              <div className={style.delivery_text_header_green}>
                Зелена зона
              </div>

              <div>
                До <span className={style.bold}>29</span> хвилин
              </div>
              <div>
                Мінімальне замовлення
                <span className={style.bold}> 200 грн</span>
              </div>
              <div>Доставляємо БЕЗКОШТОВНО</div>
            </div>
          </div>

          <div className={style.delivery_block}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/foodrest-ca621.appspot.com/o/Delivery%2F59-min-yellow.svg?alt=media&token=b8a71da9-021f-4645-a78a-e8088fc34828"
              alt="59min dellivery"
              className={style.delivery_img}
            ></img>
            <div className={style.delivery_text_block}>
              <div className={style.delivery_text_header_yelow}>Жовта зона</div>
              <div>
                До <span className={style.bold}>59</span> хвилин
              </div>
              <div>
                Мінімальне замовлення
                <span className={style.bold}> 300 грн</span>
              </div>
              <div>Доставляємо БЕЗКОШТОВНО</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
