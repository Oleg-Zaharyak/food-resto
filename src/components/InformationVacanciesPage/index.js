import React from "react";
import style from "./styles.module.scss";
import { Button } from "../Button";

export const InformationVacanciesPage = () => {
  return (
    <div className={style.container}>
      <div className={style.container_header}>Ваканції</div>
      <div className={style.container_content}>
        <div className={style.vacancies}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/foodrest-ca621.appspot.com/o/Vacancies%2Fcall-center.jpg?alt=media&token=f137153f-e8d7-43f3-998b-e23282beb5dc"
            alt="photos"
            className={style.vacancies_image}
          ></img>
          <div className={style.vacancies_container}>
            <div className={style.vacancies_header}>Оператор call-центру</div>
            <Button title="Детальніше" width="max-content" />
          </div>
        </div>
      </div>
    </div>
  );
};
