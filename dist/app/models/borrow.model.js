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
exports.Borrows = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    dueDate: {
        type: Date,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
}, { versionKey: false, timestamps: true });
borrowSchema.static("checkCopies", function (id, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.Books.findById(id);
        if (!book) {
            throw {
                name: "ValidationError",
                message: "Book not found with this id",
            };
        }
        if ((book === null || book === void 0 ? void 0 : book.copies) < quantity) {
            throw {
                name: "stockError",
                message: "Not enough sufficient book",
            };
        }
        if ((book === null || book === void 0 ? void 0 : book.copies) - quantity === 0) {
            yield book_model_1.Books.findByIdAndUpdate(id, { available: false });
        }
        return book === null || book === void 0 ? void 0 : book.copies;
    });
});
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield book_model_1.Books.findByIdAndUpdate(this.book, {
            $inc: { copies: -this.quantity },
        });
        next();
    });
});
// borrowSchema.post("save", async function (doc,next) {
//   const copies = await Borrows.checkCopies(this.book, -1);
//   if (doc && !copies) {
//     await Books.findByIdAndUpdate(this.book, { available: false });
//   }
//   next();
// });
exports.Borrows = (0, mongoose_1.model)("Borrows", borrowSchema);
