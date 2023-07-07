import axios from "axios";

function GETFunc (url, token) {
  console.log("-----------------------------------");
  console.log("Called method: GETAxios");


  return new Promise((resolve, reject) =>
    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response: ", response.data);
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  );
}

function POSTFunc (url, data, token) {
  console.log("-----------------------------------");
  console.log("Called method: POSTAxios");

  return new Promise((resolve, reject) =>
    axios
      .post(url, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response: ", response.data);
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  );
}

function PUTFunc (url, data, token) {
  console.log("-----------------------------------");
  console.log("Called method: PUTAxios");

  return new Promise((resolve, reject) =>
    axios
      .put(url, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response: ", response.data);
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    );
}

function DELETEFunc (url, token) {
  console.log("-----------------------------------");
  console.log("Called method: DELETEAxios");

  return new Promise((resolve, reject) =>
    axios
      .delete(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response: ", response.data);
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    );
}

function AuthFunc (url, data) {
  console.log("-----------------------------------");
  console.log("Called method: RegFunc");

  return new Promise((resolve, reject) =>
    axios
      .post(url, data)
      .then((response) => {
        console.log("Response: ", response.data);
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error);
        reject(error)
      }
    ));
}

export { GETFunc, POSTFunc, PUTFunc, DELETEFunc, AuthFunc }