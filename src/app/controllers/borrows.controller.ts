import express, { Request, Response } from "express";
import { Borrows } from "../models/borrow.model";

export const borrowRouter = express.Router();

// * borrowed book summary getting
borrowRouter.get("", async (req: Request, res: Response) => {
  const data = await Borrows.aggregate([
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
                isbn: "$_id.isbn"
            },
            totalQuantity: 1
        }
    }
  ]);

  res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data,
  });
});

// *post a borrow
borrowRouter.post("", async (req: Request, res: Response) => {
  const { body } = req;
  await Borrows.checkCopies(body.book, body.quantity);
  const borrow = await Borrows.create(body);
  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: borrow,
  });
});
