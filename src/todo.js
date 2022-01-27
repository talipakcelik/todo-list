import { titleInput, taskList } from "./index.js";

class todoCreator {
  constructor(check, title, description, dueDate) {
    this.check = check;
    this.title = title;
    this.description = description;
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
  // const date = document.querySelector(".date").value;

  const newTodo = new todoCreator(check, title);
  todoStore.push(newTodo);
}

function loopTodoStore() {
  const values = Object.values(todoStore);
  for (const { id } of values) taskId = id;
}
// pushTodoIntoArray();
console.log(todoStore);

function renderToScreen() {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
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
  check.setAttribute("id", `${taskId}`);

  ///
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "delete";
  ////
  taskList.append(taskContainer);
  taskContainer.append(check);
  taskContainer.append(newTask);
  taskContainer.append(date);
  taskContainer.append(deleteButton);

  deleteButton.addEventListener("click", function (e) {
    e.target.parentElement.remove();
  });

  date.addEventListener("change", function (e) {
    const found = todoStore.find((el) => el.id === e.target.getAttribute("id"));
    found.dueDate = e.target.value;
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
};
