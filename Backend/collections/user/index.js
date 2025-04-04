  const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  loginToken: [
    {
      token: {
        type: String,
      },
    },
  ],
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }] // Array of events user has registered for
});

module.exports = mongoose.model("user", userSchema);
