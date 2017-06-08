"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stiva = function () {
    function Stiva() {
        var stores = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

        _classCallCheck(this, Stiva);

        this.stores = stores;
        this.context = context;
    }

    _createClass(Stiva, [{
        key: "update",
        value: function update(type, store) {
            var newStore = store(this.stores[type]);
            this.stores[type] = newStore;
            this.dispatch(type);
        }
    }, {
        key: "dispatch",
        value: function dispatch(type) {
            this.context.dispatchEvent(new CustomEvent("stiva-" + type, {
                detail: this.stores[type],
                bubbles: true,
                cancelable: false
            }));
        }
    }, {
        key: "dispatchAll",
        value: function dispatchAll() {
            for (var store in this.stores) {
                if (this.stores.hasOwnProperty(store)) {
                    this.dispatch(store);
                }
            }
        }
    }]);

    return Stiva;
}();

;
new Stiva();
