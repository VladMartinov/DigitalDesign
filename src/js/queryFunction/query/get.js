function GETXml(url, token) {
  console.log("-----------------------------------");
  console.log("Called method: GETXml");

  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  let id = "";

  xhr.open("GET", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("authorization", `Bearer ${token}`);
  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log("Error: ", xhr.response);
      return id;
    } else {
      console.log("response", xhr.response);
      id = xhr.response._id;
      return id;
    }
  };
  xhr.send();
}

async function GETFetch(url, token) {
  console.log("-----------------------------------");
  console.log("Called method: GETFetch");

  let id = "";

  await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((dataInJson) => {
      console.log("response", dataInJson);
      id = dataInJson._id;
    })
    .catch((error) => console.log("Error: ", error));

  return id;
}

function GETAxios(url, token) {
  console.log("-----------------------------------");
  console.log("Called method: GETAxios");

  let id = "";

  axios
    .get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("response", response.data);
      id = response.data._id;
    })
    .catch((error) => console.log(error));
  
    return id;
}

export { GETXml, GETFetch, GETAxios };
