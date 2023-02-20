import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { LoginPage } from "./components/Login_page";
import { Menu } from "./components/menu";
import { Promotion } from "./pages/Promotion";
import { RegistrationPage } from "./components/Registration";
import { Home } from "./pages/Home";
import { Statistic } from "./pages/Statistic";
import { SiteSetting } from "./pages/SiteSetting";
import { UserPage } from "./pages/User";
// import { UserOrders } from "./pages/UserOrders";
import { Information } from "./pages/Information";
import { useAuth } from "./hooks/use-auth";
import { useEffect } from "react";
import { setUser } from "./store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Loader } from "./components/Loader";

function App() {
  const { id } = useAuth();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("items"));
  useEffect(() => {
    if (user !== null) {
      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        })
      );
    }
  }, [dispatch, user]);

  return (
    <div className="main_container">
      <Loader />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/information" element={<Information />} />

        {/* <Route path="/user_orders" element={<UserOrders />} /> */}

        <Route path="/statistic" element={<Statistic />} />
        <Route path="/site_setting" element={<SiteSetting />} />

        {/* <Route path="/user_list" element={<UsersList />} /> */}

        <Route path="/logIn" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        {/* <Route path="/user" element={<UserPage />} /> */}
        <Route path={`/user/${id}`} element={<UserPage id={id} />} />
      </Routes>
    </div>
  );
}

export default App;
