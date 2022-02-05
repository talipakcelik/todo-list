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
  taskContainer.setAttribute("id", `${taskId}`);

  ///
  const newTask = document.createElement("p");
  newTask.classList.add("task-title");
  newTask.textContent = titleInput.value;
  ///
  const newDescription = document.createElement("p");
  newDescription.classList.add("task-description");
  newDescription.textContent = descriptionInput.value;
  // newDescription.classList.toggle(`${projectIndex}`);

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
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "delete";
  deleteButton.setAttribute("id", `${taskId}`);
  ////
  const descriptionDate = date.cloneNode(true);
  descriptionDate.classList.remove("hidden");
  main.append(taskList);
  ///

  taskList.append(taskContainer);
  taskContainer.append(check);
  taskContainer.append(newTask);
  taskContainer.append(deleteButton);
  taskContainer.append(date);

  descriptionContainer.append(newDescription);
  dateContainer.append(descriptionDate);

  if (newDescription.previousSibling) {
    newDescription.previousSibling.remove();
  }

  if (descriptionDate.previousSibling) {
    descriptionDate.previousSibling.remove();
  }

  deleteButton.addEventListener("click", function (e) {
    e.target.parentElement.remove();
    const foundIndex = todoStore.findIndex(
      (el) => el.id === e.target.getAttribute("id")
    );
    todoStore.splice(foundIndex, 1);
    console.log(foundIndex);
    document.querySelector(".task-description").textContent = "";
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
    if (e.target.textContent !== "delete") {
      const found = todoStore.find(
        (el) => el.id === e.target.getAttribute("id")
      );
      const cloneDate = e.target.lastChild.cloneNode();
      cloneDate.classList.remove("hidden");
      descriptionDate.remove();

      dateContainer.append(cloneDate);
      cloneDate.previousSibling.remove();

      document.querySelector(".task-description").textContent =
        found.description;
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
