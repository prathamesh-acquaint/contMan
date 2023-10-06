import axios from "axios";
import { useEffect, useState } from "react";

export default function ContactsTable() {
  const [myContacts, setMyContacts] = useState([]);
  const token = localStorage.getItem("accessToken");

  const configurations = {
    method: "get",
    url: "http://localhost:5001/api/contacts",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios(configurations).then((res) => {
      setMyContacts(res.data);
    });
  }, []);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {myContacts.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.email}
              </th>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.phone}</td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
