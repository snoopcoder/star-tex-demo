const fs = require("fs");
const strftime = require('strftime')
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
    `output/${strftime("%Y%m%d-%H%M%S")}.txt`,
    JSON.stringify(req.body.places),
    function (error) {
      if (error) console.log(error); // если возникла ошибка
    }
  );
  res.send({ success: true });
}

module.exports = { create };