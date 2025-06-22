"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrows = void 0;
const mongoose_1 = require("mongoose");
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
exports.Borrows = (0, mongoose_1.model)("Borrows", borrowSchema);
