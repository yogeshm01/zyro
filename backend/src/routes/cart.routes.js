const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/add", authMiddleware, cartController.addItem);
router.get("/", authMiddleware, cartController.getCart);
router.post("/checkout", authMiddleware, cartController.checkout);


module.exports = router;
