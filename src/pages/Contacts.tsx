import { useEffect, useState, useCallback, Suspense } from "react";
import AddContact from "../components/AddContact";
import ContactsTable from "../components/ContactsTable";
import { fetchCurrentUser } from "../store/contactsSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getUserContacts, editContact } from "../api/api";
import { ContactState } from "../store/contactsSlice";
import { requireAuth } from "../utils/auth";
import { defer, useLoaderData, Await } from "react-router-dom";
import { Button } from "flowbite-react";
type Inputs = {
  name: string;
  email: string;
  phone: number;
};

export async function loader() {
  await requireAuth();
  return defer({
    myContacts: getUserContacts(
      "contacts",
      localStorage.getItem("accessToken")
    ),
  });
}

const Contacts = () => {
  const [username, setUsername] = useState("Prathamesh");
  const [contacts, setMyContacts] = useState([]);
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const props = { openModal, setOpenModal, email, setEmail };

  const contactsPromise = useLoaderData();

  const dispatch = useDispatch();
  const state: ContactState = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchCurrentUser(localStorage.getItem("accessToken")));
    setUsername(state.data?.data?.username);
    getUserContacts("contacts", localStorage.getItem("accessToken")).then(
      (res) => {
        setMyContacts(res.data);
      }
    );
  }, []);

  const updatedContacts = (payload: Inputs) => {
    setMyContacts([...contacts, payload]);
  };

  const handleDelete = (id: number) => {
    deleteContact(id, "contacts", localStorage.getItem("accessToken")).then(
      () => {
        getUserContacts("contacts", localStorage.getItem("accessToken")).then(
          (res) => {
            setMyContacts(res.data);
          }
        );
      }
    );
  };

  const handleEdit = (id: number) => {
    editContact(id, "contacts", {}, localStorage.getItem("accessToken")).then(
      () => {
        getUserContacts("contacts", localStorage.getItem("accessToken")).then(
          (res) => {
            setMyContacts(res.data);
          }
        );
      }
    );
  };

  const noContacts = (
    <div className="flex justify-center items-center p-5">
      <h1 className="text-center p-5 text-2xl font-semibold dark:text-gray-100">
        No Contacts added !
      </h1>
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-5 mt-10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold dark:text-gray-100">
            Hello! {username}
          </h2>
          <Button
            onClick={() => props.setOpenModal("form-elements")}
            gradientDuoTone="greenToBlue"
            outline
          >
            Add Contact
          </Button>
        </div>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Await
            resolve={contactsPromise.myContacts}
            errorElement={<h1>Failed load contacts.</h1>}
          >
            {contacts.length >= 1 ? (
              <ContactsTable
                contacts={contacts}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ) : (
              noContacts
            )}
          </Await>
        </Suspense>
      </div>
      <AddContact
        openModal={openModal}
        setOpenModal={setOpenModal}
        updatedContacts={updatedContacts}
      />
    </>
  );
};

export default Contacts;
