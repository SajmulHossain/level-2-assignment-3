"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrows_controller_1 = require("./app/controllers/borrows.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", books_controller_1.bookRouter);
app.use("/api/borrow", borrows_controller_1.borrowRouter);
app.get("/", (req, res) => {
    res.send("Library management server is walking!!!!!");
});
app.use((req, res) => {
    res.status(404).json({ message: "Route not found", status: 404 });
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            message: error.name === 'ValidationError' ? 'Validation failed' : error.name === 'CastError' ? "Document doesn't exist with this id" : error.name === "stockError" ? "Insufficient Copies" : "Unknown Error",
            success: false,
            error
        });
    }
});
exports.default = app;
