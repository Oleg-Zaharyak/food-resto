import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { NavLink } from "react-router-dom";
import style from "./styles.module.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handlerLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        localStorage.setItem("items", JSON.stringify(user));
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.stsTokenManager.accessToken,
          })
        );
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <div className={style.container}>
      <div className={style.logIn_container}>
        <div className={style.logIn_text}>Вхід у кабінет</div>
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
          <label htmlFor="login_email" className={style.email_lable}>
            Меїл
          </label>
          <input
            placeholder="Введіть емеїл"
            id="login_email"
            type="email"
            value={email}
            onChange={(el) => setEmail(el.target.value)}
          ></input>
        </div>
        <div className={style.password_container}>
          <label htmlFor="login_password" className={style.password_lable}>
            Пароль
          </label>
          <input
            placeholder="Введіть пароль"
            id="login_password"
            type="password"
            value={pass}
            onChange={(el) => setPass(el.target.value)}
          ></input>
        </div>
        <div className={style.vert_line}></div>
        <div className={style.logIn_other_way}>
          <div className={style.logIn_other_way_text}>Увійти за допомогою:</div>
          <button className={style.google}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              style={{ marginRight: 10 }}
            >
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
            </svg>
            Google.com
          </button>
          <button className={style.facebook}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-facebook"
              viewBox="0 0 16 16"
              id="IconChangeColor"
              style={{ marginRight: 10 }}
            >
              <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                id="mainIconPathAttribute"
              ></path>
            </svg>
            Facebook
          </button>
        </div>
        <div className={style.logIn_buttons}>
          <Button
            title="Увійти"
            onClick={() => handlerLogin(email, pass)}
            width="100%"
            disabled={email.length > 0 && pass.length > 0 ? false : true}
          />
        </div>
        <div className={style.signUp_button}>
          <Button
            title="Зареєструватися"
            onClick={() => navigate("/registration")}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};
