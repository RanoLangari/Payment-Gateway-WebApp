import {
  getPesananById,
  getAllPesanan,
} from "../controllers/PesananController.js";
import express from "express";

const router = express.Router();

router.get("/pesanan", getAllPesanan);
router.get("/pesanan/:id", getPesananById);

export default router;
