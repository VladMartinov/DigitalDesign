function getProjectID() {
  return localStorage.getItem("ProjectID");
}

function getTaskID() {
  return localStorage.getItem("TaskID");
}

function getToken() {
  return localStorage.getItem("Token");
}

function setProjectID(ProjectID) {
  if (localStorage.getItem("ProjectID") === null) {
    localStorage.setItem("ProjectID", ProjectID);
  } else {
    localStorage.ProjectID = ProjectID;
  }
}

function setTaskID(TaskID) {
  if (localStorage.getItem("TaskID") === null) {
    localStorage.setItem("TaskID", TaskID);
  } else {
    localStorage.TaskID = TaskID;
  }
}

function setToken(Token) {
  if (localStorage.getItem("Token") === null) {
    localStorage.setItem("Token", Token);
  } else {
    localStorage.Token = Token;
  }
}

function delProjectID() {
  delete localStorage.ProjectID;
}

function delTaskID() {
  delete localStorage.TaskID;
}

function delToken() {
  delete localStorage.Token;
}

export {
  getProjectID,
  getTaskID,
  getToken,
  setProjectID,
  setTaskID,
  setToken,
  delProjectID,
  delTaskID,
  delToken,
};
