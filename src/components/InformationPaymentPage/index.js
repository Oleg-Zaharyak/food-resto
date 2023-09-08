import React from "react";
import style from "./styles.module.scss";
import { useSelector } from "react-redux";

export const InformationPaymentPage = () => {
  const { deliveryInformation } = useSelector((state) => state.information);
  console.log(deliveryInformation);
  return (
    <div className={style.container}>
      <div className={style.container_header}>Спосіб оплати</div>
      <div className={style.container_content}>
        <div className={style.content_payment_type}>
          {deliveryInformation.map((el) => {
            return (
              <div className={style.payment}>
                <img
                  src={el.src}
                  alt="photos"
                  className={style.payment_image}
                ></img>
                <div className={style.payment_header}>{el.header}</div>
                <div className={style.payment_text}>{el.description}</div>
              </div>
            );
          })}
        </div>
        <div className={style.content_text}>
          <div className={style.text}>
            ** Замовлення рахується прийнятим з моменту опрацювання його
            оператором колл-центру дзвінком до клієнта.
          </div>
          <div className={style.text}>
            Тепер трохи про зручності оплати. Ми довіряємо своїм клієнтам, тому
            розрахунок відбувається при отриманні. Готівкою або карткою –
            обираєте Ви. Сервіс доставки піци у Львові «Jaegar Resto» намагається
            бути максимально сучасним та лояльним до своїх клієнтів, тому Ви
            можете розрахуватись карткою. Просто позначте при оформленні
            замовлення, що бажаєте розрахуватись з кур’єром карткою, або
            повідомте про це оператора телефоном. Насправді, погодьтесь, готівка
            потрохи виходить з ужитку, і ми все частіше розраховуємось карткою
            за все, навіть за проїзд у транспорті.
          </div>
          <div className={style.text}>
            Доставка «Jaegar Resto» – це найсучасніший, найкомфортніший та
            найсмачніший сервіс доставки піци у Львові. Ми співпрацюємо з
            українськими виробниками, поєднуємо професійність та нестандартні
            рецепти, а Ви отримуєте смачну і гарячу піцу у будь-який день. Так,
            ми працюємо для Вас щоденно, лише оберіть піцу та оформіть
            замовлення! До речі, до будь-якої піци можна обрати додатки – овочі,
            м’ясо, сир та ще багато чого іншого. Спробуйте наш сервіс доставки і
            Ви завжди будете обирати лише нас.
          </div>
        </div>
      </div>
    </div>
  );
};
