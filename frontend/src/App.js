import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import PromotionModal from "./utils/PromotionModal/PromotionModal";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
      <PromotionModal />
    </div>
  );
}

export default App;
