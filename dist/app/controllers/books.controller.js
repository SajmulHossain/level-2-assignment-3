"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRouter = express_1.default.Router();
// * getTotalCount of books
exports.bookRouter.get("/states", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield book_model_1.Books.estimatedDocumentCount();
    res.json({
        success: true,
        message: "Data retrived successfully",
        data,
    });
}));
// * getting all books with filter, sorting and limit = 10
exports.bookRouter.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy, sort, limit, skip } = req.query;
    const query = filter ? { genre: filter } : {};
    const sorting = sortBy ? { [sortBy]: sort || "asc" } : {};
    const limitValue = limit ? parseInt(limit) : 10;
    const skipValue = skip ? parseInt(skip) : 0;
    const books = yield book_model_1.Books.find(query).sort(sorting).skip(skipValue * 10).limit(limitValue);
    res.json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
    });
}));
// * post book
exports.bookRouter.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const book = yield book_model_1.Books.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
    });
}));
// * getting single book by it's id
exports.bookRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield book_model_1.Books.findById(id);
    res.json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
    });
}));
// * update book
exports.bookRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const book = yield book_model_1.Books.findByIdAndUpdate(id, body, { new: true });
    res.status(202).json({
        success: true,
        message: "Book updated successfully",
        data: book,
    });
}));
// * delete book
exports.bookRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield book_model_1.Books.findByIdAndDelete(id);
    res.json({
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
}));
