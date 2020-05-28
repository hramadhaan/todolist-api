const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");
const todolistController = require("../controllers/todolist");

router.post("/posts", isAuth, todolistController.postTodoList);
router.get("/posts/:id", isAuth, todolistController.getTodoListUser);
router.get("/posts/detail/:id", isAuth, todolistController.detailTodoList);
router.post("/posts/edit/:id", isAuth, todolistController.editTodoList);
router.get("/posts/delete/:id", isAuth, todolistController.removeTodoList);

module.exports = router;