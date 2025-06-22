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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const borrow_model_1 = require("./borrow.model");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
        required: true,
        uppercase: true,
    },
    isbn: {
        type: String,
        unique: [true, "The isbn number {VALUE} is already taken"],
        required: true,
    },
    description: String,
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies must be a positive number"],
    },
    available: {
        type: Boolean,
        required: true,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.pre("findOneAndUpdate", function (next) {
    const updates = this.getUpdate();
    if (updates.copies && updates.copies > 0) {
        updates.available = true;
    }
    if (updates.copies === 0) {
        updates.available = false;
    }
    next();
});
bookSchema.post("findOneAndDelete", function (docs, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield borrow_model_1.Borrows.deleteOne({ book: docs._id });
        next();
    });
});
exports.Books = (0, mongoose_1.model)("Books", bookSchema);
