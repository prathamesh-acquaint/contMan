import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import AddContact from "../components/AddContact";
import ContactsTable from "../components/ContactsTable";
import { fetchCurrentUser } from "../store/contactsSlice";
import { useDispatch, useSelector } from "react-redux";

const Contacts = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("Prathamesh");

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state, "from redux");

  const token = localStorage.getItem("accessToken");

  const openModel = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const configurations = {
    method: "get",
    url: "http://localhost:5001/api/users/current",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    dispatch(fetchCurrentUser());
    setUsername(state.data.)
    axios(configurations).then((res) => {
      setUsername(res.data.username);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col gap-5 mt-10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold">Hello! {username}</h2>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={openModel}
          >
            Add Contact
          </button>
        </div>
        <ContactsTable />
      </div>
      {showModal && (
        <Modal>
          <AddContact closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default Contacts;
