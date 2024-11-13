import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please provide an Email"],
    unique: true,
    // validate:[validator.isEmail,'Please Enter valid email']
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength: [6, "password should be greater than  character"],
    select: false,
  },
});

//JWT TOKEN
adminSchema.methods.getJwtToken = function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRETE_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

//compare Password
adminSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

export default mongoose.model("Admin", adminSchema, "Admin");
