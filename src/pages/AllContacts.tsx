import { requireAuth } from "../utils/auth";
import { getAllContacts } from "../api/api";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { Card } from "flowbite-react";

export async function loader() {
  await requireAuth();
  return defer({
    allContacts: getAllContacts(
      "contacts/all",
      localStorage.getItem("accessToken")
    ),
  });
}

const AllContacts = () => {
  const contactsPromise = useLoaderData();
  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Suspense
          fallback={
            <h1 className="text-black dark:text-gray-100">
              Loading Contacts...
            </h1>
          }
        >
          <Await resolve={contactsPromise.allContacts}>
            {(allContacts) =>
              allContacts.data.map((contact: object, index: number) => (
                <Card key={index} className="max-w-sm overflow-auto" href="#">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>{contact.name}</p>
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>{contact.email}</p>
                    <p>{contact.phone}</p>
                  </p>
                </Card>
              ))
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default AllContacts;
