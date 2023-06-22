import { setToken } from "@/js/workWithStorage";

function POSTTokenXml(url, data) {
  console.log("-----------------------------------");
  console.log("Called method: POSTTokenXml");

  const xhr = new XMLHttpRequest();

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log("Error: ", xhr.response);
    } else {
      setToken(xhr.response.token);
      console.log("Token is ready!");
    }
  };

  xhr.send(JSON.stringify(data));
}

async function POSTTokenFetch(url, data) {
  console.log("-----------------------------------");
  console.log("Called method: POSTTokenFetch");

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setToken(response.token);
        resolve();
      })
      .catch((error) => {
        console.log("Error: ", error);
        reject("Failed to POST token");
      });
  });
}

async function POSTTokenAxios(url, data) {
  console.log("-----------------------------------");
  console.log("Called method: POSTTokenAxios");

  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((response) => {
        setToken(response.data.token);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject("Failed to POST token");
      });
  });
}

export { POSTTokenXml, POSTTokenFetch, POSTTokenAxios };
