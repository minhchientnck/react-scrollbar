"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SCROLL_DIRECTION = {
  VERTICAL: 'Vertical',
  HORIZONTAL: 'Horizontal'
};
var _document = document;
var _window = window;

var ScrollBar = /*#__PURE__*/function (_Component) {
  _inherits(ScrollBar, _Component);

  var _super = _createSuper(ScrollBar);

  function ScrollBar(props) {
    var _this;

    _classCallCheck(this, ScrollBar);

    _this = _super.call(this, props);
    _this.state = {
      thumbVertical: {
        height: 0,
        top: 0
      },
      thumbHorizontal: {
        width: 0,
        left: 0
      },
      isScrollVertical: false,
      isScrolHorizontal: false,
      currentTopOfThumb: 0,
      currentleftOfThumb: 0,
      currentClientX: 0,
      currentClientY: 0,
      isActiveVerticalScroll: false,
      isActiveHorizontalScroll: false
    };
    _this.scrollContainer = _react.default.createRef(); // scroll

    _this.onLoad();

    _this.onResize();

    _this.onDocumentMouseMove();

    _this.onDocumentMouseUp(); // binding


    _this.onScroll = _this.onScroll.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    return _this;
  } //init


  _createClass(ScrollBar, [{
    key: "initScrollBar",
    value: function initScrollBar(context) {
      if (context) {
        var _this$scrollContainer = this.scrollContainer.current,
            clientHeight = _this$scrollContainer.clientHeight,
            clientWidth = _this$scrollContainer.clientWidth,
            scrollHeight = _this$scrollContainer.scrollHeight,
            scrollWidth = _this$scrollContainer.scrollWidth;
        this.setState({
          thumbVertical: {
            height: clientHeight / (scrollHeight / clientHeight),
            top: this.scrollContainer.current.scrollTop / scrollHeight * 100 + '%'
          },
          thumbHorizontal: {
            width: clientWidth / (scrollWidth / clientWidth),
            left: this.scrollContainer.current.scrollLeft / scrollWidth * 100 + '%'
          },
          isActiveVerticalScroll: scrollHeight > clientHeight,
          isActiveHorizontalScroll: scrollWidth > clientWidth
        });
      }
    } //onload

  }, {
    key: "onLoad",
    value: function onLoad() {
      var _this2 = this;

      _document.addEventListener('DOMContentLoaded', function (e) {
        _this2.initScrollBar(_this2.scrollContainer.current);
      });
    } //onresize

  }, {
    key: "onResize",
    value: function onResize() {
      var _this3 = this;

      _window.addEventListener('resize', function () {
        _this3.initScrollBar(_this3.scrollContainer.current);
      });
    } //onmousemove

  }, {
    key: "onDocumentMouseMove",
    value: function onDocumentMouseMove() {
      var _this4 = this;

      _document.addEventListener('mousemove', function (e) {
        if (_this4.scrollContainer.current) {
          var _this4$scrollContaine = _this4.scrollContainer.current,
              scrollHeight = _this4$scrollContaine.scrollHeight,
              clientHeight = _this4$scrollContaine.clientHeight,
              scrollWidth = _this4$scrollContaine.scrollWidth,
              clientWidth = _this4$scrollContaine.clientWidth;
          var _this4$state = _this4.state,
              currentTopOfThumb = _this4$state.currentTopOfThumb,
              currentClientY = _this4$state.currentClientY,
              currentleftOfThumb = _this4$state.currentleftOfThumb,
              currentClientX = _this4$state.currentClientX,
              isScrollVertical = _this4$state.isScrollVertical,
              isScrolHorizontal = _this4$state.isScrolHorizontal;

          if (isScrollVertical || isScrolHorizontal) {
            _document.body.style.userSelect = 'none';
            _document.body.style.webkitUserSelect = 'none';
            _document.body.style.mozUserSelect = 'none';
            _document.body.style.msUserSelect = 'none';
          }

          if (isScrollVertical) {
            var ratioHeightScroll = scrollHeight / clientHeight;
            var scrollTop = Math.round((currentTopOfThumb + (e.clientY - currentClientY)) * ratioHeightScroll);
            _this4.scrollContainer.current.scrollTop = scrollTop;
          } else if (isScrolHorizontal) {
            var ratioWidthScroll = scrollWidth / clientWidth;
            var scrollLeft = Math.round((currentleftOfThumb + (e.clientX - currentClientX)) * ratioWidthScroll);
            _this4.scrollContainer.current.scrollLeft = scrollLeft;
          }
        }
      });
    } //onmouseup

  }, {
    key: "onDocumentMouseUp",
    value: function onDocumentMouseUp() {
      var _this5 = this;

      _document.addEventListener('mouseup', function (e) {
        if (_this5.scrollContainer.current) {
          _document.body.removeAttribute('style');
        }

        _this5.setState({
          isScrollVertical: false,
          isScrolHorizontal: false
        });
      });
    } //onscroll

  }, {
    key: "onScroll",
    value: function onScroll(e) {
      var scrollHeight = e.target.scrollHeight;
      var clientHeight = e.target.clientHeight;
      var scrollWidth = e.target.scrollWidth;
      var clientWidth = e.target.clientWidth;
      this.setState({
        thumbVertical: {
          height: clientHeight / (scrollHeight / clientHeight),
          top: e.target.scrollTop / scrollHeight * 100 + '%'
        },
        thumbHorizontal: {
          width: clientWidth / (scrollWidth / clientWidth),
          left: e.target.scrollLeft / scrollWidth * 100 + '%'
        }
      });
    } //onmousedown

  }, {
    key: "onMouseDown",
    value: function onMouseDown(e, type) {
      if (type === SCROLL_DIRECTION.VERTICAL) {
        this.setState({
          isScrollVertical: true,
          currentClientY: e.clientY,
          currentTopOfThumb: e.target.offsetTop
        });
      } else if (type === SCROLL_DIRECTION.HORIZONTAL) {
        this.setState({
          isScrolHorizontal: true,
          currentClientX: e.clientX,
          currentleftOfThumb: e.target.offsetLeft
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$state = this.state,
          isActiveVerticalScroll = _this$state.isActiveVerticalScroll,
          isActiveHorizontalScroll = _this$state.isActiveHorizontalScroll;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "scroll-bar-container ".concat(this.props.className).trim()
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "scroll-content",
        onScroll: this.onScroll,
        ref: this.scrollContainer
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "content"
      }, this.props.children)), isActiveVerticalScroll ? /*#__PURE__*/_react.default.createElement("div", {
        className: "vertical-scroll"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "track"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          height: this.state.thumbVertical.height,
          top: this.state.thumbVertical.top
        },
        className: "thumb",
        onMouseDown: function onMouseDown(e) {
          return _this6.onMouseDown(e, SCROLL_DIRECTION.VERTICAL);
        }
      }))) : null, isActiveHorizontalScroll ? /*#__PURE__*/_react.default.createElement("div", {
        className: "horizontal-scroll"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "track"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: this.state.thumbHorizontal.width,
          left: this.state.thumbHorizontal.left
        },
        className: "thumb",
        onMouseDown: function onMouseDown(e) {
          return _this6.onMouseDown(e, SCROLL_DIRECTION.HORIZONTAL);
        }
      }))) : null);
    }
  }]);

  return ScrollBar;
}(_react.Component);

ScrollBar.propType = {
  children: _propTypes.default.shape({}),
  className: _propTypes.default.string
};
ScrollBar.defaultProps = {
  children: null,
  className: ''
};
var _default = ScrollBar;
exports.default = _default;