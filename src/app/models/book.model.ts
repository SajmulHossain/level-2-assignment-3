import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
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
      unique: [true, "The isbn number is already taken"],
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.pre("findOneAndUpdate", async function(next) {
  const updates: any = this.getUpdate();

  if(updates.copies && updates.copies > 0) {
    updates.available = true;
  }

  if(updates.copies === 0) {
    updates.available = false;
  }

  next();
})

export const Books = model("Books", bookSchema);
