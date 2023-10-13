import Layout from "./layout/Layout";
import Contacts, { loader as contactsLoader } from "./pages/Contacts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllContacts, { loader as allContactsLoader } from "./pages/AllContacts";
import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="contacts" element={<Contacts />} loader={contactsLoader} />
        <Route
          path="all-contacts"
          element={<AllContacts />}
          loader={allContactsLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
