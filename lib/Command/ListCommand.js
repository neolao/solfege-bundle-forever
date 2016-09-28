"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forever = require("forever");

var _forever2 = _interopRequireDefault(_forever);

var _thunkify = require("thunkify");

var _thunkify2 = _interopRequireDefault(_thunkify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var list = (0, _thunkify2.default)(_forever2.default.list);

/**
 * Start command
 */
class StartCommand {
  /**
   * Get command name
   *
   * @return  {string}    Command name
   */
  getName() {
    return "forever:list";
  }

  /**
   * Execute the command
   *
   * @param   {Array}     parameters  Parameters
   * @param   {Array}     options     Options
   */
  *execute(parameters, options) {
    var processes = yield list(false);
    console.log(processes);
  }
}
exports.default = StartCommand;
module.exports = exports['default'];