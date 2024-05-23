import { comparePassword } from "../config/hashPassword.js";
import { findUsersByEmailAndApproveModels } from "../models/user.js";
import JWT from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const [userCheck] = await findUsersByEmailAndApproveModels(req.body.email);
    if (userCheck.length > 0) {
      const passwordUser = userCheck[0].password;
      const checkPassword = comparePassword(req.body.password, passwordUser);
      if (checkPassword) {
        const token = JWT.sign(req.body, "Samsung@6plus", {
          expiresIn: "1800s",
        });

        req.headers.authorization = token;
        res.status(200).json({
          msg: "login success",
          access_token: token,
          expired: new Date(new Date().getTime() + 30 * 60000),
          userData: userCheck,
        });
      } else {
        res.status(400).json({
          msg: "User tidak terdaftar",
        });
      }
    } else {
      res.status(401).json({
        msg: "login gagal password tidak sama",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "pembacaan database failed",
      errMsg: error,
    });
  }
};
