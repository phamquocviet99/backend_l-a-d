import UserModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//Function signin
export const signIn = async (req, res, next) => {
  UserModel.find({
    username: req.body.username,
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          error: true,
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: true,
            });
          } else {
            const user = new UserModel({
              email: req.body.email,
              username: req.body.username,
              name: req.body.name,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  error: false,
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: true,
                });
              });
          }
        });
      }
    });
};
export const remove = async (req, res) => {
  UserModel.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        error: false,
        message: " user deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
      });
    });
};
export const getAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ error: false, data: users });
  } catch (err) {
    res.status(500).json({ error: true });
  }
};
export const login = async (req, res) => {
  UserModel.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            { username: user[0].username, id: user[0]._id },
            process.env.JWT_KEY,
            {
              expiresIn: "10h",
            }
          );
          return res.status(200).json({
            message: "Auth success",
            token: token,
            id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            error: false,
          
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
export const changePassword = async (req, res) => {
  const user = await UserModel.find({ username: req.body.username });
  if (user.length < 1) {
    return res.status(404).json({
      message: "Sai tên đăng nhập",
    });
  }
  bcrypt.compare(req.body.password, user[0].password, (err, result) => {
    if (err) {
      return res.status(401).json({
        message: "Có lỗi khi xác thực",
      });
    }
    if (result) {
      bcrypt
        .hash(req.body.newpassword, 10)
        .then((result) => {
          UserModel.updateOne(
            { _id: user[0]._id },
            { $set: { password: result } },
            { new: true }
          )
            .then((result) => {
              return res
                .status(200)
                .json({ error: false, message: "Đổi mật khẩu thành công" });
            })
            .catch((error) => {
              return res.status(500).json({
                error: true,
                message: "Không cập nhật được mật khẩu",
              });
            });
        })
        .catch((error) => {
          return res.status(500).json({
            error: true,
            message: "Không cập nhật được mật khẩu",
          });
        });
    } else {
      return res.status(500).json({
        error: true,
        message: "Sai mật khẩu",
      });
    }
  });
};

export const update = async (req, res) => {
  await UserModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
      },
    },
    { new: true }
  )
    .then((result) => {
      return res
        .status(200)
        .json({ error: false, message: "Cập nhật thành công" });
    })
    .catch((error) => {
      res.status(500).json({ error: true, message: "Cập nhật thất bại" });
    });
};
