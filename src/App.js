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

function App() {
  const { id } = useAuth();

  return (
    <div className="main_container">
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
