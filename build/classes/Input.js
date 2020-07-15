'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = exports.Input = function () {
    function Input() {
        var disabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var elementId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'input';

        _classCallCheck(this, Input);

        this.disabled = disabled;
        this.value = value;
        this.elementId = elementId;
    }

    _createClass(Input, [{
        key: 'enable',
        value: function enable() {
            this.disabled = false;
            document.getElementById('input').disabled = false;
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.disabled = true;
            document.getElementById('input').disabled = true;
        }
    }, {
        key: 'send',
        value: function send(value) {
            // Normalize input values (if desired)
            value = value.toLowerCase();
            this.value = value;
        }
    }]);

    return Input;
}();