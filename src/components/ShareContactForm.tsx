import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { addContact } from "../api/api";
import { toast } from "react-toastify";

function ShareContactForm({ setOpenModal, contact }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toShare = {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    to: email,
  };

  const handleSubmit = () => {
    if (email) {
      setIsLoading(true);
      addContact(toShare, "contacts/share", localStorage.getItem("accessToken"))
        .then((res) => {
          setIsLoading(false);
          setEmail("");
          if (res.status == 201) {
            toast.success("Contact Shared");
            setOpenModal(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setError(true);
          setErrorMessage(err.response?.data?.message);
        });
    }
  };

  return (
    <>
      <Modal show={true} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Share Contact
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <Button
                className="w-full"
                type="submit"
                gradientDuoTone="purpleToBlue"
                outline
                disabled={isLoading ? true : false}
                onClick={handleSubmit}
              >
                {isLoading && (
                  <Spinner aria-label="Spinner button example" size="sm" />
                )}
                <span className="pl-3">
                  {isLoading ? "loading..." : "Share"}
                </span>
              </Button>
              {error && (
                <p className="text-red-600  dark:text-red-400 text-center mt-2">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ShareContactForm;
