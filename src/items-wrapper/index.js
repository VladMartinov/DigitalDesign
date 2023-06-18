import { createProjectItem } from "../project-item";
import { createTaskItem } from "../task-item";

/* Использую для добавления отступов между элементами, для большего удобства */
function createProjectAndTasksWrapper(projectItem, taskItem) {
  return `
  <section class="items-wrapper">
    <div class="item">
      ${createProjectItem(projectItem)}
    </div>
    
    <div class="item">
      ${createTaskItem(taskItem)}
    </div>
  </section>
  `;
}

export { createProjectAndTasksWrapper };
