const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch {
    res.status(400).json({ message: "post request failed" });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "Invalid email or password." });
      return;
    }

    const validPW = await userData.checkPassword(req.body.password);
    console.log("this email worked");
    if (!validPW) {
      res.status(400).json({ message: "Invalid email or password." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "you are now logged in!" });
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
