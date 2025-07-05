import express, { Application, NextFunction, Request, Response } from 'express'
import { bookRouter } from './app/controllers/books.controller';
import { borrowRouter } from './app/controllers/borrows.controller';
import cors from 'cors';

const app: Application = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://library-management-sajmul.vercel.app"]
}))
app.use(express.json());

app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter)


app.get("/", (req: Request, res: Response) => {
    res.send("Library management server is walking!!!!!")
})

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found", status: 404 });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if(error) {
        res.status(error.code || 400).json({
            // message: error.name === 'ValidationError' ? 'Validation failed' :error.name === 'CastError' ? "Document doesn't exist with this id": error.name === "stockError" ? "Insufficient Copies" : "Unknown Error" ,
            success: false,
            error
        })
    }
})

export default app;