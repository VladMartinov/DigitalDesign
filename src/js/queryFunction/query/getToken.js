function POSTTokenXml(url, data) {
  console.log("-----------------------------------");
  console.log("Called method: POSTTokenXml");

  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status >= 400) {
        console.log("Error: ", xhr.response);
      } else {
        resolve(xhr.response.token);
      }
    };
    xhr.send(JSON.stringify(data));
  });
}

function POSTTokenFetch(url, data) {
  console.log("-----------------------------------");
  console.log("Called method: POSTTokenFetch");

  return new Promise(function (resolve, reject) {
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
        resolve(response.token);
      })
      .catch((error) => console.log("Error: ", error));
  });
}

function POSTTokenAxios(url, data) {
  console.log("-----------------------------------");
  console.log("Called method: POSTTokenAxios");

  return new Promise(function (resolve, reject) {
    axios
      .post(url, data)
      .then((response) => {
        resolve(response.data.token);
      })
      .catch((error) => console.log(error));
  });
}

export { POSTTokenXml, POSTTokenFetch, POSTTokenAxios };
