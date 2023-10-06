import axios from "axios";

const token = localStorage.getItem("accessToken");

export const loginUser = (payload: object, endpoint: string) => {
  const configurations = {
    method: "post",
    url: `http://localhost:5001/api/${endpoint}`,
    data: payload,
  };
  return axios(configurations);
};

export const registerUser = (payload: object, endpoint: string) => {
  const configurations = {
    method: "post",
    url: `http://localhost:5001/api/${endpoint}`,
    data: payload,
  };
  return axios(configurations);
};

export const getUserContacts = (endpoint: string) => {
  const configurations = {
    method: "get",
    url: `http://localhost:5001/api/${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios(configurations);
};

export const addContact = (payload: object, endpoint: string) => {
  const configurations = {
    method: "post",
    url: `http://localhost:5001/api/${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  };
  return axios(configurations);
};
