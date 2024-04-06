import {
  getBarangById,
  createBarang,
  getAllBarang,
  updateBarang,
  deleteBarang,
} from "../controllers/BarangController.js";

import express from "express";

const router = express.Router();

router.get("/barang", getAllBarang);
router.get("/barang/:id", getBarangById);
router.post("/barang", createBarang);
router.put("/barang/:id", updateBarang);
router.delete("/barang/:id", deleteBarang);

export default router;
