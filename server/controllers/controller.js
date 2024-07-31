const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Book } = require("../models/index");

class Controller {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { message: "Email or password is required", status: 400 };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { message: "Email/password invalid", status: 401 };
      }

      if (!comparePassword(password, user.password)) {
        throw { message: "Email/password invalid", status: 401 };
      }
      const payload = {
        id: user.id,
        status: user.status,
        role: user.role,
        email: user.email,
      };
      let access_token = signToken(payload);
      res.status(200).json({ access_token, role: user.role });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({
        where: { email },
      });
      if (findUser) {
        throw {
          message: "Email already exists. Try another one!",
          status: 400,
        };
      }
      await User.create({
        email,
        password,
      });
      const createdUser = await User.findOne({
        where: { email },
        attributes: { exclude: ["password"] },
      });
      res.status(201).json({ createdUser });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
  static async findAvailableBooks(req, res, next) {
    try {
      const books = await Book.findAll({ where: { status: "Tersedia" } });
      res.status(200).json({
        message: "Successfully find all available books",
        books,
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
  static async findMyBook(req, res, next) {
    try {
      const userId = req.loginInfo.userId;
      const book = await Book.findOne({ where: { userId } });
      res.status(200).json({
        message: "Successfully find user's book",
        book,
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
  static async findAllBooks(req, res, next) {
    try {
      const books = await Book.findAll({
        include: [{ model: User, attributes: { exclude: ["password"] } }],
      });
      res.status(200).json({
        message: "Successfully find all books",
        books,
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
  static async changeUserStatus(req, res, next) {
    try {
      const userId = req.loginInfo.userId;
      const user = await User.findByPk(userId);
      if (!user) {
        throw { status: 404, message: "User not found" };
      }
      const newStatus =
        user.status == "Tidak Meminjam" ? "Meminjam" : "Tidak Meminjam";
      const update = await User.update(
        { status: newStatus },
        { where: { id: userId } }
      );
      res.status(200).json({
        message: "Successfully Change User Status",
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }

  static async changeBookStatus(req, res, next) {
    try {
      const { bookId } = req.params;
      const userId = req.loginInfo.userId;
      const book = await Book.findByPk(bookId);
      // console.log(book, userId);
      if (!book) {
        throw { status: 404, message: "Book not found" };
      }
      const newStatus =
        book.status == "Tersedia" ? "Masih dalam peminjaman" : "Tersedia";
      const newUserId = book.userId ? null : userId;
      const update = await Book.update(
        { status: newStatus, userId: newUserId },
        { where: { id: bookId } }
      );
      res.status(200).json({
        message: "Successfully Update Book Status",
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
  static async userInfo(req, res, next) {
    try {
      const userInfo = await User.findOne({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json({
        message: "Successfully get user info",
        userInfo,
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal server error" });
    }
  }
}

module.exports = Controller;
