var express = require("express");
const { findUser } = require("../helpers/userSeeder");
const jwt = require("jsonwebtoken");
var router = express.Router();

const isLoggedin = async (req, res) => {
  try {
    const cookies = req.cookies["jwt"];
    const claims = jwt.verify(cookies, "secret");

    console.log(claims);

    if (!claims) {
      //unauthenticated
      res.status(401).json({ message: "unathenticated user" });
    }

    res.status(200).json({ message: "Successfully signed in" });
  } catch (error) {
    res.status(401).json({ message: "unathenticated user" });
  }
};

/* GET home page. */
router.get("/checklogin", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, "secret");

    console.log("claims", claims);

    if (!claims) {
      //unauthenticated
      res.status(401).json({ message: "unathenticated user" });
    }

    res.status(200).json({ message: "Successfully signed in", data: claims });
  } catch (error) {
    res.status(401).json({ message: "unathenticated user" });
  }
});

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  const [status, user, message] = await findUser(email, password);
  if (status) {
    const token = jwt.sign({ _id: user._id, role: user.role }, "secret");
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 3mins,
    });
    res.status(200).json({ user, message });
  } else {
    res.status(400).json({ user, message });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "successfully logged out" });
});

module.exports = router;
