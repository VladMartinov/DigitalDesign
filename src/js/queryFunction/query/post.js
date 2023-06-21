import { setProjectID, setTaskID } from "@/js/workWithStorage";

function POSTXml(url, token, data, typePage) {
  console.log("-----------------------------------");
  console.log("Called method: POSTXml");

  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("authorization", `Bearer ${token}`);
  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log("Error: ", xhr.response);
    } else {
      if (typePage === "projects") {
        setProjectID(xhr.response._id);
      } else if (typePage === "tasks") {
        setTaskID(xhr.response._id);
      }
      console.log("response", xhr.response);
    }
  };
  xhr.send(JSON.stringify(data));
}

async function POSTFetch(url, token, data, typePage) {
  console.log("-----------------------------------");
  console.log("Called method: POSTFetch");

  await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((dataInJson) => {
      if (typePage === "projects") {
        setProjectID(dataInJson._id);
      } else if (typePage === "tasks") {
        setTaskID(dataInJson._id);
      }
      console.log("response", dataInJson);
    })
    .catch((error) => console.log("Error: ", error));
}

function POSTAxios(url, token, data, typePage) {
  console.log("-----------------------------------");
  console.log("Called method: POSTAxios");

  axios
    .post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (typePage === "projects") {
        setProjectID(response.data._id);
      } else if (typePage === "tasks") {
        setTaskID(response.data._id);
      }
      console.log("response", response.data);
    })
    .catch((error) => console.log(error));
}

export { POSTXml, POSTFetch, POSTAxios };
