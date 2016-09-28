"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forever = require("forever");

var _forever2 = _interopRequireDefault(_forever);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Stop command
 */
class StartCommand {
  /**
   * Get command name
   *
   * @return  {string}    Command name
   */
  getName() {
    return "forever:stop";
  }

  /**
   * Execute the command
   *
   * @param   {Array}     parameters  Parameters
   * @param   {Array}     options     Options
   */
  *execute(parameters, options) {
    var index = parameters[0];
    _forever2.default.stop(index);
  }
}
exports.default = StartCommand;
module.exports = exports['default'];