import React, { useEffect } from "react";
import { SummaryCard } from "../../components/Summary_card";
import style from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getTypeDelivery } from "../../store/action/items";
import { getAllOrders } from "../../store/action/orders";
import { OrderTableItem } from "../../components/Oreder_table";
import { MostOrderScreen } from "../../components/MostOrderedScreen";
import {
  getAllOrderedDishes,
  getAllOrdersCount,
  getMostOrderDishes,
  getTotalRevenue,
  getTypeOfOrder,
} from "../../store/action/statistic";
import { MostTypeOfScreen } from "../../components/MostTypeOfScreen";

export const Statistic = () => {
  const dispatch = useDispatch();

  const { allOrders } = useSelector((state) => state.orders);
  const { mostOrderDishes, totalRevenue, allOrderedDishes, allOrdersCount } =
    useSelector((state) => state.statistic);


  useEffect(() => {
    dispatch(getTypeDelivery());
    dispatch(getMostOrderDishes());
    dispatch(getAllOrders());
    dispatch(getTypeOfOrder());
    dispatch(getTotalRevenue());
    dispatch(getAllOrderedDishes());
    dispatch(getAllOrdersCount());
  }, [dispatch]);
  return (
    <div className={style.container}>
      <div className={style.text_container}>
        <div className={style.header_main_text}>Статистика</div>
      </div>
      <div className={style.summary_container}>
        <SummaryCard
          title="Дохід за весь час"
          iconName="Dolar"
          count={totalRevenue + " грн."}
        />
        <SummaryCard
          title="Всього замовлених страв"
          iconName="Order"
          count={allOrderedDishes + " шт."}
        />
        <SummaryCard
          title="Всього створено замовлень"
          iconName="Team"
          count={allOrdersCount + " шт."}
        />
      </div>
      <div className={style.order_report}>
        <OrderTableItem data={allOrders} />
      </div>
      <div className={style.most_order}>
        <MostOrderScreen title="Найпопулярніші:" data={mostOrderDishes} />
      </div>
      <div className={style.most_type_of_order}>
        <MostTypeOfScreen />
      </div>
    </div>
  );
};
