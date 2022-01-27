import { titleInput, taskList } from "./index.js";

class todoCreator {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.id = self.crypto.randomUUID();
  }
}

let todoStore = [];

function pushTodoIntoArray() {
  const title = titleInput.value;
  // const date = document.querySelector(".date").value;

  const newTodo = new todoCreator(title);
  todoStore.push(newTodo);
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
  date.type = "date";
  ///
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "delete";
  ////
  taskList.append(taskContainer);
  taskContainer.append(newTask);
  taskContainer.append(date);
  taskContainer.append(deleteButton);

  deleteButton.addEventListener("click", function (e) {
    e.target.parentElement.remove();
    console.log("dd");
  });

  date.addEventListener("click", function () {});
}

export { todoStore, pushTodoIntoArray, todoCreator, renderToScreen };
