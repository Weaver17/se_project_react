import { baseUrl, request } from "./itemApi";

export const register = (name, password, email, avatar) => {
  const requestBody = JSON.stringify({ name, password, email, avatar });
  console.log("Request body:", requestBody);

  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password, email, avatar }),
  });
};

export const authorize = (email, password) => {
  console.log(email, password);

  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => {
    localStorage.setItem("jwt", data.token);
    console.log(data);
    return data;
  });
};

export const checkToken = (token) => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.message);
};

export const editProfile = ({ name, avatar }, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => res.message);
};
