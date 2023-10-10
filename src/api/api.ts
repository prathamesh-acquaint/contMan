import axios from "axios";

const token = localStorage.getItem("accessToken");

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

export const getUserContacts = (endpoint: string) => {
  const configurations = {
    method: "get",
    url: `${import.meta.env.VITE_API}/${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(configurations);
};

export const addContact = (payload: object, endpoint: string) => {
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

export const deleteContact = (id: number, endpoint: string) => {
  const config = {
    method: "delete",
    url: `${import.meta.env.VITE_API}/${endpoint}/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(config);
};

export const editContact = (id: number, endpoint: sring, payload: object) => {
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
