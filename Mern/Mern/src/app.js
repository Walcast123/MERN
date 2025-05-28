import express from "express";  
import cors from "cors";
import morgan from "morgan";

const app = express();

// Importar rutas
import notesRoutes from "./routes/notes.routes.js";
import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Configuración
app.set("port", process.env.PORT || 5050); // Cambio de puerto

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Middleware personalizado: mostrar hora
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

// Rutas
app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);

// Ruta principal de prueba
app.get("/", (req, res) => {
  res.send("Servidor MERN funcionando 🚀");
});

// Ruta no encontrada
app.use((req, res, next) => {
  const error = new Error("Ruta no encontrada - revisa la URL");
  error.status = 404;
  next(error);
});

// Manejador de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status,
      message: err.message || "Error interno del servidor",
    },
  });
});

export default app;
