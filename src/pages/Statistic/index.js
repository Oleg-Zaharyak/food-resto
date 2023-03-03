import React, { useEffect } from "react";
import { SummaryCard } from "../../components/Summary_card";
import style from "./styles.module.scss";
import { TypeDelivery } from "../../components/Type_delivery";
import { CircleGraph } from "../../components/Statistics_graph";
import { useDispatch, useSelector } from "react-redux";
import { getTypeDelivery } from "../../store/action/items";
import { getAllOrders } from "../../store/action/orders";
import { OrderTableItem } from "../../components/Oreder_table";

export const Statistic = () => {
  const { typeDelivery } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const { allOrders } = useSelector((state) => state.orders);
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
  const data_item = [
    {
      src: "Image1",
      name: "Spicy seasoned seafood noodles",
      order: "200 dishes ordered",
    },
    {
      src: "Image2",
      name: "Salted pasta with mushroom sauce",
      order: "120 dishes ordered",
    },
    {
      src: "Image3",
      name: "Beef dumpling in hot and sour soup",
      order: "80 dishes ordered",
    },
  ];

  const headerText = [
    "#",
    "Total price",
    "Payment type",
    "Order status",
    "Data(D/M/Y), time",
    "Name",
  ];

  useEffect(() => {
    dispatch(getTypeDelivery());
    dispatch(getAllOrders());
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
        <div className={style.top_order_container}>
          <div className={style.top_order_text}>Order Report</div>
          <div className={style.top_order_filter}>
            <svg
              className={style.filter_icon}
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.1976 10.2271C15.927 10.2271 17.3329 11.6148 17.3329 13.3219C17.3329 15.028 15.927 16.4167 14.1976 16.4167C12.4683 16.4167 11.0624 15.028 11.0624 13.3219C11.0624 11.6148 12.4683 10.2271 14.1976 10.2271ZM14.1976 11.6787C13.279 11.6787 12.533 12.4151 12.533 13.3219C12.533 14.2277 13.279 14.9651 14.1976 14.9651C15.1162 14.9651 15.8623 14.2277 15.8623 13.3219C15.8623 12.4151 15.1162 11.6787 14.1976 11.6787ZM7.4308 12.5958C7.83667 12.5958 8.16608 12.921 8.16608 13.3216C8.16608 13.7223 7.83667 14.0474 7.4308 14.0474H1.40247C0.996596 14.0474 0.66719 13.7223 0.66719 13.3216C0.66719 12.921 0.996596 12.5958 1.40247 12.5958H7.4308ZM3.80174 0.583374C5.53112 0.583374 6.93698 1.97207 6.93698 3.67818C6.93698 5.38429 5.53112 6.77298 3.80174 6.77298C2.07334 6.77298 0.666504 5.38429 0.666504 3.67818C0.666504 1.97207 2.07334 0.583374 3.80174 0.583374ZM3.80174 2.03497C2.88411 2.03497 2.13707 2.77238 2.13707 3.67818C2.13707 4.58397 2.88411 5.32138 3.80174 5.32138C4.72035 5.32138 5.46642 4.58397 5.46642 3.67818C5.46642 2.77238 4.72035 2.03497 3.80174 2.03497ZM16.5979 2.95257C17.0038 2.95257 17.3332 3.27773 17.3332 3.67837C17.3332 4.07901 17.0038 4.40417 16.5979 4.40417H10.5686C10.1627 4.40417 9.8333 4.07901 9.8333 3.67837C9.8333 3.27773 10.1627 2.95257 10.5686 2.95257H16.5979Z" />
            </svg>
            Filter Order
          </div>
        </div>
        <div className={style.table_header}>
          <div className={style.table_customer}>Customer</div>
          <div className={style.table_menu}>Menu</div>
          <div className={style.table_payment}>Total Payment</div>
          <div className={style.table_status}>Status</div>
        </div>
        <div className={style.order_report_container}>
          <OrderTableItem data={allOrders} headerText={headerText} />
        </div>
      </div>
      <div className={style.most_order}>
        <div className={style.top_container}>
          <div className={style.top_container_text}>Most Ordered</div>
          <TypeDelivery selected={"Choose Delivery"} data={typeDelivery} />
        </div>
        <div className={style.most_order_item_container}>
          {data_item.map((el, index) => (
            <div className={style.most_order_item} key={index}>
              <img
                className={style.most_order_image}
                src={require(`./../../assets/images/${el.src}.png`)}
                alt="img"
              ></img>
              <div className={style.order_item_text}>
                <div className={style.order_item_main_text}>{el.name}</div>
                <div className={style.order_item_secon_text}>{el.order}</div>
              </div>
            </div>
          ))}
        </div>
        <button className={style.most_order_button}>View All</button>
      </div>
      <div className={style.most_type_order}>
        <div className={style.top_container}>
          <div className={style.top_container_text}>Most Type of Order</div>
          <TypeDelivery selected={"Choose Delivery"} data={typeDelivery} />
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
