const authorization = async (req, res, next) => {
  try {
    const { role } = req.loginInfo;
    if (role != "Admin") {
      throw { message: "Forbidden", status: 403 };
    }
    next();
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

module.exports = authorization;
