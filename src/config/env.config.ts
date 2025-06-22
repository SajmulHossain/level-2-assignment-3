import dotenv from 'dotenv'
import path from 'path';

dotenv.config({path: path.join(process.cwd(), ".env")});

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

export {
    db_pass,
    db_user
}