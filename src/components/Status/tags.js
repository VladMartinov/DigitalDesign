export const Tags = {
  DRAFT: {
    _id: "DRAFT",
    name: "Черновик",
    tagClass: "draft",
    field: "task",
    availableOptions: ["IN_PROCESS", "DELETED"]
  },
  IN_PROCESS: {
    _id: "IN_PROCESS",
    name: "В работе",
    tagClass: "in-process",
    field: "task",
    availableOptions: ["DRAFT", "COMPLETED", "DELETED"]
  },
  COMPLETED: {
    _id: "COMPLETED",
    name: "Завершена",
    tagClass: "completed",
    field: "task",
    availableOptions: ["IN_PROCESS", "TESTING", "DELETED"]
  },
  TESTING: {
    _id: "TESTING",
    name: "Тестирование",
    tagClass: "testing",
    field: "task",
    availableOptions: ["IN_PROCESS", "TESTING_DONE", "DELETED"]
  },
  TESTING_DONE: {
    _id: "TESTING_DONE",
    name: "Выполнена",
    tagClass: "testing-done",
    field: "task",
    availableOptions: ["IN_PROCESS", "CLOSED", "DELETED"]
  },
  CLOSED: {
    _id: "CLOSED",
    name: "Закрыта",
    tagClass: "closed",
    field: "task",
    availableOptions: ["DRAFT", "DELETED"]
  },
  DELETED: {
    _id: "DELETED",
    name: "Удален",
    tagClass: "deleted",
    field: "task",
    availableOptions: []
  },
  ACTIVE: {
    _id: "ACTIVE",
    name: "Активен",
    tagClass: "active"
  },
  BLOCKED: {
    _id: "BLOCKED",
    name: "Не активен",
    tagClass: "blocked"
  },
};