/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const mongoose = require("mongoose");
const { User } = require("../models");
const UserModel = require("../models").User;
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

module.exports = function (app) {
  app.route("/api/users").get(function (req, res) {
    User.find({}, (err, data) => {
      if (!data) {
        res.send("no data");
      } else {
        res.send(data);
      }
    });
  });

  app.route("/add").post(upload.single("photo"), function (req, res) {
    const name = req.body.name;
    const birthdate = req.body.birthdate;
    const photo = req.file.filename;
    const url = req.protocol + "://" + req.get("host");
    console.log(url);
    const newUserData = {
      name,
      birthdate,
      photo: url + "/" + req.file.path,
    };
    console.log(req.file.path);

    const newUser = new User(newUserData);
    newUser.save((err, data) => {
      if (!data) {
        res.send("No data");
      } else {
        res.json({
          msg: "User added",
          photo: url + "/uploads/" + req.file.filename,
        });
      }
    });
  });

  app.route("/delete").delete(upload.single("photo"), function (req, res) {
    //if successful response will be 'complete delete successful'
    //if successful rsponse will be 'complete delete successful'
  
    User.deleteMany({}, (err, data) => {
      if (!err && data) {
        res.send("complete delete successful");
      }

      // fs.unlink("public/uploads/" file, (err) => {
      //   if (err) {
      //     console.log("failed to delete local image:" + err);
      //   } else {
      //     console.log("successfully deleted local image");
      //   }
      // });
    });
  });

  app
    .route("/api/books/:id")
    .get(function (req, res) {})

    .post(function (req, res) {})

    .delete(function (req, res) {});
};
