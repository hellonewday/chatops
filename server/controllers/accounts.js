const bcrypt = require("bcryptjs");
const Joi = require("joi");
const Account = require("../model/Account");
const jwt = require("jsonwebtoken");

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().required().min(6).max(20),
    password: Joi.string().token().min(6).max(20),
  });

  return schema.validate(user);
};

const isCoincide = (username, password) => {
  let pattern = 0;
  let compareLength =
    username.length > password.length ? password.length : username.length;
  for (let i = 0; i < compareLength - 1; i++) {
    if (username[i] === password[i]) pattern += 1;
  }

  return pattern > parseInt((compareLength * 60) / 100);
};

module.exports.listUsers = (req, res, next) => {
  Account.find()
    .populate("activities", "actType content")
    .exec((err, documents) => {
      if (err) return res.status(400).json({ error: err });
      else
        return res.status(200).json({
          counts: documents.length,
          data: documents,
        });
    });
};

module.exports.getUser = (req, res, next) => {
  Account.findOne({ _id: req.params.id }).exec((error, document) => {
    if (error) return res.status(400).json({ error });
    else
      return res.status(200).json({
        data: document,
      });
  });
};

module.exports.registerUser = async (req, res, next) => {
  let isExist = await Account.findOne({ username: req.body.username });
  if (isExist)
    return res.status(400).json({ message: "Account is already existed" });
  let userData = validateUser({
    username: req.body.username,
    password: req.body.password,
  });
  if (!userData.error) {
    if (isCoincide(req.body.username, req.body.password))
      return res

        .status(403)
        .json({ message: "Username and password must be explicit" });
    else
      bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) return res.status(400).json({ error });
        else {
          let acc = new Account({
            username: req.body.username,
            password: hash,
          });
          acc
            .save()
            .then((response) => {
              return res.status(201).json({ response });
            })
            .catch((err) => {
              return res.status(400).json({
                error: err,
              });
            });
        }
      });
  } else {
    return res.status(301).json({ message: userData.error.details[0].message });
  }
};

module.exports.loginUser = (req, res, next) => {
  let userData = validateUser({
    username: req.body.username,
    password: req.body.password,
  });
  if (!userData.error) {
    Account.findOne({ username: req.body.username }).exec((error, document) => {
      if (error) return res.status(400).json({ error: error });
      else if (document.length === 0)
        return res.status(404).json({ message: "No user found" });
      else {
        bcrypt.compare(req.body.password, document.password, (err, done) => {
          if (err)
            return res.status(403).json({ message: "Wrong password", error });
          else {
            let token = jwt.sign({ id: document._id }, process.env.JWT_SECRET, {
              expiresIn: "1d",
            });
            return res.status(200).json({ header: `Bearer ${token}` });
          }
        });
      }
    });
  } else {
    return res.status(301).json({ message: userData.error.details[0].message });
  }
};
