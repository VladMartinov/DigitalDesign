import { delProjectID, delTaskID } from "@/js/workWithStorage";

function DELETEXml(url, token, typePage) {
  console.log("-----------------------------------");
  console.log("Called method: DELETEXml");

  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  xhr.open("DELETE", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("authorization", `Bearer ${token}`);
  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log("Error: ", xhr.response);
    } else {
      if (typePage === "projects") {
        delProjectID();
      } else if (typePage === "tasks") {
        delTaskID();
      }
      console.log("response", xhr.response);
    }
  };
  xhr.send();
}

async function DELETEFetch(url, token, typePage) {
  console.log("-----------------------------------");
  console.log("Called method: DELETEFetch");

  await fetch(url, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((dataInJson) => {
      if (typePage === "projects") {
        delProjectID();
      } else if (typePage === "tasks") {
        delTaskID();
      }
      console.log("response", dataInJson);
    })
    .catch((error) => console.log("Error: ", error));
}

function DELETEAxios(url, token, typePage) {
  console.log("-----------------------------------");
  console.log("Called method: DELETEAxios");

  axios
    .delete(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (typePage === "projects") {
        delProjectID();
      } else if (typePage === "tasks") {
        delTaskID();
      }
      console.log("response", response.data);
    })
    .catch((error) => console.log(error));
}

export { DELETEXml, DELETEFetch, DELETEAxios };
