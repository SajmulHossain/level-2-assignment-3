import express, { Request, Response } from "express";
import { Books } from "../models/book.model";

export const bookRouter = express.Router();




// * getTotalCount of books
bookRouter.get("/states", async (req:Request, res:Response) => {
  const data = await Books.estimatedDocumentCount();

  res.json({
    success: true,
    message: "Data retrived successfully",
    data,
  });
});

// * getting all books with filter, sorting and limit = 10
bookRouter.get("", async (req: Request, res: Response) => {
  const { filter, sortBy, sort, limit, skip } = req.query;
  const query: { genre: string } | {} = filter ? { genre: filter } : {};
  const sorting:
    | {
        [x: string]: string;
      }
    | {} = sortBy ? { [sortBy as string]: sort || "asc" } : {};
  const limitValue: number = limit ? parseInt(limit as string) : 10;
  const skipValue : number = skip ? parseInt(skip as string) : 0;

  const books = await Books.find(query).sort(sorting).skip(skipValue * 10).limit(limitValue);
  res.json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

// * post book
bookRouter.post("", async (req: Request, res: Response) => {
  const { body } = req;
  const book = await Books.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

// * getting single book by it's id
bookRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Books.findById(id);
  res.json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});

// * update book
bookRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const book = await Books.findByIdAndUpdate(id, body, { new: true });
  res.status(202).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});

// * delete book
bookRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await Books.findByIdAndDelete(id);
  res.json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
});
