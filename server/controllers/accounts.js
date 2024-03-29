const bcrypt = require("bcryptjs");
const Joi = require("joi");
const Account = require("../model/Account");
const jwt = require("jsonwebtoken");
const moment = require("moment");

moment.locale("vi");
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
    .populate("activities", "actType content createdAt")
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
  Account.findOne({ _id: req.params.id })
    .populate("activities", "actType content createdAt")
    .exec((error, document) => {
      if (error) return res.status(400).json({ error });
      else
        return res.status(200).json({
          data: {
            id: document._id,
            username: document.username,
            createdAt: moment(document.createdAt).format("LLLL"),
            activities: document.activities.map((item) => {
              return {
                id: item._id,
                actType: item.actType,
                content: item.content,
                createdAt: moment(item.createdAt).format("LLLL"),
                statistical: {
                  date: moment(item.createdAt).format("L"),
                  hour: moment(item.createdAt).format("LT"),
                },
              };
            }),
          },
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
        let acc = new Account({
          username: req.body.username,
          password: hash,
        });
        acc.save().then(() => {
          let token = jwt.sign({ id: acc._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          return res
            .status(200)
            .json({ success: true, header: `Bearer ${token}`, id: acc._id });
        });
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
      else if (!document)
        return res.status(404).json({ message: "No user found" });
      else {
        bcrypt.compare(req.body.password, document.password, (err, done) => {
          if (err)
            return res.status(403).json({ message: "Wrong password", error });
          else {
            let token = jwt.sign({ id: document._id }, process.env.JWT_SECRET, {
              expiresIn: "1d",
            });
            return res
              .status(200)
              .json({ header: `Bearer ${token}`, id: document._id });
          }
        });
      }
    });
  } else {
    return res.status(301).json({ message: userData.error.details[0].message });
  }
};

module.exports.editUser = async (req, res, next) => {
  let isExist = await Account.findOne({ _id: req.params.id });
  if (!isExist)
    return res.status(404).json({ success: false, message: "User not found" });
  if (req.body.password) {
    if (validateUser(req.body).error) {
      return res.status(401).json({
        success: false,
        message: validateUser(req.body).error.details[0].message,
      });
    }
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
      let result = await Account.updateOne(
        { _id: req.params.id },
        {
          username: req.body.username,
          password: hash,
        }
      );

      return res.status(200).json({ success: true, response: result });
    });
  } else {
    let result = await Account.updateOne(
      { _id: req.params.id },
      {
        username: req.body.username,
      }
    );
    return res.status(200).json({ success: true, response: result });
  }
};
