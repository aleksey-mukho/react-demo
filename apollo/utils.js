import fetch from "node-fetch";

export function fetchApi(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.json);
      }
      return response;
    })
    .then(
      resp => resp.json(),
      error => ({ error: error.message || "Something bad happened" })
    );
}
