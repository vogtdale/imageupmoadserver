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
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

module.exports = function (app) {
  app
  .route("/api/users")
  .get(function (req, res) {
      User.find({}, (err, data) => {
          if (!data) {
              res.send("no data")
          }else {
              res.send(data)
          }
      })
    
  });

  app
    .route("/add")
    .post(upload.single('photo'), function (req, res) {
      const name = req.body.name;
      const birthdate = req.body.birthdate;
      const photo = req.file.filename;
      const newUserData = {
        name,
        birthdate,
        photo
      };

      const newUser = new User(newUserData);
      newUser.save((err, data) => {
        if (!data) {
          res.send("No data");
        } else {
          res.send("User added");
        }
      });
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {})

    .post(function (req, res) {})

    .delete(function (req, res) {});
};
