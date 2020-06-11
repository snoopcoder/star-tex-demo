const express = require("express");
const ordersCtrl = require("../controllers/orders.controller");

const router = express.Router(); // eslint-disable-line new-cap

router
    .route("/")

    /** POST /api/ - Create new stockpiles item/box */
    .post(
        ordersCtrl.create
    );

module.exports = router;
