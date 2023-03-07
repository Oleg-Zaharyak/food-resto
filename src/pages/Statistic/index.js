import React, { useEffect } from "react";
import { SummaryCard } from "../../components/Summary_card";
import style from "./styles.module.scss";
import { CircleGraph } from "../../components/Statistics_graph";
import { useDispatch, useSelector } from "react-redux";
import { getTypeDelivery } from "../../store/action/items";
// import { getAllOrders } from "../../store/action/orders";
import { OrderTableItem } from "../../components/Oreder_table";
import { MostOrderScreen } from "../../components/MostOrderedScreen";
import { getMostOrderDishes } from "../../store/action/statistic";

export const Statistic = () => {
  const dispatch = useDispatch();

  // const { allOrders } = useSelector((state) => state.orders);
  const { mostOrderDishes } = useSelector((state) => state.statistic);
  const data = [
    {
      src: "Dolar",
      sum: "$10,243.00",
      name: "Total Revenue",
      proc: "+32.40%",
      arrow: "GreenArrow",
    },
    {
      src: "Order",
      sum: "23,456",
      name: "Total Dish Ordered",
      proc: "-12.40%",
      arrow: "RedArrow",
    },
    {
      src: "Team",
      sum: "1,234",
      name: "Total Customer",
      proc: "+2.40%",
      arrow: "GreenArrow",
    },
  ];

  useEffect(() => {
    dispatch(getTypeDelivery());
    dispatch(getMostOrderDishes());

    // dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <div className={style.container}>
      <div className={style.text_container}>
        <div className={style.header_main_text}>Dashboard</div>
        <div className={style.header_second_text}>Tuesday 2 Feb, 2021</div>
      </div>
      <div className={style.summary_container}>
        {data.map((el, index) => (
          <SummaryCard
            src={el.src}
            sum={el.sum}
            name={el.name}
            proc={el.proc}
            arrow={el.arrow}
            key={index}
          />
        ))}
      </div>
      <div className={style.order_report}>
        <OrderTableItem />
      </div>
      <div className={style.most_order}>
        <MostOrderScreen data={mostOrderDishes} />
      </div>
      <div className={style.most_type_order}>
        <div className={style.top_container}>
          <div className={style.top_container_text}>Most Type of Order</div>
        </div>
        <div className={style.graph_container}>
          <div className={style.graph_wrap}>
            <CircleGraph
              radius={80}
              pct={80}
              colour={"#65B0F6"}
              secondColor={"#51505A"}
            />
            <CircleGraph
              radius={68}
              pct={40}
              colour={"#FFB572"}
              secondColor={"#2A2936"}
            />
            <CircleGraph
              radius={56}
              pct={60}
              colour={"#FF7CA3"}
              secondColor={"#51505A"}
            />
            <CircleGraph radius={44} pct={0} secondColor={"#2A2936"} />
          </div>
          <div className={style.type_of_order_container}>
            <div className={style.type_dineIn}>
              <div className={style.type_text}>Dine In</div>
              <div className={style.second_type_text}>200 customers</div>
            </div>
            <div className={style.type_toGo}>
              <div className={style.type_text}>To Go</div>
              <div className={style.second_type_text}>122 customers</div>
            </div>
            <div className={style.type_delivery}>
              <div className={style.type_text}>Delivery</div>
              <div className={style.second_type_text}>264 customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
