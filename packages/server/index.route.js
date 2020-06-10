const express = require("express");

const ordersRoutes =  require("./server/routes/ordersRoutes");

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files
// TODO: все запросы к базе обернуть в трай кетчи(? а может и нет ведь это интпатерн)
/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));



router.use("/orders", ordersRoutes);

module.exports = router;
