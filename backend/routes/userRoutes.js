const express = require("express");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/admin/dashboard",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

router.get(
  "/employee/dashboard",
  protect,
  authorizeRoles("admin", "employee"),
  (req, res) => {
    res.json({
      message: "Welcome Employee",
      user: req.user,
    });
  }
);
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;