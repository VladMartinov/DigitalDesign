import { createProjectAndTasksWrapper } from "../items-wrapper";
import { createNavBar } from "../navigation";
import { createEmptyProjects } from "../no-projects";
import { createEmptyTasks } from "../no-tasks";

function LoadComponent(app, projectItem, taskItem) {
  let navHtml = createNavBar();
  app.insertAdjacentHTML("beforeend", navHtml);

  let projectAndTaskWrapper = createProjectAndTasksWrapper(
    projectItem,
    taskItem
  );
  app.insertAdjacentHTML("beforeend", projectAndTaskWrapper);

  let emptyProjects = createEmptyProjects();
  app.insertAdjacentHTML("beforeend", emptyProjects);

  let emptyTasks = createEmptyTasks();
  app.insertAdjacentHTML("beforeend", emptyTasks);
}

export { LoadComponent };
