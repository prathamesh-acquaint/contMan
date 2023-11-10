import { Table } from "flowbite-react";
import { FaShareAlt } from "react-icons/fa";
import ShareContactForm from "./ShareContactForm";
import { useState } from "react";

type ContactsTableProps = {
  contacts: Array<ContactTypes>;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
  openModel: () => void;
};

interface ContactTypes {
  email: string;
  name: string;
  phone: number;
  _id: number;
}

export default function ContactsTable({
  contacts,
  handleDelete,
  handleEdit,
}: ContactsTableProps) {
  const edit = (id: number) => {
    handleEdit(id);
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(undefined);

  const handleModal = (item) => {
    setSelectedContact(item);
    setOpenModal(true);
  };
  return (
    <div className="relative overflow-x-auto shadow-lg border border-gray-900 dark:border-white sm:rounded-lg">
      <Table>
        <Table.Head>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>Share</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {contacts?.map((item, index: number) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={index}
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.email}
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.phone}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={edit}
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </a>
                </div>
              </Table.Cell>
              <Table.Cell>
                <FaShareAlt
                  className="cursor-pointer text-xl text-green-500"
                  onClick={() => handleModal(item)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {openModal && (
        <ShareContactForm
          setOpenModal={setOpenModal}
          contact={selectedContact}
        />
      )}
    </div>
  );
}
