import Layout from "./layout/Layout";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const isLoggedIn = localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="contacts"
            element={isLoggedIn ? <Contacts /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
