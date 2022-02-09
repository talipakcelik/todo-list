import { el } from "date-fns/locale";
import {
  titleInput,
  projectContainer,
  projectIndex,
  modal,
  overlay,
  descriptionInput,
  descriptionContainer,
  dateInput,
  dateContainer,
  taskListAll,
} from "./index.js";

class todoCreator {
  constructor(check, title, description, index, dueDate, projectName) {
    this.check = check;
    this.title = title;
    this.description = description;
    this.index = index;
    this.dueDate = dueDate;
    this.id = self.crypto.randomUUID();
    this.projectName = projectName;
  }

  toggleCheck() {
    this.check = !this.check;
  }
}

let taskId = "";
let todoStore = [];

function pushTodoIntoArray() {
  console.log(todoStore);

  const check = false;
  const title = titleInput.value;
  const description = descriptionInput.value;
  const index = projectIndex;
  const dueDate = dateInput.value;
  // const projectName = newProject.value;

  const newTodo = new todoCreator(
    check,
    title,
    description,
    index,
    dueDate
    // projectName
  );
  todoStore.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todoStore));
}

function loopTodoStore() {
  const values = Object.values(todoStore);
  for (const { id } of values) taskId = id;
}

// let maxIndexValue;
// console.log(maxIndexValue);

if (localStorage.getItem("todos") !== null) {
  todoStore = JSON.parse(localStorage.getItem("todos"));

  console.log(todoStore);
  let i = 0;
  todoStore.forEach((el) => {
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
    if (todoStore[i].check === true) {
      newTask.style.textDecoration = "line-through";
    }

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

    const displayProject = document.querySelectorAll(".task-list");
    for (const element of displayProject) {
      if (element.classList.contains(0)) {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }

      // if (!element.classList.contains(projectIndex)) {
      //   element.style.display = "none";
      // } else if (element.classList.contains(projectIndex)) {
      //   element.style.display = "";
      // }
    }

    i++;
  });

  // if (localStorage.getItem("maxIndexValue") === null) {
  //   maxIndexValue = Math.max.apply(
  //     Math,
  //     todoStore.map(function (el) {
  //       return el.index;
  //     })
  //   );
  // } else {
  //   maxIndexValue = localStorage.getItem("maxIndexValue");
  // }

  // localStorage.setItem("maxIndexValue", maxIndexValue);

  // let foundProject = el.index !== 0;

  // console.log(maxIndexValue);

  // for (let z = 1; z <= maxIndexValue; z++) {
  // if (foundProject !== false) {

  let numberOfProjects = localStorage.getItem("numberOfProjects");
  console.log("dede", numberOfProjects);
  for (let z = 1; z <= numberOfProjects; z++) {
    const projectCon = document.createElement("div");
    projectCon.classList.add("project-sub-container");
    document.querySelector(".project-container").append(projectCon);

    const newProject = document.createElement("input");
    newProject.placeholder = "Untitled";
    newProject.classList.add("new-project");
    newProject.setAttribute("id", `${self.crypto.randomUUID()}`);
    // newProject.value = todoStore.find((el) => {
    //   el.index === projectIndex;
    // });
    newProject.value = "proje";
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
    if (el.index === i) {
      newProject.value = el.projectName;
    }
  }
  // }
  // }
}
// else {
// }

function maxIndexValueReduce() {
  maxIndexValue--;
  console.log(maxIndexValue);
  localStorage.setItem("maxIndexValue", maxIndexValue);
}

// console.log(foundProject);
// if (localStorage.getItem("numberOfProjects") !== 0) {
//   let numberOfProjects = localStorage.getItem("numberOfProjects");
// } else {
// }

let numberOfProjects = localStorage.getItem("numberOfProjects");
// localStorage.setItem("numberOfProjects", numberOfProjects);

function projectAdd() {
  const projectCon = document.createElement("div");
  projectCon.classList.add("project-sub-container");
  document.querySelector(".project-container").append(projectCon);

  const newProject = document.createElement("input");
  newProject.placeholder = "Untitled";
  newProject.classList.add("new-project");
  newProject.setAttribute("id", `${self.crypto.randomUUID()}`);
  // newProject.value = todoStore.find((el) => {
  //   el.index === projectIndex;
  // });
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

  numberOfProjects++;
  localStorage.setItem("numberOfProjects", numberOfProjects);
  console.log(numberOfProjects);
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

function updatetodoStore() {
  todoStore = todoStore.filter((el) => el.index !== projectIndex);
}

// function updateProjectName(e) {
//   todoStore.forEach((el) => {
//     if (el.index === projectIndex) {
//     }
//     el.projectName = e.target.value;
//   });
//   // todoStore = todoStore.map((el) => {
//   //   if (el.index === projectIndex) el.projectName = "fff";
//   // });
// }

function numberOfProjectsReducer() {
  numberOfProjects--;
  localStorage.setItem("numberOfProjects", numberOfProjects);
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
  updatetodoStore,
  // updateProjectName,
  // maxIndexValueReduce,
  numberOfProjectsReducer,
};
