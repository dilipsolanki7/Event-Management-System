const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String },
    organizer: { type: String },
    date: { type: Date },
    time: { type: String },
    description: { type: String },
    venue: { type: String },
    photoURL: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    registrationFee: { type: Number, default: 0 }, // Fee for registration (default is 0 if free)
    maxSlots: { type: Number, required: true }, // Maximum number of slots available for the event
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }] // Array of registered users

});

module.exports = mongoose.model("event", eventSchema);
