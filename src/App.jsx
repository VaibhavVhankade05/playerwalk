import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./pages/Landing";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Post from "./components/home/Post";
// import Sidebar from "./components/home/Sidebar";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/navbar" element={<Navbar />} /> */}
      {/* <Route path="/footer" element={<Footer />} /> */}
      {/* <Route path="/post" element={<Post />} /> */}
       {/* <Route path="/sidebar" element={<Sidebar />} /> */}
    </Routes>
  );
}
