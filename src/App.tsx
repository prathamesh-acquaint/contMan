import Layout from "./layout/Layout";
import Contacts, { loader as contactsLoader } from "./pages/Contacts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllContacts, { loader as allContactsLoader } from "./pages/AllContacts";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import OtpVerification from "./pages/OtpVerification";
import { useSelector } from "react-redux";
import Logout from "./pages/Logout";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {isLoggedIn ? (
          <>
            <Route index element={<Contacts />} loader={contactsLoader} />
            <Route
              path="all-contacts"
              element={<AllContacts />}
              loader={allContactsLoader}
            />
            <Route path="logout" element={<Logout />} />
          </>
        ) : (
          <>
            <Route index element={<Login />} />
            <Route path="otp" element={<OtpVerification />} />
            <Route path="register" element={<Register />} />
          </>
        )}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
