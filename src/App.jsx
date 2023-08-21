import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Tattoo from "./Pages/Tattoo/Tattoo";
import Edit from "./Pages/Admin/Admin";
import Cookies from "js-cookie";

import "./App.css";
import { useState } from "react";
import TattooAdmin from "./Pages/TattooAdmin/TattooAdmin";
import Footer from "./Components/Footer/Footer";

function App() {
  const [adminToken, setAdminToken] = useState(Cookies.get("adminToken") || "");
  // const server = "https://site--back-tattoo--tzmxcvqjqbzq.code.run/";
  // const server = "http://127.0.0.1:3000/";
  //tattooShopServer
  const server = "https://site--tattooshop-back--p8gvcnpxkk2p.code.run/";
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                server={server}
                adminToken={adminToken}
                setAdminToken={setAdminToken}
              />
            }
          />
          <Route
            path="tattooadmin/:id"
            element={<TattooAdmin server={server} adminToken={adminToken} />}
          />
          <Route
            path="tattoo/:id"
            element={<Tattoo server={server} adminToken={adminToken} />}
          />
          <Route
            path="admin/edit"
            element={
              <Edit
                server={server}
                adminToken={adminToken}
                setAdminToken={setAdminToken}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
