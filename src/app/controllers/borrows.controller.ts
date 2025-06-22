import express, { Request, Response } from 'express'
import { Borrows } from '../models/borrow.model';


export const borrowRouter = express.Router();


// *post a borrow
borrowRouter.post("", async(req: Request, res: Response) => {
    const {body} = req;
    const isEnoughCopies = await Borrows.checkCopies(body.book, body.quantity);
    console.log(isEnoughCopies);
    res.status(201).json({
        success: true,
        message: "Borrow request done",
        isEnoughCopies
    })
})