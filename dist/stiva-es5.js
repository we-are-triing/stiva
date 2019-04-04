"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stiva = function () {
  function Stiva() {
    var stores = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Stiva);

    this.stores = stores;
    this.context = new EventTarget();
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
        detail: this.stores[type]
      }));
    }
  }, {
    key: "dispatchAll",
    value: function dispatchAll() {
      var _this = this;

      Object.keys(this.stores).forEach(function (store) {
        return _this.dispatch(store);
      });
    }
  }, {
    key: "listen",
    value: function listen(type, handler) {
      var h = function h(_ref) {
        var detail = _ref.detail;
        return handler(detail);
      };
      this.context.addEventListener("stiva-" + type, h);
      return h;
    }
  }, {
    key: "detach",
    value: function detach(type, listener) {
      this.context.removeEventListener("stiva-" + type, listener);
    }
  }]);

  return Stiva;
}();
