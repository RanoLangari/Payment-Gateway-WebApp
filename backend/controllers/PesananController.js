import Pesanan from "../Models/PesananModel.js";

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
