import {
  todoCreator,
  pushTodoIntoArray,
  todoStore,
  renderToScreen,
  loopTodoStore,
  projectAdd,
} from "./todo.js";
import style from "./style.css";

const taskList = document.querySelector(".task-list");
const deneme = document.querySelector(".deneme");
const titleInput = document.querySelector(".title-input");
const buttonInput = document.querySelector(".button-input");
const section = document.querySelector("section");
const main = document.querySelector("main");
const menu = document.querySelector("menu");
const projectContainer = document.querySelector(".project-container");

// const deleteButton = document.querySelector(".delete");

let projectIndex = 0;

buttonInput.addEventListener("click", function () {
  pushTodoIntoArray();
  loopTodoStore();
  renderToScreen();

  console.log(todoStore);
  // console.log(projectsTaskStore);
});

menu.addEventListener("click", function (e) {
  if (e.target.textContent === "New") {
    projectAdd();

    if (!document.querySelector(".project-title")) {
      // taskList.remove();
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
  if (e.target.textContent === "Projects") {
  }
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
    // const list = document.querySelectorAll(".task-list");
    // for (const element of list) {
    //   element.remove();
    // }
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
  // if (projectIndex !== )
});

export { taskList, titleInput, projectContainer, projectIndex };
