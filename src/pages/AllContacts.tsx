import { requireAuth } from "../utils/auth";
import { getAllContacts } from "../api/api";
import { useEffect, useState } from "react";
import { TextInput, Button } from "flowbite-react";
import Loader from "../components/Loader";
import { useForm, SubmitHandler } from "react-hook-form";
import ContactCard from "../components/ContactCard";

export async function loader() {
  return requireAuth();
}

type Inputs = {
  name: string;
};

const AllContacts = () => {
  let [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setLoading(true);
    getAllContacts("contacts/all", localStorage.getItem("accessToken")).then(
      (res) => {
        setLoading(false);
        setContacts(res.data);
      }
    );
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(contacts);
    const updatedContacts = contacts.filter((contact) =>
      contact.name.includes(data.name)
    );
    setContacts(updatedContacts);
  };

  const clearFilters = () => {
    getAllContacts("contacts/all", localStorage.getItem("accessToken")).then(
      (res) => {
        setLoading(false);
        setContacts(res.data);
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-center font-bold text-3xl text-black dark:text-gray-100">
        All Contacts
      </h1>
      <div className="flex justify-between items-center">
        <form
          className="flex gap-3 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            id="name"
            placeholder="prathamesh"
            {...register("name", { required: true })}
            color={errors.name ? "failure" : "gray"}
          />
          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            Search
          </Button>
        </form>
        <Button gradientDuoTone="purpleToPink" outline onClick={clearFilters}>
          Clear
        </Button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contacts.map((contact: number, index: number) => (
            <ContactCard key={index} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllContacts;
