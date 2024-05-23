import { comparePassword, encryptPassword } from "../config/hashPassword.js";
import {
  findUsersByEmailModels,
  createUserModels,
  getAllUsersModels,
  deleteUserModels,
  updateUsersModels,
  approveUsersModels,
} from "../models/user.js";

/**
 * Creates a new user in the database.
 *
 * @param {Object} req - The request object containing the user data.
 * @param {Object} req.body - The user data.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A promise that resolves when the user is created.
 */
export const createUser = async (req, res) => {
  try {
    // Check if the request contains a file, if not set the filename to an empty string
    let filename = "";
    if (!req.file) {
      filename = "";
    } else {
      // Construct the full path of the uploaded file using the request protocol, host, and filename
      filename =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/profile/" +
        req.file.filename;
    }

    // Find users with the same email in the database
    const [checkUsers] = await findUsersByEmailModels(req.body.email);

    // If no user with the same email is found, encrypt the password and create a new user
    if (checkUsers.length === 0) {
      const password = encryptPassword(req.body.password);
      const data = { ...req.body, password: password, filename };
      await createUserModels(data);
      res.status(200).json({
        msg: "Submit Data Berhasil",
        data: req.body,
      });
    } else {
      // If a user with the same email is found, return an error response
      res.status(400).json({
        msg: "Email Sudah Terdaftar",
        data: req.body,
      });
    }
  } catch (error) {
    // If an error occurs during the user creation process, return an error response
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

export const editUser = async (req, res) => {
  try {
    let filename = "";
    if (!req.file) {
      filename = "";
    } else {
      filename =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/profile/" +
        req.file.filename;
    }

    await updateUsersModels(req.body, filename);
    res.status(200).json({
      msg: "Submit Data Berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const [result] = await getAllUsersModels();
    res.status(200).json({
      msg: "Data Berhasil di Ambil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Penarikan Data Gagal",
      errMsg: error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    await updateUsersModels(req.body);
    res.status(200).json({
      msg: "Submit Data Berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUserModels(req.params.id);
    res.status(200).json({
      msg: "Data Berhasil di delete",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Data gagal di hapus",
      errMsg: error,
    });
  }
};

export const approveUsers = async (req, res) => {
  try {
    await approveUsersModels(req.params.id);
    res.status(200).json({
      msg: "Submit Data Berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};
// export const deleteUser = async (req, res) => {
//   try {
//     await deleteUserModels(req.params.id);
//     res.status(200).json({
//       msg: "Data Berhasil di delete",
//       data: req.body,
//     });
//   } catch (error) {
//     res.status(400).json({
//       msg: "Data gagal di hapus",
//       errMsg: error,
//     });
//   }
// };
