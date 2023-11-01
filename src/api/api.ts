import axios from "axios";

export const loginUser = (payload: object, endpoint: string) => {
  const configurations = {
    method: "post",
    url: `${import.meta.env.VITE_API}/${endpoint}`,
    data: payload,
  };
  return axios(configurations);
};

export const registerUser = (payload: object, endpoint: string) => {
  const configurations = {
    method: "post",
    url: `${import.meta.env.VITE_API}/${endpoint}`,
    data: payload,
  };
  return axios(configurations);
};

export const getUserContacts = (endpoint: string, token: string | null) => {
  const configurations = {
    method: "get",
    url: `${import.meta.env.VITE_API}/${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(configurations);
};

export const addContact = (
  payload: object,
  endpoint: string,
  token: string | null
) => {
  const configurations = {
    method: "post",
    url: `${import.meta.env.VITE_API}/${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  };
  return axios(configurations);
};

export const deleteContact = (
  id: number,
  endpoint: string,
  token: string | null
) => {
  const config = {
    method: "delete",
    url: `${import.meta.env.VITE_API}/${endpoint}/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const editContact = (
  id: number,
  endpoint: string,
  payload: object,
  token: string | null
) => {
  const editConfig = {
    method: "put",
    url: `${import.meta.env.VITE_API}/${endpoint}/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  };
  return axios(editConfig);
};

export const getAllContacts = (endpoint: string, token: string) => {
  const config = {
    method: "get",
    url: `${import.meta.env.VITE_API}/${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const sendOtp = (endpoint: string, payload: object) => {
  const config = {
    method: "post",
    url: `${import.meta.env.VITE_API}/${endpoint}`,
    data: payload,
  };
  return axios(config);
};

export const verifyOtp = (endpoint: string, payload: object) => {
  const config = {
    method: "post",
    url: `${import.meta.env.VITE_API}/${endpoint}`,
    data: payload,
  };
  return axios(config);
};

export const exportToPDF = async (contacts, token) => {
  try {
    console.log("inside export", contacts);
    // Send a POST request to the server to generate the PDF
    const response = await fetch(
      `http://localhost:3001/api/contacts/download-pdf`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contacts }),
      }
    );

    if (response.ok) {
      // Trigger the download of the PDF file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      console.log(blob, url, a, "OK Reponse");
      a.href = url;
      a.download = "contacts.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Failed to generate the PDF.");
    }
  } catch (error) {
    console.error("Error exporting to PDF:", error);
  }
};
