'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Prompt = function () {
    function Prompt() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var keywords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var results = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var requirements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

        _classCallCheck(this, Prompt);

        this.name = name;
        // Keywords that can trigger the prompt (make all lower-case by default)
        this.keywords = keywords.map(function (v) {
            return v.toLowerCase();
        });
        // Results that occur when this prompt is successfully triggered;
        // the result keys comprise of “successText” (required), "failText" (optional),
        // “itemsRequired” (optional), and “roomToEnter” (optional)
        this.results = results;
        // Any prerequisite items needed to do the prompt?
        this.requirements = requirements;
    }

    _createClass(Prompt, [{
        key: 'matchKeywords',
        value: function matchKeywords(message) {
            var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var foundKeyword = false;
            var missingRequirements = []; // If we have any item requirements

            if (this.requirements.length > 0) {
                // Check all the requirements against the items passed
                this.requirements.forEach(function (requirement) {
                    var foundRequirement = false;
                    items.forEach(function (item) {
                        if (item === requirement) {
                            foundRequirement = true;
                        }
                    }); // If a requirement isn't found add that a list

                    if (!foundRequirement) {
                        missingRequirements.push(requirement);
                    }
                });
            } // Once we check to see if the player's missing any items,
            // parse the input for matching keywords to the prompt


            this.keywords.forEach(function (keyword) {
                if (message.includes(keyword.toLowerCase())) {
                    foundKeyword = true;
                }
            }); // If any keywords have been matched from the user input

            if (foundKeyword) {
                // If there are any missing item requirements
                if (missingRequirements.length > 0) {
                    // Prompt fails; return missing items and failText
                    return {
                        'fail': {
                            'missing': missingRequirements,
                            'failText': this.results.failText
                        }
                    };
                } // Prompt succeeds; return results of the prompt


                return {
                    'success': this.results
                };
            }

            return null;
        }
    }]);

    return Prompt;
}();

exports.default = Prompt;