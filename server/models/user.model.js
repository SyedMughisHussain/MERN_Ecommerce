import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  next();
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

export const User = mongoose.model("User", userSchema);
