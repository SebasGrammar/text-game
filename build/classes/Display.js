'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Display = function () {
    function Display() {
        var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var elementId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'display';

        _classCallCheck(this, Display);

        this.html = html;
        this.elementId = elementId;
    }

    _createClass(Display, [{
        key: 'show',
        value: function show() {
            var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (html === null) {
                document.getElementById(this.elementId).innerHTML = this.html;
            } else {
                document.getElementById(this.elementId).innerHTML = html;
                this.html = html;
            }
        }

        // Append HTML content to display screen

    }, {
        key: 'append',
        value: function append(html) {
            document.getElementById(this.elementId).innerHTML += html;
        }
    }]);

    return Display;
}();

exports.default = Display;