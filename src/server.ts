import { Server } from "http";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

let server: Server;
const port: number = 3000;

async function main() {
    try {
        await mongoose.connect(
          `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.saftd.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0`
        );

        server = app.listen(port, () => {
            console.log(`server is running on port: %s`, port);
        })
    } catch (error) {
        console.log(error);
    }
}

main();