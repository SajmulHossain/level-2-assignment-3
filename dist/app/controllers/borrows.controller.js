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
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRouter = express_1.default.Router();
// * borrowed book summary getting
exports.borrowRouter.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield borrow_model_1.Borrows.aggregate([
        {
            $lookup: {
                from: "books",
                localField: "book",
                foreignField: "_id",
                as: "book",
            },
        },
        {
            $unwind: "$book",
        },
        {
            $group: {
                _id: { title: "$book.title", isbn: "$book.isbn" },
                totalQuantity: { $sum: "$quantity" },
            },
        },
        {
            $project: {
                _id: 0,
                book: {
                    title: "$_id.title",
                    isbn: "$_id.isbn",
                },
                totalQuantity: 1,
            },
        },
    ]);
    res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data,
    });
}));
// *post a borrow
exports.borrowRouter.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield borrow_model_1.Borrows.checkCopies(body.book, body.quantity);
    const borrow = yield borrow_model_1.Borrows.create(body);
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
    });
}));
