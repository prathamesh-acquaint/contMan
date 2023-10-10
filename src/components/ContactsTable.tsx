export default function ContactsTable({
  contacts,
  handleDelete,
  handleEdit,
  openModel,
}) {
  const noContacts = (
    <div className="flex justify-center items-center p-5">
      <h1 className="text-center p-5 text-2xl font-semibold">
        No Contacts added !
      </h1>
    </div>
  );

  const edit = (id) => {
    handleEdit(id);
    openModel();
  };
  return (
    <div className="relative overflow-x-auto shadow-lg border border-gray-900 dark:border-white sm:rounded-lg">
      {contacts.length < 1 ? (
        noContacts
      ) : (
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
            {contacts.map((item, index) => (
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
                      onClick={edit}
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleDelete(item._id, "contacts")}
                    >
                      Delete
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
