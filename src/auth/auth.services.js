require("dotenv").config();
const checkUsersCredentials = require("./auth.controllers");
const response = require("../utils/responses.handler");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const postLogin = (req, res) => {
  const { email, password } = req.body;
  checkUsersCredentials(email, password)
    .then((data) => {
      if (data) {
        const token = jwt.sign(
          {
            id: data.id,
            email: data.email,
          },
          secretKey,
          {
            expiresIn: "1d",
          }
        );
        response.success({
          res,
          status: 200,
          message: "Correct Credential!",
          data: token,
        });
      } else {
        response.error({
          res,
          status: 401,
          message: "Invalid Credentials",
        });
      }
    })
    .catch((err) => {
      response.error({
        res,
        status: 400,
        data: err,
        message: "Something Bad",
      });
    });
};

module.exports = postLogin;
