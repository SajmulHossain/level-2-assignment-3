import { Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>({
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
    uppercase: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  copies: {
    type: Number,
    required: true,
    min: 0
  },
  available: {
    type: Boolean,
    required: true,
    default: true
  }
});
