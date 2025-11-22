import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/landing" element={<Landing />} /> */}
    </Routes>
  );
}
