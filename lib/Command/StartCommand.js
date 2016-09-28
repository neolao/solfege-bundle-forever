"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ContainerAwareCommand = require("solfegejs-cli/lib/Command/ContainerAwareCommand");

var _ContainerAwareCommand2 = _interopRequireDefault(_ContainerAwareCommand);

var _forever = require("forever");

var _forever2 = _interopRequireDefault(_forever);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Start command
 */
class StartCommand extends _ContainerAwareCommand2.default {
    /**
     * Constructor
     *
     * @param   {string}    consolePath     Console file path
     */
    constructor(consolePath) {
        if (!(typeof consolePath === 'string')) {
            throw new TypeError("Value of argument \"consolePath\" violates contract.\n\nExpected:\nstring\n\nGot:\n" + _inspect(consolePath));
        }

        super();

        this.consolePath = consolePath;
    }

    /**
     * Configure command
     */
    *configure() {
        this.setName("forever:start");
        this.setDescription("Start another command and keep it forever alive");
    }

    /**
     * Execute the command
     *
     * @param   {Array}     parameters  Parameters
     * @param   {Array}     options     Options
     */
    *execute(parameters, options) {
        // Get options
        var foreverOptions = {
            args: parameters,
            killTree: true
        };
        if (options.silent) {
            foreverOptions.silent = true;
        }
        if (options.max) {
            foreverOptions.max = parseInt(options.max);
        }
        if (options.pidFile) {
            foreverOptions.pidFile = options.pidFile;
        }
        if (options.logFile) {
            foreverOptions.logFile = options.logFile;
        }
        if (options.env) {
            var env = {};
            if (Array.isArray(options.env)) {
                _options$env = options.env;

                if (!(_options$env && (typeof _options$env[Symbol.iterator] === 'function' || Array.isArray(_options$env)))) {
                    throw new TypeError("Expected _options$env to be iterable, got " + _inspect(_options$env));
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _options$env[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _options$env;

                        var expression = _step.value;

                        var _expression$split = expression.split("=");

                        var _expression$split2 = _slicedToArray(_expression$split, 2);

                        var variable = _expression$split2[0];
                        var value = _expression$split2[1];

                        env[variable] = value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            } else if (typeof options.env === "string") {
                var _options$env$split = options.env.split("=");

                var _options$env$split2 = _slicedToArray(_options$env$split, 2);

                var _variable = _options$env$split2[0];
                var _value = _options$env$split2[1];

                env[_variable] = _value;
            }

            foreverOptions.env = env;
        }

        // Start the child process
        _forever2.default.startDaemon(this.consolePath, foreverOptions);
    }
}
exports.default = StartCommand;

function _inspect(input) {
    function _ref2(key) {
        return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key]) + ';';
    }

    function _ref(item) {
        return _inspect(item) === first;
    }

    if (input === null) {
        return 'null';
    } else if (input === undefined) {
        return 'void';
    } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
        return typeof input === "undefined" ? "undefined" : _typeof(input);
    } else if (Array.isArray(input)) {
        if (input.length > 0) {
            var first = _inspect(input[0]);

            if (input.every(_ref)) {
                return first.trim() + '[]';
            } else {
                return '[' + input.map(_inspect).join(', ') + ']';
            }
        } else {
            return 'Array';
        }
    } else {
        var keys = Object.keys(input);

        if (!keys.length) {
            if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
                return input.constructor.name;
            } else {
                return 'Object';
            }
        }

        var entries = keys.map(_ref2).join('\n  ');

        if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
            return input.constructor.name + ' {\n  ' + entries + '\n}';
        } else {
            return '{ ' + entries + '\n}';
        }
    }
}

module.exports = exports['default'];