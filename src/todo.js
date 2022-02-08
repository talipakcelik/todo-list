import { format } from "date-fns";
import {
  titleInput,
  // taskList,
  projectContainer,
  projectIndex,
  modal,
  overlay,
  descriptionInput,
  descriptionContainer,
  dateInput,
  dateContainer,
  taskListAll,
  // todoStore,
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

if (localStorage.getItem("todos") !== null) {
  todoStore = JSON.parse(localStorage.getItem("todos"));

  let i = 0;
  todoStore.forEach((el) => {
    let projectIndex = 0;
    let taskId = "";
    console.log("dneme");

    const main = document.querySelector("main");
    const taskList = document.createElement("div");
    taskList.classList.add(`task-list`);
    taskList.classList.toggle(`${todoStore[i].index}`);

    const taskContainer = document.createElement("div");
    taskContainer.classList.add(`task-container`);
    taskContainer.setAttribute("id", `${todoStore[i].id}`);

    const newTask = document.createElement("p");
    newTask.classList.add("task-title");
    newTask.textContent = todoStore[i].title;
    newTask.contentEditable = "true";

    const newDescription = document.createElement("p");
    newDescription.classList.add("task-description");

    if (todoStore[i].description.length === 0) {
      newDescription.textContent = `Description: unspecified`;
    } else {
      newDescription.textContent = `Description: ${todoStore[i].description}`;
    }

    const date = document.createElement("input");
    date.classList.add("date");
    date.type = "date";
    date.classList.add("hidden");
    date.value = todoStore[i].dueDate;
    ///
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = todoStore[i].check;
    check.classList.add("check");

    ///
    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
    deleteButton.style.display = "none";

    main.append(taskList);

    taskList.append(taskContainer);
    taskContainer.append(check);
    taskContainer.append(newTask);
    taskContainer.append(deleteButton);
    taskContainer.append(date);

    const descriptionContainer = document.querySelector(
      ".description-container"
    );
    const dateContainer = document.querySelector(".date-container");
    descriptionContainer.append(newDescription);
    const parseDateInput = date.value.split("-");

    if (parseDateInput.length === 1) {
      dateContainer.textContent = `Due date: unspecified`;
    } else {
      dateContainer.textContent = `Due date: ${parseDateInput[2]}/${parseDateInput[1]}/${parseDateInput[0]}`;
    }

    if (newDescription.previousSibling) {
      newDescription.previousSibling.remove();
    }

    i++;
  });
} else {
}
const taskList = document.querySelector(".task-list");

let taskId = "";

console.log(todoStore);

function pushTodoIntoArray() {
  console.log(todoStore);

  const check = false;
  const title = titleInput.value;
  const description = descriptionInput.value;
  const index = projectIndex;
  const dueDate = dateInput.value;

  const newTodo = new todoCreator(check, title, description, index, dueDate);
  todoStore.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todoStore));
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
  delProject.style.display = "none";

  projectCon.addEventListener("mouseover", function (e) {
    delProject.style.display = "";
  });
  projectCon.addEventListener("mouseleave", function (e) {
    delProject.style.display = "none";
  });
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

  if (descriptionInput.value.length === 0) {
    newDescription.textContent = `Description: unspecified`;
  } else {
    newDescription.textContent = `Description: ${descriptionInput.value}`;
  }

  ///
  const date = document.createElement("input");
  date.classList.add("date");
  date.type = "date";
  date.classList.add("hidden");
  date.value = dateInput.value;
  ///
  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = false;
  check.classList.add("check");

  ///
  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
  deleteButton.style.display = "none";
  ////

  main.append(taskList);

  taskList.append(taskContainer);
  taskContainer.append(check);
  taskContainer.append(newTask);
  taskContainer.append(deleteButton);
  taskContainer.append(date);

  descriptionContainer.append(newDescription);

  const parseDateInput = date.value.split("-");

  if (parseDateInput.length === 1) {
    dateContainer.textContent = `Due date: unspecified`;
  } else {
    dateContainer.textContent = `Due date: ${parseDateInput[2]}/${parseDateInput[1]}/${parseDateInput[0]}`;
  }

  if (newDescription.previousSibling) {
    newDescription.previousSibling.remove();
  }

  eventListenerForTasks();
}

function eventListenerForTasks() {
  const taskListAll = document.querySelectorAll(".task-list");
  //////////////////////////////////////////////////////////////
  taskListAll.forEach((task) => {
    task.addEventListener("mouseover", function (e) {
      e.currentTarget.children[0].children[2].style.display = "";
    });
    //////////////////////////////////////////////////////////////
    task.addEventListener("mouseleave", function (e) {
      e.currentTarget.children[0].children[2].style.display = "none";
    });
    //////////////////////////////////////////////////////////////
    task.addEventListener("click", function (e) {
      //////////////////////////
      /// for additional info///
      //////////////////////////
      if (e.target.getAttribute("class") !== "md hydrated") {
        const found = todoStore.find(
          (el) => el.id === e.currentTarget.children[0].getAttribute("id")
        );

        if (found.description.length === 0) {
          document.querySelector(".task-description").textContent =
            "Description: unspecified";
        } else {
          document.querySelector(
            ".task-description"
          ).textContent = `Description: ${found.description}`;
        }

        const parseDate =
          e.currentTarget.children[0].lastChild.value.split("-");

        dateContainer.textContent = `Due date: ${parseDate[2]}/${parseDate[1]}/${parseDate[0]}`;

        if (found.dueDate.length === 0) {
          dateContainer.textContent = `Due date: unspecified`;
        }
      }
      ///////////////////////
      /// for delete task///
      //////////////////////
      if (e.target.getAttribute("class") === "md hydrated") {
        e.currentTarget.remove();
        const foundIndex = todoStore.findIndex(
          (el) => el.id === e.currentTarget.children[0].getAttribute("id")
        );

        todoStore.splice(foundIndex, 1);

        document.querySelector(".task-description").textContent = "";
        dateContainer.textContent = "";

        localStorage.setItem("todos", JSON.stringify(todoStore));
      }

      ////////////////////////
      /// for checking box////
      ////////////////////////
      if (e.target.getAttribute("class") === "check") {
        if (e.target.checked === false) {
          e.currentTarget.children[0].children[1].style.textDecoration = "none";
        } else if (e.target.checked === true) {
          e.currentTarget.children[0].children[1].style.textDecoration =
            "line-through";
        }
        const foundCheck = todoStore.find(
          (el) => el.id === e.currentTarget.children[0].getAttribute("id")
        );

        foundCheck.check = !foundCheck.check;

        localStorage.setItem("todos", JSON.stringify(todoStore));
      }
    });
  });
}

eventListenerForTasks();

function openModal() {
  modal.classList.add("active");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.remove("active");
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
  // eventListenerForTasks,
};
