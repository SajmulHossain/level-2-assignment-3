import { Model, Types } from "mongoose";

export interface IBorrowModel {
    book: Types.ObjectId;
    quantity: number;
    dueDate: Date;
}

export interface BorrowStaticMethod extends Model<IBorrowModel> {
    checkCopies(id: Types.ObjectId, quantity: number): Error | number
}