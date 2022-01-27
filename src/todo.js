import { titleInput } from "./index.js";

class todoCreator {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.id = self.crypto.randomUUID();
  }
  login() {
    console.log("login");
  }
}

const user1 = new todoCreator("iş", "yapılacak", "11.21");

console.log(user1.login());

let todoStore = [];

function pushTodoIntoArray() {
  const title = titleInput.value;

  const newTodo = new todoCreator(title);
  todoStore.push(newTodo);
}

// pushTodoIntoArray();
console.log(todoStore);

export { todoStore, pushTodoIntoArray, todoCreator };
