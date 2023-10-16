import { Card } from "flowbite-react";

const ContactCard = ({ contact }) => {
  return (
    <Card className="max-w-sm overflow-auto" href="#">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>{contact.name}</p>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
      </p>
    </Card>
  );
};

export default ContactCard;
