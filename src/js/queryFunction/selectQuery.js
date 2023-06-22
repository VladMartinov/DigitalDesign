import { getProjectID, getTaskID } from "@/js/workWithStorage";
import { DELETEAxios, DELETEFetch, DELETEXml } from "./query/delete";
import { GETAxios, GETFetch, GETXml } from "./query/get";
import { POSTTokenAxios } from "./query/getToken";
import { POSTAxios, POSTFetch, POSTXml } from "./query/post";
import { PUTAxios, PUTFetch, PUTXml } from "./query/put";
import { getToken } from "@/js/workWithStorage";

async function SelectQuery(eventTargetDOM, url, typePage) {
  let query = eventTargetDOM.dataset.query;
  let queryMethod = eventTargetDOM.dataset.querytype;

  let data = {};
  let dataLogin = {
    login: "martynov.v",
    password: "jc63fk",
  };

  /* ID task and project */
  let idProject = getProjectID();
  let idTask = getTaskID();

  let urlLogin = url + "login";
  let urlPOSTAndPUT = url + typePage;
  let urlGETAndDELETE =
    typePage === "projects"
      ? url + typePage + `/${idProject}`
      : url + typePage + `/${idTask}`;

  let token = getToken();

  if (token === null) {
    await POSTTokenAxios(urlLogin, dataLogin);

    token = getToken();
  }

  console.log("#############");
  console.log(`Token: ${token}`);
  console.log(`ID projects: ${idProject}`);
  console.log(`ID task: ${idTask}`);
  console.log("#############");

  if (query === "get") {
    if (queryMethod === "xml") {
      GETXml(urlGETAndDELETE, token);
    } else if (queryMethod === "fetch") {
      GETFetch(urlGETAndDELETE, token);
    } else if (queryMethod === "axios") {
      GETAxios(urlGETAndDELETE, token);
    } else {
      console.log("Unknown method for 'GET' :(");
    }
  } else if (query === "post") {
    if (typePage === "projects") {
      data = {
        name: "Test name",
        code: "1a2b3c4d5e",
      };
    } else {
      data = {
        name: "Test name",
        description: "Test description",
        projectId: idProject,
        //executor: "id",
      };
    }

    if (queryMethod === "xml") {
      POSTXml(urlPOSTAndPUT, token, data, typePage);
    } else if (queryMethod === "fetch") {
      POSTFetch(urlPOSTAndPUT, token, data, typePage);
    } else if (queryMethod === "axios") {
      POSTAxios(urlPOSTAndPUT, token, data, typePage);
    } else {
      console.log("Unknown method for 'POST' :(");
    }
  } else if (query === "put") {
    if (typePage === "projects") {
      data = {
        _id: idProject,
        name: "Test name PUT",
        code: "6f7g8h9i10j",
        author: "648af1ed7287972ce8676f06",
      };
    } else {
      data = {
        _id: idTask,
        name: "Test name PUT",
        description: "Test description PUT",
        projectId: idProject,
        // executor: "id",
        // status: "IN_PROCESS",
      };
    }

    if (queryMethod === "xml") {
      PUTXml(urlPOSTAndPUT, token, data);
    } else if (queryMethod === "fetch") {
      PUTFetch(urlPOSTAndPUT, token, data);
    } else if (queryMethod === "axios") {
      PUTAxios(urlPOSTAndPUT, token, data);
    } else {
      console.log("Unknown method for 'PUT' :(");
    }
  } else if (query === "delete") {
    if (queryMethod === "xml") {
      DELETEXml(urlGETAndDELETE, token, typePage);
    } else if (queryMethod === "fetch") {
      DELETEFetch(urlGETAndDELETE, token, typePage);
    } else if (queryMethod === "axios") {
      DELETEAxios(urlGETAndDELETE, token, typePage);
    } else {
      console.log("Unknown method for 'DELETE' :(");
    }
  } else {
    console.log("I don't known what is this :(");
  }
}

export { SelectQuery };