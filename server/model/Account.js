const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    username: String,
    password: String,
    activities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", AccountSchema);
