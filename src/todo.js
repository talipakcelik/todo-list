import { format } from "date-fns";
import {
  titleInput,
  taskList,
  projectContainer,
  projectIndex,
  modal,
  overlay,
  descriptionInput,
  aside,
  descriptionContainer,
  dateInput,
  dateContainer,
} from "./index.js";

class todoCreator {
  constructor(check, title, description, index, dueDate) {
    this.check = check;
    this.title = title;
    this.description = description;
    this.index = index;
    this.dueDate = dueDate;
    this.id = self.crypto.randomUUID();
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
  const description = descriptionInput.value;
  const index = projectIndex;
  const dueDate = dateInput.value;

  const newTodo = new todoCreator(check, title, description, index, dueDate);
  todoStore.push(newTodo);
}

function loopTodoStore() {
  const values = Object.values(todoStore);
  for (const { id } of values) taskId = id;
}

console.log(todoStore);

function projectAdd() {
  const projectCon = document.createElement("div");
  projectCon.classList.add("project-sub-container");
  projectContainer.append(projectCon);
  const newProject = document.createElement("input");

  newProject.placeholder = "Untitled";
  newProject.classList.add("new-project");
  newProject.setAttribute("id", `${self.crypto.randomUUID()}`);
  projectCon.append(newProject);

  const delProject = document.createElement("span");
  delProject.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
  projectCon.append(delProject);
}

function renderToScreen() {
  const main = document.querySelector("main");
  const taskList = document.createElement("div");
  taskList.classList.add(`task-list`);
  taskList.classList.toggle(`${projectIndex}`);

  ////
  const taskContainer = document.createElement("div");
  taskContainer.classList.add(`task-container`);
  taskContainer.setAttribute("id", `${taskId}`);

  ///
  const newTask = document.createElement("p");
  newTask.classList.add("task-title");
  newTask.textContent = titleInput.value;
  newTask.contentEditable = "true";
  ///
  const newDescription = document.createElement("p");
  newDescription.classList.add("task-description");
  newDescription.textContent = `Description: ${descriptionInput.value}`;

  ///
  const date = document.createElement("input");
  date.classList.add("date");
  date.setAttribute("id", `${taskId}`);
  date.type = "date";
  date.setAttribute("id", `${taskId}`);
  date.classList.add("hidden");
  date.value = dateInput.value;
  ///
  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = false;
  check.classList.add("check");
  check.setAttribute("id", `${taskId}`);

  ///
  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
  deleteButton.setAttribute("id", `${taskId}`);
  ////

  main.append(taskList);

  taskList.append(taskContainer);
  taskContainer.append(check);
  taskContainer.append(newTask);
  taskContainer.append(deleteButton);
  taskContainer.append(date);

  descriptionContainer.append(newDescription);

  const parseDateInput = date.value.split("-");
  console.log(parseDateInput);

  dateContainer.textContent = `Due date: ${parseDateInput[2]}/${parseDateInput[1]}/${parseDateInput[0]}`;

  if (newDescription.previousSibling) {
    newDescription.previousSibling.remove();
  }

  deleteButton.addEventListener("click", function (e) {
    document.querySelector(".task-container").remove();
    const foundIndex = todoStore.findIndex(
      (el) => el.id === e.target.getAttribute("id")
    );
    todoStore.splice(foundIndex, 1);
    console.log(foundIndex);
    document.querySelector(".task-description").textContent = "";
    dateContainer.textContent = "";
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

  taskList.addEventListener("click", function (e) {
    if (e.target.getAttribute("class") !== "md hydrated") {
      console.log(e.target.getAttribute("class"));
      console.log(e.target);
      const found = todoStore.find(
        (el) => el.id === e.target.getAttribute("id")
      );

      const parseDate = e.target.lastChild.value.split("-");

      dateContainer.textContent = `Due date: ${parseDate[2]}/${parseDate[1]}/${parseDate[0]}`;

      document.querySelector(
        ".task-description"
      ).textContent = `Description: ${found.description}`;
    }
  });
}

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

export {
  todoStore,
  pushTodoIntoArray,
  todoCreator,
  renderToScreen,
  loopTodoStore,
  projectAdd,
  closeModal,
  openModal,
};
