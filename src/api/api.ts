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
