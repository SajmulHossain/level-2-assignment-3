import { Types } from "mongoose";

export interface IBorrowModel {
    book: Types.ObjectId;
    quantity: number;
    dueDate: Date;
}