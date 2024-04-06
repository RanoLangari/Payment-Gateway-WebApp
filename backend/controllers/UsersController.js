import Users from "../Models/UsersModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    return res.status(201).json({
      message: "User berhasil ditambahkan",
      data: user,
    });
  } catch (error) {
    console.log(`error pada registerUser: ${error.message}`);
  }
};
export const loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (user) {
      const id = user.id;
      const token = jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(200).json({
        message: "Login berhasil",
        token,
      });
    } else {
      res.status(400).json({
        message: "Email atau password salah",
      });
    }
  } catch (error) {
    console.log(`error pada loginUser: ${error.message}`);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.users.id,
      },
    });
    res.status(200).json({
      message: "Success",
      data: user,
    });
  } catch (error) {
    console.log(`error pada getUserById: ${error.message}`);
  }
};
