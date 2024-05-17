import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required.");
  }

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    throw new ApiError(400, "User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  return res.status(201).json({
    status: "success",
    user,
    message: "User Created Successfully!",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fiels are required.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, `User does not exists with this email ${email}.`);
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid Credentials.");
  }

  const token = user.generateAccessToken();

  return res.status(200).json({
    status: "success",
    token,
    user,
    message: "User Logged In Successfully!",
  });
});

export { registerUser, loginUser };
