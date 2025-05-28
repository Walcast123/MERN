import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./database.js";
import cors from 'cors';

app.use(cors());

connectDB();

async function main() {
app.listen(4000, () => {
  console.log("✅ Servidor escuchando en http://localhost:4000");
});
}

main();

