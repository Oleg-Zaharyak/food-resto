import React from "react";
import style from "./styles.module.scss";
import logo from "./../../assets/images/Logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth, useUserAdmin } from "./../../hooks/use-auth";
import { useSelector } from "react-redux";

export const Menu = () => {
  const navigate = useNavigate();
  const { isAuth, id } = useAuth();
  const { adminLogin } = useUserAdmin();
  const openPopUp = () =>
    isAuth ? navigate(`/user/${id}`) : navigate("/logIn");

  const { basketData } = useSelector((state) => state.basket);
  let price = 0;
  basketData.map((el) => (price += el.count * el.price));
  const totalPrice = price.toFixed(2);

  return (
    <>
      <div className={style.container}>
        <div className={style.logo}>
          <img className={style.logo_icon} src={logo} alt="Logo" />
        </div>
        <div className={style.menu_button}>
          <div className={style.hover_container}>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive && window.location.pathname === "/"
                  ? style.active
                  : style.link_container
              }
            >
              <svg
                className={style.icon}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.73037 0.788355C9.00037 -0.220645 10.7804 -0.260645 12.0894 0.668355L12.2504 0.788355L18.3394 5.65935C19.0094 6.17835 19.4204 6.94936 19.4904 7.78835L19.5004 7.98935V16.0984C19.5004 18.1884 17.8494 19.8884 15.7804 19.9984H13.7904C12.8394 19.9794 12.0704 19.2394 12.0004 18.3094L11.9904 18.1684V15.3094C11.9904 14.9984 11.7594 14.7394 11.4504 14.6884L11.3604 14.6784H8.68937C8.37037 14.6884 8.11037 14.9184 8.07037 15.2184L8.06037 15.3094V18.1594C8.06037 18.2184 8.04937 18.2884 8.04037 18.3384L8.03037 18.3594L8.01937 18.4284C7.90037 19.2794 7.20037 19.9284 6.33037 19.9894L6.20037 19.9984H4.41037C2.32037 19.9984 0.610366 18.3594 0.500366 16.2984V7.98935C0.509366 7.13835 0.880366 6.34835 1.50037 5.79835L7.73037 0.788355ZM11.3804 1.87835C10.6204 1.26835 9.54037 1.23935 8.74037 1.76835L8.58937 1.87835L2.50937 6.77936C2.16037 7.03835 1.95037 7.42836 1.90037 7.83836L1.88937 7.99835V16.0984C1.88937 17.4284 2.92937 18.5184 4.25037 18.5984H6.20037C6.42037 18.5984 6.61037 18.4494 6.63937 18.2394L6.66037 18.0594L6.67037 18.0084V15.3094C6.67037 14.2394 7.49037 13.3694 8.54037 13.2884H11.3604C12.4294 13.2884 13.2994 14.1094 13.3804 15.1594V18.1684C13.3804 18.3784 13.5304 18.5594 13.7304 18.5984H15.5894C16.9294 18.5984 18.0194 17.5694 18.0994 16.2584L18.1104 16.0984V7.99835C18.0994 7.56936 17.9204 7.16835 17.6104 6.86935L17.4804 6.75835L11.3804 1.87835Z" />
              </svg>
            </NavLink>
          </div>
          <div className={style.hover_container}>
            <NavLink
              to={"/promotion"}
              className={({ isActive }) =>
                isActive && window.location.pathname === "/promotion"
                  ? style.active
                  : style.link_container
              }
            >
              <svg
                className={style.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
              </svg>
            </NavLink>
          </div>
          <div className={style.hover_container}>
            <NavLink
              to={"/information"}
              className={({ isActive }) =>
                isActive && window.location.pathname === "/information"
                  ? style.active
                  : style.link_container
              }
            >
              <svg
                className={style.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </NavLink>
          </div>

          {isAuth && adminLogin ? (
            <>
              <div className={style.hover_container}>
                <NavLink
                  to={"/statistic"}
                  className={({ isActive }) =>
                    isActive && window.location.pathname === "/statistic"
                      ? style.active
                      : style.link_container
                  }
                >
                  <svg
                    className={style.icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />{" "}
                  </svg>
                </NavLink>
              </div>

              <div className={style.hover_container}>
                <NavLink
                  to={"/site_setting"}
                  className={({ isActive }) =>
                    isActive && window.location.pathname === "/site_setting"
                      ? style.active
                      : style.link_container
                  }
                >
                  <svg
                    className={style.icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />{" "}
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                  </svg>
                </NavLink>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
        <div className={style.bottom_continer}>
          <div className={style.hover_container}>
            <NavLink
              to={"/busket"}
              className={({ isActive }) =>
                isActive && window.location.pathname === "/busket"
                  ? style.active_busket
                  : style.link_busket_container
              }
            >
              <div className={style.busket_price}>{totalPrice}</div>
              <svg
                className={style.icon}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </NavLink>
          </div>
          <button onClick={openPopUp} className={style.exit_button}>
            {isAuth ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={style.icon}
                width="21"
                height="21"
                fill="currentColor"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fillRule="nonzero"
                    d="M12 17c3.662 0 6.865 1.575 8.607 3.925l-1.842.871C17.347 20.116 14.847 19 12 19c-2.847 0-5.347 1.116-6.765 2.796l-1.841-.872C5.136 18.574 8.338 17 12 17zm0-15a5 5 0 0 1 5 5v3a5 5 0 0 1-4.783 4.995L12 15a5 5 0 0 1-5-5V7a5 5 0 0 1 4.783-4.995L12 2zm0 2a3 3 0 0 0-2.995 2.824L9 7v3a3 3 0 0 0 5.995.176L15 10V7a3 3 0 0 0-3-3z"
                  />
                </g>
              </svg>
            ) : (
              <svg
                className={style.icon}
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.33097 0.0214844C11.7102 0.0214844 13.6521 1.89542 13.7611 4.24772L13.766 4.45648V5.38948C13.766 5.8037 13.4302 6.13948 13.016 6.13948C12.6363 6.13948 12.3225 5.85733 12.2728 5.49125L12.266 5.38948V4.45648C12.266 2.89358 11.044 1.61575 9.50341 1.52647L9.33097 1.52148H4.45597C2.89392 1.52148 1.61623 2.74362 1.52696 4.28406L1.52197 4.45648V15.5865C1.52197 17.1493 2.74388 18.4272 4.28363 18.5165L4.45597 18.5215H9.34097C10.8983 18.5215 12.172 17.3039 12.261 15.7693L12.266 15.5975V14.6545C12.266 14.2403 12.6018 13.9045 13.016 13.9045C13.3957 13.9045 13.7095 14.1866 13.7591 14.5527L13.766 14.6545V15.5975C13.766 17.9687 11.8992 19.9046 9.55533 20.0164L9.34097 20.0215H4.45597C2.07753 20.0215 0.135813 18.1474 0.0267998 15.7952L0.0219727 15.5865V4.45648C0.0219727 2.07743 1.89573 0.135347 4.24728 0.0263125L4.45597 0.0214844H9.33097ZM17.326 6.50234L17.4103 6.57478L20.3383 9.48978C20.3647 9.51594 20.3878 9.54256 20.409 9.57073L20.3383 9.48978C20.3689 9.52019 20.3963 9.55258 20.4205 9.58653C20.4376 9.61028 20.4533 9.63538 20.4676 9.66142C20.4702 9.66648 20.4728 9.67145 20.4754 9.67645C20.4881 9.70042 20.4993 9.72529 20.5092 9.75084C20.5132 9.76202 20.5173 9.77334 20.5211 9.78473C20.5284 9.80575 20.5345 9.8274 20.5397 9.84942C20.5421 9.86118 20.5445 9.87286 20.5467 9.88457C20.5508 9.90501 20.5538 9.9261 20.5559 9.94745C20.557 9.96231 20.558 9.97701 20.5586 9.99174C20.5593 10.0016 20.5595 10.0115 20.5595 10.0214L20.5586 10.0497C20.5581 10.0651 20.557 10.0805 20.5555 10.0958L20.5595 10.0214C20.5595 10.0682 20.5552 10.1141 20.547 10.1585C20.5445 10.1696 20.5421 10.1814 20.5394 10.193C20.5343 10.2162 20.5279 10.2387 20.5205 10.2607C20.5167 10.2709 20.513 10.2813 20.509 10.2915C20.4997 10.3164 20.4889 10.3405 20.4769 10.3639C20.4739 10.3692 20.4708 10.3751 20.4675 10.381C20.4331 10.4443 20.39 10.5015 20.3398 10.5517L20.3384 10.5527L17.4104 13.4687C17.1169 13.761 16.642 13.76 16.3498 13.4665C16.084 13.1997 16.0607 12.783 16.2791 12.4898L16.3519 12.4059L17.991 10.7705L7.76847 10.7714C7.35426 10.7714 7.01847 10.4356 7.01847 10.0214C7.01847 9.64169 7.30063 9.32789 7.6667 9.27823L7.76847 9.27139L17.993 9.27048L16.352 7.63779C16.0852 7.37212 16.06 6.95551 16.2772 6.66142L16.3497 6.57714C16.6153 6.31028 17.0319 6.28514 17.326 6.50234Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
