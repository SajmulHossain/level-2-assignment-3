import { model, Schema } from "mongoose";
import { IBorrowModel } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrowModel>(
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

export const Borrows = model("Borrows", borrowSchema);