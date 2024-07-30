const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  student_name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  college_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  r1_marks: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  r2_marks: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  r3_marks: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  tech_marks: {
    type: Number,
    required: true,
    min: 0,
    max: 20,
  },
  total_marks: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    enum: ["Selected", "Rejected"],
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
