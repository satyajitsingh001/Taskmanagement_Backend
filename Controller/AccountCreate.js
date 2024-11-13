import User from "../Model/AccountcreateModel.js";
import { userValidationSchema } from "../Utils/Joi_validation.js";
import bcrypt from "bcryptjs";
import sendToken from "../Utils/Jwt_token_cookie.js";

export const userRegister = async (req, res, next) => {
  try {
    // Validate input
    const validationError = userValidationSchema(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { email, password } = req.body;

    console.log(email);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // Generate a token for the user
    // const token = newUser.getJwtToken();

    // Send the token and user details in response
    // sendToken(newUser, 201, res, token);

    return res.status(200).json({
      success: true,
      message: "user Create Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a token for the user
    const token = user.getJwtToken();

    sendToken(user, 200, res, token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Logout Admin
export const userLogout = async (req, res) => {
  try {
    // Clear the token from cookies or any other storage mechanism you're using
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
