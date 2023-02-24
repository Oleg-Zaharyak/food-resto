import React from "react";
import { useDispatch } from "react-redux";
import { changeCount, removeItem } from "../../store/slices/basketSlice";
import style from "./styles.module.scss";

export const OrderItem = ({ data }) => {
  const dispatch = useDispatch();
  // const [count, setCount] = useState(data.count);
  const summary = (data.count * data.price).toFixed(2);

  const cutNameItem = data.name.slice(0, 24) + "...";

  const remove = () => {
    dispatch(removeItem(data.name));
  };

  const handleDecrement = () => {
    if (data.count === 1) {
      dispatch(removeItem(data.name));
    } else {
      const obj = {
        name: data.name,
        increment: false,
      };
      dispatch(changeCount(obj));
    }
  };
  const handleIncrement = () => {
    const obj = {
      name: data.name,
      increment: true,
    };
    dispatch(changeCount(obj));
  };

  return (
    <div className={style.container}>
      <div className={style.item1}>
        <img
          src={require(`./../../assets/images/${data.src}.png`)}
          alt="img1"
          className={style.item1_1}
        ></img>
        <div className={style.item1_2}>{cutNameItem}</div>
        <div className={style.item1_3}>$ {data.price}</div>
      </div>
      <div className={style.item2}>
        <button onClick={handleDecrement} className={style.count_dec_button}>
          {data.count === 1 ? (
            <svg
              className={style.decrement_icon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          ) : (
            <svg
              className={style.decrement_icon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          )}
        </button>
        {data.count}
        <button onClick={handleIncrement} className={style.count_inc_button}>
          <svg
            className={style.increment_icon}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />{" "}
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
          </svg>
        </button>
      </div>
      <div
        style={
          summary.length < 6
            ? { fontSize: "16px" }
            : summary.length < 7
            ? { fontSize: "15px" }
            : { fontSize: "13px" }
        }
        className={style.item3}
      >
        $ {summary}
      </div>
      <input
        type="text"
        className={style.item4}
        placeholder="Order Note..."
      ></input>
      <button onClick={remove} className={style.item5}>
        <svg
          className={style.icon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.8789 8.71882L18.9784 8.72017C19.3475 8.75069 19.6304 9.05716 19.65 9.42605L19.6405 9.63174L19.326 13.483L18.9961 17.2414C18.9263 17.9917 18.8638 18.6245 18.8099 19.1227C18.6225 20.8588 17.4955 21.9323 15.7966 21.9641C13.1494 22.013 10.6048 22.0125 8.13373 21.9591C6.48398 21.9244 5.37366 20.8393 5.18955 19.1297L5.0623 17.8702L4.83994 15.427L4.61216 12.7461L4.35172 9.52788C4.31935 9.11498 4.61951 8.75335 5.02215 8.72016C5.39123 8.68973 5.7183 8.94584 5.79519 9.30677L5.82511 9.60173L6.06966 12.6187L6.33669 15.7459C6.45646 17.0996 6.56034 18.1952 6.64346 18.9648C6.74838 19.939 7.26138 20.4404 8.16411 20.4593C10.6159 20.5124 13.1415 20.5129 15.7701 20.4643C16.7277 20.4464 17.2488 19.9499 17.356 18.9574L17.4827 17.7046C17.5198 17.3185 17.5594 16.8923 17.6013 16.4293L17.8686 13.3538L18.1906 9.4075C18.2204 9.02902 18.5192 8.7389 18.8789 8.71882ZM3.73139 6.98918C3.32745 6.98918 3 6.65338 3 6.23916C3 5.85945 3.27515 5.54564 3.63214 5.49597L3.73139 5.48913H6.91772C7.29636 5.48913 7.62785 5.23928 7.74642 4.87929L7.77543 4.76813L8.02304 3.50533C8.24111 2.66897 8.9492 2.07349 9.779 2.00633L9.93592 2H14.0639C14.9075 2 15.6523 2.54628 15.9391 3.39039L15.9874 3.55209L16.2243 4.76783C16.2987 5.14872 16.6025 5.4332 16.9701 5.48177L17.0821 5.48913H20.2686C20.6725 5.48913 21 5.82493 21 6.23916C21 6.61887 20.7248 6.93267 20.3679 6.98234L20.2686 6.98918H3.73139ZM14.0639 3.50006H9.93592C9.7307 3.50006 9.54829 3.62322 9.47252 3.77803L9.44682 3.84604L9.20979 5.06238C9.1808 5.21084 9.13879 5.3538 9.08512 5.49012L14.9148 5.49031C14.8813 5.40526 14.8523 5.31763 14.8282 5.22768L14.79 5.06208L14.5636 3.8928C14.5107 3.68991 14.3473 3.54138 14.1502 3.50742L14.0639 3.50006Z" />
        </svg>
      </button>
    </div>
  );
};