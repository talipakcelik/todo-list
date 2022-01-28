import {
  todoCreator,
  pushTodoIntoArray,
  todoStore,
  renderToScreen,
  loopTodoStore,
  projectCreator,
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

buttonInput.addEventListener("click", function () {
  pushTodoIntoArray();
  loopTodoStore();
  renderToScreen();
  console.log(todoStore);
});

menu.addEventListener("click", function (e) {
  if (e.target.textContent === "New") {
    projectCreator();
    // const newProject = document.createElement("input");
    // newProject.placeholder = "Untitled";
    // newProject.classList.add("new-project");
    // const projectAdd = document.createElement("span");
    // projectAdd.textContent = "+";
    // projectAdd.classList.add("add-project");

    // projectContainer.append(newProject);
    // projectContainer.append(projectAdd);
    /////
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
    //   taskList.remove();
    //   const projectsHeader = document.createElement("h1");
    //   projectsHeader.textContent = "Project";
    //   main.append(projectsHeader);
  }
  if (e.target.classList.contains("add-project")) {
    if (!document.querySelector(".project-title")) {
      // taskList.remove();
      // const projectTitle = document.createElement("h2");
      // projectTitle.classList.add("project-title");
      // main.append(projectTitle);
      // projectTitle.textContent = e.target.previousSibling.value;
    }
  }
  if (e.target.placeholder === "Untitled") {
    //   // if (!document.querySelector(".project-title").textContent === "Untitled") {
    document.querySelector(".project-title").textContent =
      e.target.value || "Untitled";
    //   // }
  }
});

export { taskList, titleInput, projectContainer };
