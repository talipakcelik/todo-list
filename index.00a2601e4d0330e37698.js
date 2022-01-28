"use strict";
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/todo.js");




const user2 = new _todo_js__WEBPACK_IMPORTED_MODULE_0__["default"]("sarah", 8);

console.log(user2.name);


/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


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

// function pushTodoIntoArray() {
//   const title =
//   const description =
//   const duaDate =
//   const newTodo = new todoCreator(title, description, duaDate);
// }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todoCreator);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMDBhMjYwMWU0ZDAzMzBlMzc2OTguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ29DO0FBQ3BDO0FBQ0Esa0JBQWtCLGdEQUFXO0FBQzdCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ05hO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFdBQVcsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG9kby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB0b2RvQ3JlYXRvciBmcm9tIFwiLi90b2RvLmpzXCI7XHJcblxyXG5jb25zdCB1c2VyMiA9IG5ldyB0b2RvQ3JlYXRvcihcInNhcmFoXCIsIDgpO1xyXG5cclxuY29uc29sZS5sb2codXNlcjIubmFtZSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuY2xhc3MgdG9kb0NyZWF0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSkge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcclxuICAgIHRoaXMuaWQgPSBzZWxmLmNyeXB0by5yYW5kb21VVUlEKCk7XHJcbiAgfVxyXG4gIGxvZ2luKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJsb2dpblwiKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHVzZXIxID0gbmV3IHRvZG9DcmVhdG9yKFwiacWfXCIsIFwieWFwxLFsYWNha1wiLCBcIjExLjIxXCIpO1xyXG5cclxuY29uc29sZS5sb2codXNlcjEubG9naW4oKSk7XHJcblxyXG5sZXQgdG9kb1N0b3JlID0gW107XHJcblxyXG4vLyBmdW5jdGlvbiBwdXNoVG9kb0ludG9BcnJheSgpIHtcclxuLy8gICBjb25zdCB0aXRsZSA9XHJcbi8vICAgY29uc3QgZGVzY3JpcHRpb24gPVxyXG4vLyAgIGNvbnN0IGR1YURhdGUgPVxyXG4vLyAgIGNvbnN0IG5ld1RvZG8gPSBuZXcgdG9kb0NyZWF0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWFEYXRlKTtcclxuLy8gfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdG9kb0NyZWF0b3I7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==