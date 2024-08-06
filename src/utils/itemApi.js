const baseUrl = 'http://localhost:3001';

function request(url, options) {
    return fetch(url, options).then(handleServerResponse)
  }

export const handleServerResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export function getItems() {
    return request(`${baseUrl}/items`);
}

export function addItem({ name, imageUrl, weather }) {
    return fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
        },
      body: JSON.stringify({
        name,
        imageUrl,
        weather
      }),
    }).then(handleServerResponse);
}

export function removeItem(itemId) {
    return fetch(`${baseUrl}/items/${itemId}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json"
        },
    }).then(handleServerResponse);;
  }