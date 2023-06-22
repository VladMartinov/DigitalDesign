function PUTXml(url, token, data) {
  console.log("-----------------------------------");
  console.log("URL: " + url);
  console.log("Called method: PUTXml");

  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  xhr.open("PUT", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("authorization", `Bearer ${token}`);
  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log("Error: ", xhr.response);
    } else {
      console.log("response", xhr.response);
    }
  };
  xhr.send(JSON.stringify(data));
}

async function PUTFetch(url, token, data) {
  console.log("-----------------------------------");
  console.log("Called method: PUTFetch");

  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((dataInJson) => console.log("response", dataInJson))
    .catch((error) => console.log("Error: ", error));
}

function PUTAxios(url, token, data) {
  console.log("-----------------------------------");
  console.log("Called method: PUTAxios");

  axios
    .put(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => console.log("response", response.data))
    .catch((error) => console.log(error));
}

export { PUTXml, PUTFetch, PUTAxios };
