import Users from "../Models/UsersModel.js";

export const registerUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json({
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
      res.status(200).json({
        message: "Login berhasil",
        data: user,
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
