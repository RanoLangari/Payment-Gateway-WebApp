import {
  getPesananById,
  getAllPesanan,
  createPesanan,
  updatePesanan,
} from "../controllers/PesananController.js";
import express from "express";

const router = express.Router();

router.get("/pesanan", getAllPesanan);
router.get("/pesanan/:id", getPesananById);
router.post("/pesanan", createPesanan);
router.put("/pesanan/:id", updatePesanan);

export default router;
