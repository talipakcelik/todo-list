import {
  todoCreator,
  pushTodoIntoArray,
  todoStore,
  renderToScreen,
  loopTodoStore,
  projectAdd,
  closeModal,
  openModal,
} from "./todo.js";
import style from "./style.css";
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

const taskList = document.querySelector(".task-list");
const taskContainer = document.querySelector(".task-container");
const titleInput = document.querySelector(".title-input");
const descriptionInput = document.querySelector(".description-input");
const dateInput = document.querySelector(".date-input");
const buttonInput = document.querySelector(".button-input");
const section = document.querySelector("section");
const main = document.querySelector("main");
const menu = document.querySelector("menu");
const aside = document.querySelector("aside");
const projectContainer = document.querySelector(".project-container");
const descriptionContainer = document.querySelector(".description-container");
const dateContainer = document.querySelector(".date-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");

let projectIndex = 0;

buttonInput.addEventListener("click", function () {
  pushTodoIntoArray();
  loopTodoStore();
  renderToScreen();

  console.log(todoStore);
});

menu.addEventListener("click", function (e) {
  if (e.target.textContent === "New") {
    projectAdd();

    if (!document.querySelector(".project-title")) {
      if (document.querySelector(".task-container")) {
        document.querySelector(".task-container").remove();
      }

      const projectTitle = document.createElement("h2");
      projectTitle.classList.add("project-title");
      main.prepend(projectTitle);
      projectTitle.textContent = "Untitled";
      document
        .querySelector(".new-project")
        .addEventListener("change", function (e) {
          projectTitle.textContent = e.target.value;
        });
    }
  }
});

section.addEventListener("click", function (e) {
  // if (e.target.textContent === "Projects") {
  // }
  if (e.target.classList.contains("add-project")) {
    if (!document.querySelector(".project-title")) {
    }
  }
  if (e.target.textContent === "Home") {
    projectIndex = 0;
  }
  if (e.target.placeholder === "Untitled") {
    document.querySelector(".project-title").textContent =
      e.target.value || "Untitled";

    projectIndex = [...Array.from(e.target.parentElement.children)].indexOf(
      e.target
    );
    console.log(projectIndex);
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
    const today = format(new Date(), "yyyy-MM-dd");
    console.log(today);

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
});

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

export {
  taskList,
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
};
