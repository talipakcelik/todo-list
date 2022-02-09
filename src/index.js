import {
  pushTodoIntoArray,
  todoStore,
  renderToScreen,
  loopTodoStore,
  projectAdd,
  closeModal,
  openModal,
  updatetodoStore,
  numberOfProjectsReducer,
  pushProjectIntoArray,
  projectStore,
} from "./todo.js";
import style from "./style.css";
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

const taskListAll = document.querySelectorAll(".task-list");
const titleInput = document.querySelector(".title-input");
const descriptionInput = document.querySelector(".description-input");
const dateInput = document.querySelector(".date-input");
const submit = document.querySelector("#submit");
const section = document.querySelector("section");
const menu = document.querySelector("menu");
const aside = document.querySelector("aside");
const projectContainer = document.querySelector(".project-container");
const descriptionContainer = document.querySelector(".description-container");
const dateContainer = document.querySelector(".date-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");
const projectTitle = document.querySelector(".project-title");
const trash = document.querySelector(".trash");

let projectIndex = 0;
let todoStoreNew = [];

submit.addEventListener("click", function () {
  if (titleInput.value !== "") {
    pushTodoIntoArray();
    loopTodoStore();
    renderToScreen();
  }
  console.log(todoStore);
});

menu.addEventListener("click", function (e) {
  if (e.target.textContent === "New Project") {
    pushProjectIntoArray();
    console.log(projectStore);
    projectAdd();

    if (!document.querySelector(".project-title")) {
      if (document.querySelector(".task-container")) {
        document.querySelector(".task-container").remove();
      }

      projectTitle.textContent = "Untitled";
    }
  }
});

section.addEventListener("click", function (e) {
  if (e.target.textContent === "Home") {
    projectTitle.textContent = "Home";
    projectIndex = 0;
  }
  if (e.target.placeholder === "Untitled") {
    document.querySelector(".project-title").textContent =
      e.target.value || e.target.placeholder;

    console.log(e.target.getAttribute("id"));
    projectIndex = e.target.getAttribute("id");

    // todoStore.find(el => {el.index})

    const allProject = document.querySelectorAll(".new-project");
    allProject.forEach((project) => {
      project.addEventListener("input", function (e) {
        projectTitle.textContent = e.target.value;
        todoStore.forEach((el) => {
          if (el.index === projectIndex) {
            el.projectName = e.target.value;
          }
        });
        localStorage.setItem("todos", JSON.stringify(todoStore));
        // updateProjectName();
      });
    });
  }
  const displayProject = document.querySelectorAll(".task-list");
  for (const element of displayProject) {
    if (!element.classList.contains(projectIndex)) {
      element.style.display = "none";
    } else if (element.classList.contains(projectIndex)) {
      element.style.display = "";
    }
  }

  if (e.target.textContent === "Today") {
    projectTitle.textContent = "Today";
    const today = format(new Date(), "yyyy-MM-dd");

    const displayToday = document.querySelectorAll(".date");
    for (const element of displayToday) {
      if (element.value === today) {
        element.parentElement.parentElement.style.display = "";
      } else if (element.value !== today) {
        element.parentElement.parentElement.style.display = "none";
      }
    }
  }

  if (e.target.textContent === "This week") {
    projectTitle.textContent = "This week";

    const today = new Date();

    const interval = eachDayOfInterval({
      start: startOfWeek(today),
      end: endOfWeek(today),
    });

    let thisWeekArray = [];

    interval.forEach((el) => {
      const formatted = format(el, "yyyy-MM-dd");
      thisWeekArray.push(formatted);
    });

    const displayWeek = document.querySelectorAll(".date");
    for (const element of displayWeek) {
      if (thisWeekArray.includes(element.value)) {
        element.parentElement.parentElement.style.display = "";
      } else {
        element.parentElement.parentElement.style.display = "none";
      }
    }
  }

  if (e.target.name === "trash-outline") {
    e.target.parentElement.parentElement.style.display = "none";
    // e.target.parentElement.parentElement.remove();

    const displayProject = document.querySelectorAll(".task-list");
    for (const element of displayProject) {
      if (element.classList.contains(projectIndex)) {
        element.remove();
      }
    }

    updatetodoStore();
    console.log(projectIndex);
    console.log(todoStore);

    document.querySelector(".project-title").textContent = "";

    numberOfProjectsReducer();
    if (localStorage.getItem("todos") !== null) {
      localStorage.setItem("todos", JSON.stringify(todoStore));
    }

    const foundProject = projectStore.findIndex(
      (el) =>
        el.index ===
        Number(
          e.target.parentElement.parentElement.children[0].getAttribute("id")
        )
    );

    projectStore.splice(foundProject, 1);
    console.log(
      e.target.parentElement.parentElement.children[0].getAttribute("id")
    );
    console.log(foundProject);

    localStorage.setItem("projects", JSON.stringify(projectStore));
    console.log(projectStore);
  }
});

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

trash.addEventListener("click", function () {
  const taskTitleAll = document.querySelectorAll(".task-title");
  for (const element of taskTitleAll) {
    if (element.style.textDecoration === "line-through") {
      element.parentElement.remove();
    }
  }

  const atLeast = todoStore.some((el) => el.check === true);

  if (atLeast === false) {
    alert(
      "You haven't completed any tasks yet or you have already completed your tasks ❗ \nCheck the box when the task is done ✔"
    );
  }

  // because of todoStore in another module, it was not possible to edit the todostore
  // needed to create a new array

  todoStoreNew = todoStore.filter((el) => el.check !== true);
  localStorage.setItem("todos", JSON.stringify(todoStoreNew));
});

export {
  titleInput,
  projectContainer,
  projectIndex,
  modal,
  overlay,
  descriptionInput,
  aside,
  descriptionContainer,
  dateInput,
  dateContainer,
  taskListAll,
};
