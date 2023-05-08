import React, { useEffect } from "react";
import style from "./styles.module.scss";
import { NavLink, Route, Routes } from "react-router-dom";
import { InformationPaymentPage } from "../../components/InformationPaymentPage";
import { InformationDeliveryPage } from "../../components/InformationDeliveryPage";
import { InformationAboutUsPage } from "../../components/InformationAboutUsPage";
import { useDispatch } from "react-redux";
import { getDeliveryInfo } from "../../store/action/information";
import { InformationVacanciesPage } from "../../components/InformationVacanciesPage";

export const Information = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeliveryInfo());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <div className={style.header_text}>Інформація</div>
      <div className={style.content_block}>
        <div className={style.menu_container_wrap}>
          <div className={style.menu_container}>
            <NavLink to={"information_about_us"} className={style.menu_button}>
              Про нас
            </NavLink>
            <NavLink to={"information_delivery"} className={style.menu_button}>
              Доставка
            </NavLink>
            <NavLink to={"information_payment"} className={style.menu_button}>
              Оплата
            </NavLink>
            <NavLink to={"#"} className={style.menu_button}>
              Новини
            </NavLink>
            <NavLink to={"vacancies"} className={style.menu_button}>
              Вакасії
            </NavLink>
            <NavLink to={"#"} className={style.menu_button}>
              Контакти
            </NavLink>
          </div>
        </div>
        <div className={style.content_container_wrap}>
          <div className={style.content_container}>
            <Routes>
              <Route
                path={`/information_about_us`}
                element={<InformationAboutUsPage />}
              />
              <Route
                path={`/information_delivery`}
                element={<InformationDeliveryPage />}
              />
              <Route
                path={`/information_payment`}
                element={<InformationPaymentPage />}
              />
              <Route
                path={`/vacancies`}
                element={<InformationVacanciesPage />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
