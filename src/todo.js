import { el } from 'date-fns/locale';
import {
  titleInput,
  projectIndex,
  modal,
  overlay,
  descriptionInput,
  dateInput,
  currentTab,
} from './index.js';

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

class projectCreator {
  constructor(index, title) {
    this.title = title;
    this.index = index;
  }
}

let taskId = '';
let todoStore = [];
let projectStore = [];

function pushTodoIntoArray() {
  const check = false;
  const title = titleInput.value;
  const description = descriptionInput.value;
  const index = projectIndex;
  const dueDate = dateInput.value;

  const newTodo = new todoCreator(check, title, description, index, dueDate);
  todoStore.push(newTodo);

  localStorage.setItem('todos', JSON.stringify(todoStore));
}

let indexOfProject;
let k = 0;

function pushProjectIntoArray() {
  indexOfProject++;

  const index = indexOfProject;
  const title = '';
  const newProject = new projectCreator(index, title);

  projectStore.push(newProject);

  localStorage.setItem('projects', JSON.stringify(projectStore));
  localStorage.setItem('indexOfProject', JSON.stringify(indexOfProject));
  localStorage.setItem('todos', JSON.stringify(todoStore));
}

function loopTodoStore() {
  const values = Object.values(todoStore);
  for (const { id } of values) taskId = id;
}

indexOfProject = JSON.parse(localStorage.getItem('indexOfProject'));

if (localStorage.getItem('projects') !== null) {
  projectStore = JSON.parse(localStorage.getItem('projects'));
}
if (localStorage.getItem('todos') !== null) {
  todoStore = JSON.parse(localStorage.getItem('todos'));

  let i = 0;
  todoStore.forEach(el => {
    const main = document.querySelector('main');
    const taskList = document.createElement('div');
    taskList.classList.add(`task-list`);
    taskList.classList.toggle(`${todoStore[i].index}`);

    const taskContainer = document.createElement('div');
    taskContainer.classList.add(`task-container`);
    taskContainer.setAttribute('id', `${todoStore[i].id}`);

    const newTask = document.createElement('p');
    newTask.classList.add('task-title');
    newTask.textContent = todoStore[i].title;
    if (todoStore[i].check === true) {
      newTask.style.textDecoration = 'line-through';
    }

    newTask.contentEditable = 'true';

    if (todoStore[i].description.length === 0) {
      document.querySelector('.description-2').textContent = ` unspecified`;
    } else {
      document.querySelector(
        '.description-2'
      ).textContent = ` ${todoStore[i].description}`;
    }

    const date = document.createElement('input');
    date.classList.add('date');
    date.type = 'date';
    date.classList.add('hidden');
    date.value = todoStore[i].dueDate;
    ///
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = todoStore[i].check;
    check.classList.add('check');

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete');
    deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
    deleteButton.style.display = 'none';

    main.append(taskList);

    taskList.append(taskContainer);
    taskContainer.append(check);
    taskContainer.append(newTask);
    taskContainer.append(deleteButton);
    taskContainer.append(date);

    const parseDateInput = date.value.split('-');

    if (parseDateInput.length === 1) {
      document.querySelector('.date-2').textContent = ` unspecified`;
    } else {
      document.querySelector(
        '.date-2'
      ).textContent = ` ${parseDateInput[2]}/${parseDateInput[1]}/${parseDateInput[0]}`;
    }

    const displayProject = document.querySelectorAll('.task-list');
    for (const element of displayProject) {
      if (element.classList.contains(0)) {
        element.style.display = '';
      } else {
        element.style.display = 'none';
      }
    }

    i++;
  });

  let numberOfProjects = localStorage.getItem('numberOfProjects');
  for (let z = 1; z <= numberOfProjects; z++) {
    const projectCon = document.createElement('div');
    projectCon.classList.add('project-sub-container');
    document.querySelector('.project-container').append(projectCon);

    const newProject = document.createElement('input');
    newProject.placeholder = 'Untitled';
    newProject.classList.add('new-project');
    newProject.setAttribute('id', `${projectStore[k].index}`);

    newProject.value = `${projectStore[k].title}`;
    projectCon.append(newProject);

    const delProject = document.createElement('span');
    delProject.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
    projectCon.append(delProject);
    delProject.style.display = 'none';

    projectCon.addEventListener('mouseover', function (e) {
      delProject.style.display = '';
    });
    projectCon.addEventListener('mouseleave', function (e) {
      delProject.style.display = 'none';
    });
    if (el.index === i) {
      newProject.value = el.projectName;
    }
    k++;
  }
}

let numberOfProjects = localStorage.getItem('numberOfProjects');

function projectAdd() {
  const projectCon = document.createElement('div');
  projectCon.classList.add('project-sub-container');
  document.querySelector('.project-container').append(projectCon);

  const newProject = document.createElement('input');
  newProject.placeholder = 'Untitled';
  newProject.classList.add('new-project');
  newProject.setAttribute('id', `${projectStore[k].index}`);

  projectCon.append(newProject);

  const delProject = document.createElement('span');
  delProject.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
  projectCon.append(delProject);
  delProject.style.display = 'none';

  projectCon.addEventListener('mouseover', function (e) {
    delProject.style.display = '';
  });
  projectCon.addEventListener('mouseleave', function (e) {
    delProject.style.display = 'none';
  });

  numberOfProjects++;
  localStorage.setItem('numberOfProjects', numberOfProjects);

  k++;
}

function renderToScreen() {
  const main = document.querySelector('main');
  const taskList = document.createElement('div');
  taskList.classList.add(`task-list`);
  taskList.classList.toggle(`${projectIndex}`);

  ////
  const taskContainer = document.createElement('div');
  taskContainer.classList.add(`task-container`);
  taskContainer.setAttribute('id', `${taskId}`);

  ///
  const newTask = document.createElement('p');
  newTask.classList.add('task-title');
  newTask.textContent = titleInput.value;
  newTask.contentEditable = 'true';
  ///

  if (descriptionInput.value.length === 0) {
    document.querySelector('.description-2').textContent = ` unspecified`;
  } else {
    document.querySelector(
      '.description-2'
    ).textContent = ` ${descriptionInput.value}`;
  }

  ///
  const date = document.createElement('input');
  date.classList.add('date');
  date.type = 'date';
  date.classList.add('hidden');
  date.value = dateInput.value;
  ///
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.checked = false;
  check.classList.add('check');

  ///
  const deleteButton = document.createElement('span');
  deleteButton.classList.add('delete');
  deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
  deleteButton.style.display = 'none';
  ////

  main.append(taskList);

  taskList.append(taskContainer);
  taskContainer.append(check);
  taskContainer.append(newTask);
  taskContainer.append(deleteButton);
  taskContainer.append(date);

  const parseDateInput = date.value.split('-');

  if (parseDateInput.length === 1) {
    document.querySelector('.date-2').textContent = ` unspecified`;
  } else {
    document.querySelector(
      '.date-2'
    ).textContent = ` ${parseDateInput[2]}/${parseDateInput[1]}/${parseDateInput[0]}`;
  }

  eventListenerForTasks();
}

function eventListenerForTasks() {
  const taskListAll = document.querySelectorAll('.task-list');
  //////////////////////////////////////////////////////////////
  taskListAll.forEach(task => {
    task.addEventListener('mouseover', function (e) {
      e.currentTarget.children[0].children[2].style.display = '';
    });
    //////////////////////////////////////////////////////////////
    task.addEventListener('mouseleave', function (e) {
      e.currentTarget.children[0].children[2].style.display = 'none';
    });
    //////////////////////////////////////////////////////////////
    task.addEventListener('click', function (e) {
      //////////////////////////
      /// for additional info///
      //////////////////////////
      if (e.target.getAttribute('class') !== 'md hydrated') {
        const found = todoStore.find(
          el => el.id === e.currentTarget.children[0].getAttribute('id')
        );

        if (found.description.length === 0) {
          document.querySelector('.description-2').textContent = ' unspecified';
        } else {
          document.querySelector(
            '.description-2'
          ).textContent = ` ${found.description}`;
        }

        const parseDate =
          e.currentTarget.children[0].lastChild.value.split('-');

        document.querySelector(
          '.date-2'
        ).textContent = ` ${parseDate[2]}/${parseDate[1]}/${parseDate[0]}`;

        if (found.dueDate.length === 0) {
          document.querySelector('.date-2').textContent = ` unspecified`;
        }
      }
      ///////////////////////
      /// for delete task///
      //////////////////////
      if (e.target.getAttribute('class') === 'md hydrated') {
        e.currentTarget.remove();
        const foundIndex = todoStore.findIndex(
          el => el.id === e.currentTarget.children[0].getAttribute('id')
        );

        todoStore.splice(foundIndex, 1);

        document.querySelector('.description-2').textContent = ' ';
        document.querySelector('.date-2').textContent = ' ';

        localStorage.setItem('todos', JSON.stringify(todoStore));
      }

      ////////////////////////
      /// for checking box////
      ////////////////////////
      if (e.target.getAttribute('class') === 'check') {
        if (e.target.checked === false) {
          e.currentTarget.children[0].children[1].style.textDecoration = 'none';
        } else if (e.target.checked === true) {
          e.currentTarget.children[0].children[1].style.textDecoration =
            'line-through';
        }
        const foundCheck = todoStore.find(
          el => el.id === e.currentTarget.children[0].getAttribute('id')
        );

        foundCheck.check = !foundCheck.check;
      }
      localStorage.setItem('todos', JSON.stringify(todoStore));
    });
  });
  const taskTitleAll = document.querySelectorAll('.task-title');
  taskTitleAll.forEach(task => {
    task.addEventListener('input', function (e) {});
  });
}

eventListenerForTasks();

function openModal() {
  if (currentTab !== 'Today' && currentTab !== 'This week') {
    modal.classList.add('active');
    overlay.classList.remove('hidden');
  } else {
    alert(`New task cannot be added to the '${currentTab}' tab ❗`);
  }
}

function closeModal() {
  modal.classList.remove('active');
  overlay.classList.add('hidden');
}

function updatetodoStore() {
  todoStore = todoStore.filter(el => el.index !== projectIndex);
}

function numberOfProjectsReducer() {
  numberOfProjects--;
  localStorage.setItem('numberOfProjects', numberOfProjects);
}

function counterReducer() {
  k--;
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
  numberOfProjectsReducer,
  pushProjectIntoArray,
  projectStore,
  counterReducer,
};
