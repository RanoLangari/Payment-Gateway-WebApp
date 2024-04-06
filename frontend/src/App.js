import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
