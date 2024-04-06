import Barang from "../Models/BarangModel.js";

export const getAllBarang = async (req, res) => {
  try {
    const barang = await Barang.findAll();
    res.status(200).json({
      message: "Success",
      data: barang,
    });
  } catch (error) {
    console.log(`error pada getAllBarang: ${error.message}`);
  }
};

export const getBarangById = async (req, res) => {
  try {
    const barang = await Barang.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Success",
      data: barang,
    });
  } catch (error) {
    console.log(`error pada getBarangById: ${error.message}`);
  }
};

export const createBarang = async (req, res) => {
  try {
    const barang = await Barang.create(req.body);
    res.status(201).json({
      message: "Barang berhasil ditambahkan",
      data: barang,
    });
  } catch (error) {
    console.log(`error pada createBarang: ${error.message}`);
  }
};

export const updateBarang = async (req, res) => {
  try {
    const barang = await Barang.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Barang berhasil diupdate",
    });
  } catch (error) {
    console.log(`error pada updateBarang: ${error.message}`);
  }
};

export const deleteBarang = async (req, res) => {
  try {
    await Barang.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Barang berhasil dihapus",
    });
  } catch (error) {
    console.log(`error pada deleteBarang: ${error.message}`);
  }
};
