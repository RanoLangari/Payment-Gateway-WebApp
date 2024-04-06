import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import BarangRoutes from "./routes/BarangRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import PesananRoutes from "./routes/PesananRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", [BarangRoutes, userRoutes, PesananRoutes]);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
