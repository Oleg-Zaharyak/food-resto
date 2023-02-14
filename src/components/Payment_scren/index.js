import React, { useState } from "react";
import { OrderList } from "../Order_list";
import { TypeDelivery } from "../Type_delivery";
import style from "./styles.module.scss";

export const Payment = () => {
  const [val, setVal] = useState("");

  const onChange = (e) => {
    setVal(e.target.value);
  };

  function cc_format(value) {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(" ") : value;
  }

  const onClick = () => {
    document.getElementById("payment").style.display = "none";
  };

  return (
    <div className={style.container}>
      <div className={style.left_container}>
        <div className={style.left_up_container}>
          <button onClick={onClick} className={style.back_arrow}>
            <svg
              className={style.arrow_icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className={style.middle_container}>
            <div>
              <div className={style.confirm_text}>Confirmation</div>
              <div className={style.order_text}>Order #213434</div>
            </div>
            <button className={style.plus_button}>
              <svg
                className={style.plus_icon}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2.5V10M10 17.5V10M10 10H17.5M10 10H2.5"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <OrderList />
      </div>
      <div className={style.right_container}>
        <form className={style.payment_container}>
          <div className={style.payment_text}>Payment</div>
          <div className={style.available_metod_text}>
            3 payment method available
          </div>
          <div className={style.up_horiz_line}></div>
          <div className={style.method_text}>Payment Method</div>
          <div className={style.payment_select}>
            <input name="payment" type="radio" id="card" value="CreditCard" />
            <label htmlFor="card" className={style.card_button}>
              <svg
                className={style.checked_icon}
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
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.75 9C1.75 6.37665 3.87665 4.25 6.5 4.25H18.5C21.1234 4.25 23.25 6.37665 23.25 9V15C23.25 17.6234 21.1234 19.75 18.5 19.75H6.5C3.87665 19.75 1.75 17.6234 1.75 15V9ZM3.33697 8.25H21.663C21.3245 6.81665 20.0368 5.75 18.5 5.75H6.5C4.96321 5.75 3.67555 6.81665 3.33697 8.25ZM21.75 9.75H3.25V15C3.25 16.7949 4.70507 18.25 6.5 18.25H18.5C20.2949 18.25 21.75 16.7949 21.75 15V9.75ZM13.75 15C13.75 14.5858 14.0858 14.25 14.5 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15C19.25 15.4142 18.9142 15.75 18.5 15.75H14.5C14.0858 15.75 13.75 15.4142 13.75 15Z"
                />
              </svg>
              Credit card
            </label>
            <input name="payment" type="radio" id="paypal" value="Paypal" />
            <label htmlFor="paypal" className={style.paypal_button}>
              <svg
                className={style.checked_icon}
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
              <svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5.2C16.7 6.2 17.5 8 17.5 10C17.5 12.5 15 14.5 12.5 14.5H9.9L9.3 18.1C9.25325 18.3293 9.12758 18.5349 8.94486 18.6811C8.76214 18.8272 8.53395 18.9047 8.3 18.9H5.6C5.52501 18.9015 5.45064 18.8861 5.38239 18.855C5.31415 18.8239 5.25378 18.7778 5.20577 18.7202C5.15775 18.6626 5.12331 18.5949 5.105 18.5222C5.08669 18.4494 5.08498 18.3735 5.1 18.3L5.3 16.9M7.5 11H10C12.5 11 15 8.5 15 6C15 3 13.1 1 10 1H4.5C4 1 3.5 1.5 3.5 2L1.5 16C1.5 16.5 2 17 2.5 17H5.3L6.5 12C6.6 11.4 6.9 11 7.5 11Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Paypal
            </label>
            <input name="payment" type="radio" id="Cash" value="Cash" />
            <label htmlFor="Cash" className={style.cash_button}>
              <svg
                className={style.checked_icon}
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
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.688 2.5C19.8978 2.5 22.5 5.16116 22.5 8.44374V15.5563C22.5 18.8388 19.8978 21.5 16.688 21.5H8.31204C5.10219 21.5 2.5 18.8388 2.5 15.5563V8.44374C2.5 5.16116 5.10219 2.5 8.31204 2.5H16.688ZM16.688 3.98651H8.31204C5.90498 3.98651 3.95358 5.98213 3.95358 8.44374V15.5563C3.95358 18.0179 5.90498 20.0135 8.31204 20.0135H16.688C19.095 20.0135 21.0464 18.0179 21.0464 15.5563L21.046 15.279L17.8499 15.2798C16.0084 15.2787 14.5159 13.7531 14.5147 11.8695C14.5147 10.0491 15.9101 8.56244 17.6673 8.46431L17.8504 8.45916L21.046 8.459L21.0464 8.44374C21.0464 6.05454 19.2081 4.10431 16.8991 3.99165L16.688 3.98651ZM21.046 9.945L17.8508 9.94567C16.8109 9.94632 15.9683 10.8074 15.9683 11.869C15.9689 12.8811 16.7329 13.7102 17.7033 13.7874L17.8504 13.7933L21.046 13.793V9.945ZM18.2942 11.0652C18.6956 11.0652 19.021 11.3979 19.021 11.8084C19.021 12.1847 18.7475 12.4957 18.3928 12.5449L18.2942 12.5517H17.9921C17.5907 12.5517 17.2653 12.2189 17.2653 11.8084C17.2653 11.4322 17.5388 11.1212 17.8935 11.072L17.9921 11.0652H18.2942ZM12.8539 6.99736C13.2553 6.99736 13.5807 7.33013 13.5807 7.74062C13.5807 8.1169 13.3073 8.42788 12.9525 8.47709L12.8539 8.48388H7.62203C7.22063 8.48388 6.89524 8.15111 6.89524 7.74062C6.89524 7.36434 7.16866 7.05337 7.5234 7.00415L7.62203 6.99736H12.8539Z" />
              </svg>
              Cash
            </label>
          </div>
          <div className={style.payment_name}>
            <label htmlFor="name" className={style.label}>
              Cardholder Name
            </label>
            <input
              type="text"
              name="payment_name"
              id="payment_name"
              className={style.input}
              placeholder="Enter your name"
            ></input>
          </div>
          <div className={style.card_number}>
            <label htmlFor="card_number" className={style.label}>
              Card Number
            </label>
            <input
              type="text"
              name="card_number"
              id="card_number"
              value={cc_format(val)}
              onChange={onChange}
              className={style.input}
              placeholder="Enter your card number"
            ></input>
          </div>
          <div className={style.expiration_date}>
            <label htmlFor="expiration_date" className={style.label}>
              Expiration Date
            </label>
            <input
              type="month"
              name="expiration_date"
              id="expiration_date"
              className={style.input_date}
            ></input>
          </div>
          <div className={style.cvv}>
            <label htmlFor="cvv" className={style.label}>
              CVV
            </label>
            <input
              type="password"
              name="cvv"
              id="cvv"
              placeholder="CVV"
              className={style.input_cvv}
              maxLength="3"
            ></input>
          </div>
          <div className={style.horiz_line}></div>
          <div className={style.selector}>
            <div className={style.selector_text}>Order Type</div>
            <TypeDelivery />
          </div>
          <div className={style.table_no}>
            <label htmlFor="table_no" className={style.label}>
              Table no.
            </label>
            <input
              type="text"
              name="table_no"
              id="table_no"
              placeholder="Enter value"
              className={style.input}
            ></input>
          </div>
        </form>
        <div className={style.buttons}>
          <button onClick={onClick} className={style.cancel_button}>
            Cancel
          </button>
          <button className={style.confirm_button}>Confirm Payment</button>
        </div>
      </div>
    </div>
  );
};
