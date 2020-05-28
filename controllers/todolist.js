const Todolist = require("../models/todolist");

exports.postTodoList = (req, res, next) => {
    const judul = req.body.judul;
    const konten = req.body.konten;
    const todolistId = req.body.id;

    const todolist = new Todolist({
        judul: judul,
        konten: konten,
        userId: todolistId,
    });

    todolist
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Sukses",
                data: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getTodoListUser = (req, res, next) => {
    const id = req.params.id;

    Todolist.find({ userId: id })
        .populate("userId", "nama email")
        .then((result) => {
            res.json({
                message: "Sukses",
                data: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.detailTodoList = (req, res, next) => {
    const id = req.params.id;

    Todolist.findOne({ _id: id })
        .then((result) => {
            res.status(200).json({
                message: "Sukses",
                data: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.editTodoList = (req, res, next) => {
    const id = req.params.id;
    const judul = req.body.judul;
    const konten = req.body.konten;

    Todolist.findOne({ _id: id })
        .then((todo) => {
            todo.judul = judul;
            todo.konten = konten;
            return todo.save();
        })
        .then((result) => {
            res.status(200).json({
                message: "Sukses",
                data: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.removeTodoList = (req, res, next) => {
    const id = req.params.id;

    Todolist.findByIdAndRemove(id)
        .then((result) => {
            res.status(200).json({
                message: "Delete Todo",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};