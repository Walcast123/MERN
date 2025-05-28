import { config } from "dotenv";
config();

console.log("MONGODB_URI:", process.env.MONGODB_URI);

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET || "secretkey";