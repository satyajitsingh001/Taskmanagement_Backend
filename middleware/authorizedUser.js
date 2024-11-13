import jwt from "jsonwebtoken";
import Admin from "../Model/AccountcreateModel.js";

// Check if the user is authorized or not
export const isAuth = async (req, res, next) => {
  //   const token = req.cookies.token;
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized User",
    });
  }

  const bearertoken = token.split(" ");
  if (bearertoken.length !== 2 || bearertoken[0] !== "Bearer") {
    return res.status(401).json({
      error: "Unauthorized User",
    });
  }

  const extractedToken = bearertoken[1];

  try {
    const decodedData = jwt.verify(extractedToken, process.env.SECRETE_KEY);
    // console.log(decodedData);
    const user = await Admin.findById({ _id: decodedData._id });

    // console.log(user);
    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};
