import express, { Request, Response } from "express";
import { Books } from "../models/book.model";

export const bookRouter = express.Router();

bookRouter.get("/", async (req: Request, res: Response) => {
  const { filter, sortBy, sort, limit } = req.query;
  const books = await Books.find({});
  res.send({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

bookRouter.post("", async (req: Request, res: Response) => {
  const { body } = req;
  const book = await Books.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});
