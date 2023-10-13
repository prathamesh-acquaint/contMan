import { addContact } from "../api/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
type Inputs = {
  name: string;
  email: string;
  phone: number;
};

interface AddContactProps {
  openModal: string | undefined;
  setOpenModal: string | undefined;
  updatedContacts: (payload: Inputs) => void;
}

export default function AddContact({
  updatedContacts,
  openModal,
  setOpenModal,
}: AddContactProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    addContact(data, "contacts", localStorage.getItem("accessToken")).then(
      (res) => {
        if (res.status == 201) {
          setIsLoading(false);
          setOpenModal(undefined);
        } else {
          setIsLoading(false);
          alert("Something went wrong, Please try again later!");
        }
        updatedContacts(data);
      }
    );
  };
  return (
    <Modal
      show={openModal === "form-elements"}
      size="md"
      popup
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header />
      <Modal.Body>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Add Contact to your account
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              placeholder="name@company.com"
              {...register("email", { required: true })}
              color={errors.email ? "failure" : "gray"}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Contact Name" />
            </div>
            <TextInput
              id="name"
              {...register("name", { required: true })}
              color={errors.name ? "failure" : "gray"}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Contact Number" />
            </div>
            <TextInput
              id="phone"
              {...register("phone", { required: true })}
              color={errors.phone ? "failure" : "gray"}
            />
          </div>
          <div className="w-full">
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              outline
              disabled={isLoading ? true : false}
              className="w-full"
            >
              {isLoading && (
                <Spinner aria-label="Spinner button example" size="sm" />
              )}
              <span className="pl-3">
                {isLoading ? "loading..." : "Add Contact"}
              </span>
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
