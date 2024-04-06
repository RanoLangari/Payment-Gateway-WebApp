import Pesanan from "../Models/PesananModel.js";
import midtransClient from "midtrans-client";
import dotenv from "dotenv";
dotenv.config();

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const getAllPesanan = async (req, res) => {
  try {
    const pesanan = await Pesanan.findAll();
    res.status(200).json({
      message: "Success",
      data: pesanan,
    });
  } catch (error) {
    console.log(`error pada getAllPesanan: ${error.message}`);
  }
};

export const getPesananById = async (req, res) => {
  try {
    const pesanan = await Pesanan.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Success",
      data: pesanan,
    });
  } catch (error) {
    console.log(`error pada getPesananById: ${error.message}`);
  }
};

export const createPesanan = async (req, res) => {
  try {
    let parameter = {
      transaction_details: {
        order_id: "ORDER-" + Math.round(new Date().getTime() / 1000),
        gross_amount: req.body.total_harga,
      },
      customer_details: {
        name: req.body.nama,
        email: req.body.email,
      },
    };
    const token = await snap.createTransactionToken(parameter);
    res.status(200).json({
      message: "Success",
      token,
    });
  } catch (error) {
    console.log(`error pada createPesanan: ${error.message}`);
  }
};
