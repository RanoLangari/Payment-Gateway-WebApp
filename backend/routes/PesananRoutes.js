import {
  getPesananById,
  getAllPesanan,
  createPesanan,
} from "../controllers/PesananController.js";
import express from "express";

const router = express.Router();

router.get("/pesanan", getAllPesanan);
router.get("/pesanan/:id", getPesananById);
router.post("/pesanan", createPesanan);

export default router;
