export const baseUrl = "http://localhost:3001";

export function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

//GET ITEMS
export function getItems() {
  return request(`${baseUrl}/items`);
}

// POST ITEM
export function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  })
    .then(handleServerResponse)
    .then((res) => res.data);
}

// DELETE ITEM
export function removeItem(itemId, token) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
}

// PUT LIKE
export function likeItem(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ token }),
  })
    .then(handleServerResponse)
    .then((res) => res.data);
}

// DELETE LIKE
export function unlikeItem(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleServerResponse)
    .then((res) => res.data);
}
