import {
  titleInput,
  taskList,
  projectContainer,
  projectIndex,
} from "./index.js";

class todoCreator {
  constructor(check, title, description, dueDate, projectName) {
    this.check = check;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.id = self.crypto.randomUUID();
    this.projectName = projectName;
  }
  toggleCheck() {
    this.check = !this.check;
  }
}

let todoStore = [];
let taskId = "";

function pushTodoIntoArray() {
  const check = false;
  const title = titleInput.value;
  const description = projectIndex;

  const newTodo = new todoCreator(check, title, description);
  todoStore.push(newTodo);
}

function loopTodoStore() {
  const values = Object.values(todoStore);
  for (const { id } of values) taskId = id;
}

console.log(todoStore);

let projectsTaskStore = [];

function projectAdd() {
  const newProject = document.createElement("input");
  newProject.placeholder = "Untitled";
  newProject.classList.add("new-project");
  newProject.setAttribute("id", `${self.crypto.randomUUID()}`);
  projectContainer.append(newProject);
}

function renderToScreen() {
  const main = document.querySelector("main");
  const taskList = document.createElement("div");
  taskList.classList.add(`task-list`);
  taskList.classList.toggle(`${projectIndex}`);
  ////
  const taskContainer = document.createElement("div");
  taskContainer.classList.add(`task-container`);

  ///
  const newTask = document.createElement("p");
  newTask.textContent = titleInput.value;
  ///
  const date = document.createElement("input");
  date.classList.add("date");
  date.setAttribute("id", `${taskId}`);
  date.type = "date";
  ///
  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = false;
  check.classList.add("check");
  check.setAttribute("id", `${taskId}`);

  ///
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "delete";
  deleteButton.setAttribute("id", `${taskId}`);
  ////
  main.append(taskList);

  taskList.append(taskContainer);
  taskContainer.append(check);
  taskContainer.append(newTask);
  taskContainer.append(date);
  taskContainer.append(deleteButton);

  deleteButton.addEventListener("click", function (e) {
    e.target.parentElement.remove();
    const foundIndex = todoStore.findIndex(
      (el) => el.id === e.target.getAttribute("id")
    );
    todoStore.splice(foundIndex, 1);
    console.log(foundIndex);
  });

  date.addEventListener("change", function (e) {
    const found = todoStore.find((el) => el.id === e.target.getAttribute("id"));
    found.dueDate = e.target.value;
    console.log(found);
  });

  check.addEventListener("change", function (e) {
    if (e.target.checked === false) {
      newTask.style.textDecoration = "none";
    } else if (e.target.checked === true) {
      newTask.style.textDecoration = "line-through";
    }
    const found = todoStore.find((el) => el.id === e.target.getAttribute("id"));
    found.toggleCheck();
  });
}

export {
  todoStore,
  pushTodoIntoArray,
  todoCreator,
  renderToScreen,
  loopTodoStore,
  projectAdd,
};
