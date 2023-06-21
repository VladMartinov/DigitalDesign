function getProjectID() {
  return localStorage.getItem("ProjectID");
}

function getTaskID() {
  return localStorage.getItem("TaskID");
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

function delProjectID() {
  delete localStorage.ProjectID;
}

function delTaskID() {
  delete localStorage.TaskID;
}

export {
  getProjectID,
  getTaskID,
  setProjectID,
  setTaskID,
  delProjectID,
  delTaskID,
};
