const { decode } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw { status: 401, message: "Unauthenticated" };
    }

    const access_token = authorization.split(" ")[1];
    const verify = decode(access_token);

    const user = await User.findByPk(verify.id);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    req.loginInfo = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

module.exports = authentication;
