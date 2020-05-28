const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todolistSchema = new Schema({
    judul: {
        type: String,
        required: true,
    },
    konten: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });

module.exports = mongoose.model("todolist", todolistSchema);