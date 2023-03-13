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
import { Information } from "./pages/Information";
import { useEffect } from "react";
import { setUser } from "./store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./components/Loader";
import PrivateRoutes from "./utils/PrivateRoutes";
import { PageNotFound } from "./pages/NotFoundPage";
import { Basket } from "./pages/Basket";

function App() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("items"));
    if (user) {
      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.stsTokenManager.accessToken,
        })
      );
    }
  }, [dispatch]);

  return (
    <div className="main_container">
      <Loader />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/information" element={<Information />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/statistic" element={<Statistic />} />
          <Route path="/site_setting" element={<SiteSetting />} />
        </Route>

        <Route path={`/user/${id}`} element={<UserPage id={id} />} />
        <Route path="/busket" element={<Basket />} />

        <Route path="/logIn" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
