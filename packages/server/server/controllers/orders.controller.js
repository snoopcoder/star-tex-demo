const fs = require("fs");
const strftime = require("strftime");
const sendBySocket = require("../../config/socket");
/**
 * Create new order
 * @property {string} req.body.id - token.
 * @property {object} req.body.places - places to save.
 * @returns {boolean} result
 */
// eslint-disable-next-line no-unused-vars
function create(req, res, next) {
  // eslint-disable-next-line node/prefer-promises/fs
  fs.writeFile(
    `output/${strftime("%Y%m%d-%H%M%S")}-${req.body.id}.txt`,
    JSON.stringify(req.body.orders),
    function (error) {
      if (error) {
        console.log(error);
      } else {
        sendBySocket(req.body.id, "Заказ успешно создан");
      }
    }
  );
  res.send({ success: true });
}

module.exports = { create };
