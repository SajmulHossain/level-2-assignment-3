import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import {db_pass, db_user} from "./config/env.config"

let server: Server;
const port: number = 3000;

async function main() {
    try {
        await mongoose.connect(
          `mongodb+srv://${db_user}:${db_pass}@cluster0.saftd.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0`
        );

        server = app.listen(port, () => {
            console.log(`server is running on port: %s`, port);
        })
    } catch (error) {
        console.log(error);
    }
}


main();