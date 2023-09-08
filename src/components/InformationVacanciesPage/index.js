import React from "react";
import style from "./styles.module.scss";
import { Button } from "../Button";
import photo from "../../assets/images/Contact us.svg";
import photo2 from "../../assets/images/Global-logistics-delivery-network.svg";
// import photo3 from "../../assets/images/Male-chef-cooking-in-kitchen.svg";

export const InformationVacanciesPage = () => {
  return (
    <div className={style.container}>
      <div className={style.container_header}>Ваканції</div>
      <div className={style.container_content}>
        <div className={style.vacancies}>
          <img alt="photos" src={photo} className={style.vacancies_image}></img>
          <div className={style.vacancies_container}>
            <div className={style.vacancies_header}>Оператор call-центру</div>
            <Button title="Детальніше" width="max-content" />
          </div>
        </div>
        <div className={style.vacancies}>
          <div className={style.vacancies_container}>
            <div className={style.vacancies_header}>
              Адміністратор відділу доставки
            </div>
            <Button title="Детальніше" width="max-content" />
          </div>
          <img
            alt="photos"
            src={photo2}
            className={style.vacancies_image}
          ></img>
        </div>
      </div>
    </div>
  );
};
