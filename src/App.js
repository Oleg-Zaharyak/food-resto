import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Menu } from "./components/menu";
import { Home } from "./pages/Home";
import { Information } from "./pages/Info";
import { Mail } from "./pages/Mail";
import { Notification } from "./pages/Notification";

function App() {
  return (
    <div className="main_container">
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/information" element={<Information />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </div>
  );
}

export default App;
