const Activity = require("../model/Activity");
const Account = require("../model/Account");

module.exports.listActivities = (req, res, next) => {
  let page = req.query.page || 1;

  Activity.find()
    .limit(10)
    .skip(10 * (page - 1))
    .exec((error, documents) => {
      if (error) return res.status(400).json({ error });
      else
        return res
          .status(200)
          .json({ counts: documents.length, data: documents });
    });
};

module.exports.addActivity = (req, res, next) => {
  let data = new Activity({
    actType: req.body.actType,
    content: req.body.content,
    user: req.user._id,
  });
  data
    .save()
    .then((response) => {
      Account.updateOne(
        { _id: req.user._id },
        { $push: { activities: response._id } }
      )
        .then((result) => {
          return res.status(201).json({ response, result, success: true });
        })
        .catch((error) => {
          return res.status(400).json({ error });
        });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};

module.exports.deleteActivity = (req, res, next) => {
  Account.updateOne(
    { _id: req.user._id },
    { $pull: { activities: req.params.id } }
  )
    .then((done) => {
      Activity.deleteOne({ _id: req.params.id })
        .then((response) => {
          return res.status(200).json({ response });
        })
        .catch((error) => {
          return res.status(400).json({ error });
        });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};
