import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink } from "react-router-dom";
import style from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./../../firebase";
import { Button } from "../Button";

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataItem, setDataItem] = useState({});

  const addItemData = (event) => {
    const { name, value } = event.target;
    setDataItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkDisableButton = () => {
    return Object.values(dataItem).length > 6 &&
      !Object.values(dataItem).some((el) => el === "")
      ? false
      : true;
  };
  const handlerRegistration = (email, pass) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        localStorage.setItem("items", JSON.stringify(user));
        dispatch(
          setUser({ email: user.email, id: user.uid, token: user.accessToken })
        );
        const data = {
          userName: dataItem.userName,
          phoneNumber: dataItem.phoneNumber,
          city: dataItem.city,
          street: dataItem.street,
          buildNumber: dataItem.buildNumber,
        };
        setDoc(doc(db, "users", user.uid), data);
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <div className={style.container}>
      <div className={style.signUp_container}>
        <div className={style.signUp_text}>Реєстрація</div>
        <NavLink to={"/"} className={style.exit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.9498 8.46447C17.3404 8.07394 17.3404 7.44078 16.9498 7.05025C16.5593 6.65973 15.9261 6.65973 15.5356 7.05025L12.0001 10.5858L8.46455 7.05025C8.07402 6.65973 7.44086 6.65973 7.05033 7.05025C6.65981 7.44078 6.65981 8.07394 7.05033 8.46447L10.5859 12L7.05033 15.5355C6.65981 15.9261 6.65981 16.5592 7.05033 16.9497C7.44086 17.3403 8.07402 17.3403 8.46455 16.9497L12.0001 13.4142L15.5356 16.9497C15.9261 17.3403 16.5593 17.3403 16.9498 16.9497C17.3404 16.5592 17.3404 15.9261 16.9498 15.5355L13.4143 12L16.9498 8.46447Z"
            />
          </svg>
        </NavLink>
        <div className={style.horz_line}></div>
        <div className={style.email_container}>
          <label htmlFor="signUp_email" className={style.email_lable}>
            Емеїл*
          </label>
          <input
            name="email"
            placeholder="Введіть емаїл"
            id="signUp_email"
            type="email"
            onChange={(el) => addItemData(el)}
          ></input>
        </div>
        <div className={style.password_container}>
          <label htmlFor="signUp_password" className={style.password_lable}>
            Пароль*
          </label>
          <input
            name="password"
            placeholder="Введіть пароль"
            id="signUp_password"
            type="password"
            onChange={(el) => addItemData(el)}
          ></input>
        </div>
        <div className={style.userName_container}>
          <label htmlFor="signUp_firstName" className={style.userName_lable}>
            Ім'я*
          </label>
          <input
            name="userName"
            placeholder="Введіть ваше ім'я"
            id="signUp_firstName"
            type="text"
            onChange={(el) => addItemData(el)}
          ></input>
        </div>
        <div className={style.phonerNumber_container}>
          <label htmlFor="signUp_lastName" className={style.phonerNumber_lable}>
            Номер телефону*
          </label>
          <input
            name="phoneNumber"
            placeholder="Введіть ваш номер телефону"
            id="signUp_lastName"
            type="text"
            onChange={(el) => addItemData(el)}
          ></input>
        </div>
        <div className={style.city_container}>
          <label htmlFor="signUp_city" className={style.city_lable}>
            Місто*
          </label>
          <input
            name="city"
            placeholder="Введіть ваше місто"
            id="signUp_city"
            type="text"
            onChange={(el) => addItemData(el)}
          ></input>
        </div>
        <div className={style.street_container}>
          <label htmlFor="signUp_street" className={style.street_lable}>
            Вулиця*
          </label>
          <input
            name="street"
            placeholder="Введіть вашу вулицю"
            id="signUp_street"
            type="text"
            onChange={(el) => addItemData(el)}
          ></input>
        </div>
        <div className={style.buildNumber_container}>
          <label
            htmlFor="signUp_buildNumber"
            className={style.buildNumber_lable}
          >
            № будинку*
          </label>
          <input
            name="buildNumber"
            placeholder="Введіть ваш № будинку"
            id="signUp_buildNumber"
            type="text"
            onChange={(el) => addItemData(el)}
          ></input>
        </div>
        <div className={style.vert_line}></div>
        <div className={style.logIn_buttons}>
          <Button
            title="Зареєструватися"
            onClick={() => handlerRegistration(dataItem.email, dataItem.password)}
            width="100%"
            disabled={checkDisableButton()}
          />
        </div>
        <div className={style.signUp_buttons}>
          <Button
            title="Повернутись до входу"
            onClick={() => navigate("/login")}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};
