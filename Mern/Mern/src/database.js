import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;
  while (retries < maxRetries) {
    try {
      mongoose.set("strictQuery", false);
      const conn = await mongoose.connect(MONGODB_URI);
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      console.log("Database is connected to", conn.connection.db.databaseName);
      break;
    } catch (error) {
      retries++;
      console.error(`❌ MongoDB connection error (attempt ${retries}):`, error.message);
      await new Promise(res => setTimeout(res, 3000)); // espera 3 segundos y reintenta
    }
  }

  if (retries === maxRetries) {
    console.error("❌ No se pudo conectar a MongoDB después de varios intentos.");
    process.exit(1);
  }
};