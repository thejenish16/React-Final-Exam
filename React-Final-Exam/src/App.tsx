import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard"
import CoinDetail from "./pages/coinDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;