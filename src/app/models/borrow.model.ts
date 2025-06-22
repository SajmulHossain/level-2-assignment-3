import { model, Schema } from "mongoose";
import {
  BorrowStaticMethod,
  IBorrowModel,
} from "../interfaces/borrow.interface";
import { Books } from "./book.model";

const borrowSchema = new Schema<IBorrowModel, BorrowStaticMethod>(
  {
    book: { type: Schema.Types.ObjectId, required: true },
    dueDate: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { versionKey: false, timestamps: true }
);

borrowSchema.static("checkCopies", async function (id, quantity) {
  const book = await Books.findById(id);

  if (!book) {
    throw {
      name: "ValidationError",
      message: "Book not found with this id",
    };
  }

  if (book?.copies < quantity) {
    throw {
      name: "stockError",
      message: "Not enough sufficient book",
    };
  }

  return book?.copies;
});

borrowSchema.pre("save", async function (next) {
  await Books.findByIdAndUpdate(this.book, {
    $inc: { copies: -this.quantity },
  });
  next();
});

borrowSchema.post("save", async function (doc,next) {
  const copies = await Borrows.checkCopies(this.book, -1);
  if (doc && !copies) {
    await Books.findByIdAndUpdate(this.book, { available: false });
  }

  next();
});

export const Borrows = model<IBorrowModel, BorrowStaticMethod>(
  "Borrows",
  borrowSchema
);
