'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DayCell = require('./DayCell.js');

var _Month = require('./Month.js');

var _Month2 = _interopRequireDefault(_Month);

var _utils = require('../utils');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _max = require('date-fns/max');

var _max2 = _interopRequireDefault(_max);

var _min = require('date-fns/min');

var _min2 = _interopRequireDefault(_min);

var _difference_in_days = require('date-fns/difference_in_days');

var _difference_in_days2 = _interopRequireDefault(_difference_in_days);

var _is_same_month = require('date-fns/is_same_month');

var _is_same_month2 = _interopRequireDefault(_is_same_month);

var _add_days = require('date-fns/add_days');

var _add_days2 = _interopRequireDefault(_add_days);

var _end_of_month = require('date-fns/end_of_month');

var _end_of_month2 = _interopRequireDefault(_end_of_month);

var _start_of_month = require('date-fns/start_of_month');

var _start_of_month2 = _interopRequireDefault(_start_of_month);

var _difference_in_calendar_months = require('date-fns/difference_in_calendar_months');

var _difference_in_calendar_months2 = _interopRequireDefault(_difference_in_calendar_months);

var _set_month = require('date-fns/set_month');

var _set_month2 = _interopRequireDefault(_set_month);

var _set_year = require('date-fns/set_year');

var _set_year2 = _interopRequireDefault(_set_year);

var _add_years = require('date-fns/add_years');

var _add_years2 = _interopRequireDefault(_add_years);

var _is_same_day = require('date-fns/is_same_day');

var _is_same_day2 = _interopRequireDefault(_is_same_day);

var _end_of_week = require('date-fns/end_of_week');

var _end_of_week2 = _interopRequireDefault(_end_of_week);

var _start_of_week = require('date-fns/start_of_week');

var _start_of_week2 = _interopRequireDefault(_start_of_week);

var _each_day = require('date-fns/each_day');

var _each_day2 = _interopRequireDefault(_each_day);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

var _add_months = require('date-fns/add_months');

var _add_months2 = _interopRequireDefault(_add_months);

var _en = require('date-fns/locale/en');

var _en2 = _interopRequireDefault(_en);

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_PureComponent) {
  _inherits(Calendar, _PureComponent);

  function Calendar(props, context) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props, context));

    _this.changeShownDate = _this.changeShownDate.bind(_this);
    _this.focusToDate = _this.focusToDate.bind(_this);
    _this.updateShownDate = _this.updateShownDate.bind(_this);
    _this.handleRangeFocusChange = _this.handleRangeFocusChange.bind(_this);
    _this.renderDateDisplay = _this.renderDateDisplay.bind(_this);
    _this.onDragSelectionStart = _this.onDragSelectionStart.bind(_this);
    _this.onDragSelectionEnd = _this.onDragSelectionEnd.bind(_this);
    _this.onDragSelectionMove = _this.onDragSelectionMove.bind(_this);
    _this.renderMonthAndYear = _this.renderMonthAndYear.bind(_this);
    _this.updatePreview = _this.updatePreview.bind(_this);
    _this.estimateMonthSize = _this.estimateMonthSize.bind(_this);
    _this.dateOptions = { locale: props.locale };
    _this.styles = (0, _utils.generateStyles)([_styles2.default, props.classNames]);
    _this.listSizeCache = {};
    _this.state = {
      focusedDate: (0, _utils.calcFocusDate)(null, props),
      drag: {
        status: false,
        range: { startDate: null, endDate: null },
        disablePreview: false
      },
      scrollArea: _this.calcScrollArea(props)
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'calcScrollArea',
    value: function calcScrollArea(props) {
      var direction = props.direction,
          months = props.months,
          scroll = props.scroll;

      if (!scroll.enabled) return { enabled: false };

      var longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;
      if (direction === 'vertical') {
        return {
          enabled: true,
          monthHeight: scroll.monthHeight || 220,
          longMonthHeight: longMonthHeight || 260,
          calendarWidth: 'auto',
          calendarHeight: (scroll.calendarHeight || longMonthHeight || 240) * months
        };
      }
      return {
        enabled: true,
        monthWidth: scroll.monthWidth || 332,
        calendarWidth: (scroll.calendarWidth || scroll.monthWidth || 332) * months,
        monthHeight: longMonthHeight || 300,
        calendarHeight: longMonthHeight || 300
      };
    }
  }, {
    key: 'focusToDate',
    value: function focusToDate(date) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
      var preventUnnecessary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!props.scroll.enabled) {
        this.setState({ focusedDate: date });
        return;
      }
      var targetMonthIndex = (0, _difference_in_calendar_months2.default)(date, props.minDate, this.dateOptions);
      var visibleMonths = this.list.getVisibleRange();
      if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
      this.list.scrollTo(targetMonthIndex);
      this.setState({ focusedDate: date });
    }
  }, {
    key: 'updateShownDate',
    value: function updateShownDate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var newProps = props.scroll.enabled ? _extends({}, props, {
        months: this.list.getVisibleRange().length
      }) : props;
      var newFocus = (0, _utils.calcFocusDate)(this.state.focusedDate, newProps);
      this.focusToDate(newFocus, newProps);
    }
  }, {
    key: 'updatePreview',
    value: function updatePreview(val) {
      if (!val) {
        this.setState({ preview: null });
        return;
      }
      var preview = {
        startDate: val,
        endDate: val,
        color: this.props.color
      };
      this.setState({ preview: preview });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.scroll.enabled) {
        // prevent react-list's initial render focus problem
        setTimeout(this.updateShownDate, 1);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var propMapper = {
        dateRange: 'ranges',
        date: 'date'
      };
      var targetProp = propMapper[nextProps.displayMode];
      if (this.props.locale !== nextProps.locale) {
        this.dateOptions = { locale: nextProps.locale };
      }
      if (JSON.stringify(this.props.scroll) !== JSON.stringify(nextProps.scroll)) {
        this.setState({ scrollArea: this.calcScrollArea(nextProps) });
      }
      if (nextProps[targetProp] !== this.props[targetProp]) {
        this.updateShownDate(nextProps);
      }
    }
  }, {
    key: 'changeShownDate',
    value: function changeShownDate(value) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set';

      var focusedDate = this.state.focusedDate;
      var modeMapper = {
        monthOffset: function monthOffset() {
          return (0, _add_months2.default)(focusedDate, value);
        },
        setMonth: function setMonth() {
          return (0, _set_month2.default)(focusedDate, value);
        },
        setYear: function setYear() {
          return (0, _set_year2.default)(focusedDate, value);
        },
        set: function set() {
          return value;
        }
      };
      var newDate = (0, _min2.default)((0, _max2.default)(modeMapper[mode](), this.props.minDate), this.props.maxDate);
      this.focusToDate(newDate, this.props, false);
    }
  }, {
    key: 'handleRangeFocusChange',
    value: function handleRangeFocusChange(rangesIndex, rangeItemIndex) {
      this.props.onRangeFocusChange && this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
    }
  }, {
    key: 'getMonths',
    value: function getMonths(locale) {
      return Array.from({ length: 12 }, function (v, k) {
        return k;
      }).map(function (i) {
        return locale.format.formatters.MMMM(new Date(2020, i, 1));
      });
    }
  }, {
    key: 'renderMonthAndYear',
    value: function renderMonthAndYear(focusedDate, changeShownDate, props) {
      var showMonthArrow = props.showMonthArrow,
          locale = props.locale,
          minDate = props.minDate,
          maxDate = props.maxDate;

      var upperYearLimit = maxDate.getFullYear();
      var lowerYearLimit = minDate.getFullYear();
      var styles = this.styles;
      return _react2.default.createElement(
        'div',
        { className: styles.monthAndYearWrapper },
        showMonthArrow ? _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: (0, _classnames4.default)(styles.nextPrevButton, styles.prevButton),
            onClick: function onClick() {
              return changeShownDate(-1, 'monthOffset');
            } },
          _react2.default.createElement('i', null)
        ) : null,
        _react2.default.createElement(
          'span',
          { className: styles.monthAndYearPickers },
          _react2.default.createElement(
            'span',
            { className: styles.monthPicker },
            _react2.default.createElement(
              'select',
              {
                value: focusedDate.getMonth(),
                onChange: function onChange(e) {
                  return changeShownDate(e.target.value, 'setMonth');
                } },
              this.getMonths(locale).map(function (month, i) {
                return _react2.default.createElement(
                  'option',
                  { key: i, value: i },
                  month
                );
              })
            )
          ),
          _react2.default.createElement('span', { className: styles.monthAndYearDivider }),
          _react2.default.createElement(
            'span',
            { className: styles.yearPicker },
            _react2.default.createElement(
              'select',
              {
                value: focusedDate.getFullYear(),
                onChange: function onChange(e) {
                  return changeShownDate(e.target.value, 'setYear');
                } },
              new Array(upperYearLimit - lowerYearLimit + 1).fill(upperYearLimit).map(function (val, i) {
                var year = val - i;
                return _react2.default.createElement(
                  'option',
                  { key: year, value: year },
                  year
                );
              })
            )
          )
        ),
        showMonthArrow ? _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: (0, _classnames4.default)(styles.nextPrevButton, styles.nextButton),
            onClick: function onClick() {
              return changeShownDate(+1, 'monthOffset');
            } },
          _react2.default.createElement('i', null)
        ) : null
      );
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays() {
      var _this2 = this;

      var now = new Date();
      return _react2.default.createElement(
        'div',
        { className: this.styles.weekDays },
        (0, _each_day2.default)((0, _start_of_week2.default)(now, this.dateOptions), (0, _end_of_week2.default)(now, this.dateOptions)).map(function (day, i) {
          return _react2.default.createElement(
            'span',
            { className: _this2.styles.weekDay, key: i },
            (0, _format2.default)(day, 'ddd', _this2.dateOptions)
          );
        })
      );
    }
  }, {
    key: 'renderDateDisplay',
    value: function renderDateDisplay() {
      var _this3 = this;

      var _props = this.props,
          focusedRange = _props.focusedRange,
          color = _props.color,
          ranges = _props.ranges,
          rangeColors = _props.rangeColors;

      var defaultColor = rangeColors[focusedRange[0]] || color;
      var styles = this.styles;
      return _react2.default.createElement(
        'div',
        { className: styles.dateDisplayWrapper },
        ranges.map(function (range, i) {
          if (range.showDateDisplay === false || range.disabled && !range.showDateDisplay) return null;
          return _react2.default.createElement(
            'div',
            {
              className: styles.dateDisplay,
              key: i,
              style: { color: range.color || defaultColor } },
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames4.default)(styles.dateDisplayItem, _defineProperty({}, styles.dateDisplayItemActive, focusedRange[0] === i && focusedRange[1] === 0)),
                onFocus: function onFocus() {
                  return _this3.handleRangeFocusChange(i, 0);
                } },
              _react2.default.createElement('input', {
                disabled: range.disabled,
                readOnly: true,
                value: _this3.formatDateDisplay(range.startDate, 'Early')
              })
            ),
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames4.default)(styles.dateDisplayItem, _defineProperty({}, styles.dateDisplayItemActive, focusedRange[0] === i && focusedRange[1] === 1)),
                onFocus: function onFocus() {
                  return _this3.handleRangeFocusChange(i, 1);
                } },
              _react2.default.createElement('input', {
                disabled: range.disabled,
                readOnly: true,
                value: _this3.formatDateDisplay(range.endDate, 'Continuous')
              })
            )
          );
        })
      );
    }
  }, {
    key: 'onDragSelectionStart',
    value: function onDragSelectionStart(date) {
      this.setState({
        drag: {
          status: true,
          range: { startDate: date, endDate: date },
          disablePreview: true
        }
      });
    }
  }, {
    key: 'onDragSelectionEnd',
    value: function onDragSelectionEnd(date) {
      var _props2 = this.props,
          updateRange = _props2.updateRange,
          displayMode = _props2.displayMode,
          onChange = _props2.onChange;

      if (displayMode === 'date' || !this.state.drag.status) {
        onChange && onChange(date);
        return;
      }
      var newRange = {
        startDate: this.state.drag.range.startDate,
        endDate: date
      };
      if (displayMode !== 'dateRange' || (0, _is_same_day2.default)(newRange.startDate, date)) {
        this.setState({ drag: { status: false, range: {} } }, function () {
          return onChange && onChange(date);
        });
      } else {
        this.setState({ drag: { status: false, range: {} } }, function () {
          updateRange && updateRange(newRange);
        });
      }
    }
  }, {
    key: 'onDragSelectionMove',
    value: function onDragSelectionMove(date) {
      var drag = this.state.drag;

      if (!drag.status) return;
      this.setState({
        drag: {
          status: drag.status,
          range: { startDate: drag.range.startDate, endDate: date },
          disablePreview: true
        }
      });
    }
  }, {
    key: 'estimateMonthSize',
    value: function estimateMonthSize(index, cache) {
      var _props3 = this.props,
          direction = _props3.direction,
          minDate = _props3.minDate;
      var scrollArea = this.state.scrollArea;

      if (cache) {
        this.listSizeCache = cache;
        if (cache[index]) return cache[index];
      }
      if (direction === 'horizontal') return scrollArea.monthWidth;
      var monthStep = (0, _add_months2.default)(minDate, index);

      var _getMonthDisplayRange = (0, _utils.getMonthDisplayRange)(monthStep, this.dateOptions),
          start = _getMonthDisplayRange.start,
          end = _getMonthDisplayRange.end;

      var isLongMonth = (0, _difference_in_days2.default)(end, start, this.dateOptions) + 1 > 7 * 5;
      return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
    }
  }, {
    key: 'formatDateDisplay',
    value: function formatDateDisplay(date, defaultText) {
      if (!date) return defaultText;
      return (0, _format2.default)(date, this.props.dateDisplayFormat, this.dateOptions);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props4 = this.props,
          showDateDisplay = _props4.showDateDisplay,
          onPreviewChange = _props4.onPreviewChange,
          scroll = _props4.scroll,
          direction = _props4.direction,
          maxDate = _props4.maxDate,
          minDate = _props4.minDate,
          rangeColors = _props4.rangeColors,
          color = _props4.color;
      var _state = this.state,
          scrollArea = _state.scrollArea,
          focusedDate = _state.focusedDate;

      var isVertical = direction === 'vertical';
      var navigatorRenderer = this.props.navigatorRenderer || this.renderMonthAndYear;

      var ranges = this.props.ranges.map(function (range, i) {
        return _extends({}, range, {
          color: range.color || rangeColors[i] || color
        });
      });
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames4.default)(this.styles.calendarWrapper, this.props.className),
          onMouseUp: function onMouseUp() {
            return _this4.setState({ drag: { status: false, range: {} } });
          },
          onMouseLeave: function onMouseLeave() {
            _this4.setState({ drag: { status: false, range: {} } });
          } },
        showDateDisplay && this.renderDateDisplay(),
        navigatorRenderer(focusedDate, this.changeShownDate, this.props),
        scroll.enabled ? _react2.default.createElement(
          'div',
          null,
          isVertical && this.renderWeekdays(this.dateOptions),
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames4.default)(this.styles.infiniteMonths, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal),
              onMouseLeave: function onMouseLeave() {
                return onPreviewChange && onPreviewChange();
              },
              style: {
                width: scrollArea.calendarWidth + 11,
                height: scrollArea.calendarHeight + 11
              },
              onScroll: function onScroll() {
                var visibleMonths = _this4.list.getVisibleRange();
                // prevent scroll jump with wrong visible value
                if (visibleMonths[0] === undefined) return;
                var visibleMonth = (0, _add_months2.default)(minDate, visibleMonths[0] || 0);
                var isFocusedToDifferent = !(0, _is_same_month2.default)(visibleMonth, focusedDate);
                if (isFocusedToDifferent) _this4.setState({ focusedDate: visibleMonth });
              } },
            _react2.default.createElement(_reactList2.default, {
              length: (0, _difference_in_calendar_months2.default)((0, _end_of_month2.default)(maxDate), (0, _add_days2.default)((0, _start_of_month2.default)(minDate), -1), this.dateOptions),
              treshold: 500,
              type: 'variable',
              ref: function ref(target) {
                return _this4.list = target;
              },
              itemSizeEstimator: this.estimateMonthSize,
              axis: isVertical ? 'y' : 'x',
              itemRenderer: function itemRenderer(index, key) {
                var monthStep = (0, _add_months2.default)(minDate, index);
                return _react2.default.createElement(_Month2.default, _extends({}, _this4.props, {
                  onPreviewChange: _this4.props.onPreviewChange || _this4.updatePreview,
                  preview: _this4.props.preview || _this4.state.preview,
                  ranges: ranges,
                  key: key,
                  drag: _this4.state.drag,
                  dateOptions: _this4.dateOptions,
                  month: monthStep,
                  onDragSelectionStart: _this4.onDragSelectionStart,
                  onDragSelectionEnd: _this4.onDragSelectionEnd,
                  onDragSelectionMove: _this4.onDragSelectionMove,
                  onMouseLeave: function onMouseLeave() {
                    return onPreviewChange && onPreviewChange();
                  },
                  styles: _this4.styles,
                  style: isVertical ? { height: _this4.estimateMonthSize(index) } : { height: scrollArea.monthHeight, width: _this4.estimateMonthSize(index) },
                  showMonthName: true,
                  showWeekDays: !isVertical
                }));
              }
            })
          )
        ) : _react2.default.createElement(
          'div',
          {
            className: (0, _classnames4.default)(this.styles.months, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal) },
          new Array(this.props.months).fill(null).map(function (_, i) {
            var monthStep = (0, _add_months2.default)(_this4.state.focusedDate, i);
            return _react2.default.createElement(_Month2.default, _extends({}, _this4.props, {
              onPreviewChange: _this4.props.onPreviewChange || _this4.updatePreview,
              preview: _this4.props.preview || _this4.state.preview,
              ranges: ranges,
              key: i,
              drag: _this4.state.drag,
              dateOptions: _this4.dateOptions,
              month: monthStep,
              onDragSelectionStart: _this4.onDragSelectionStart,
              onDragSelectionEnd: _this4.onDragSelectionEnd,
              onDragSelectionMove: _this4.onDragSelectionMove,
              onMouseLeave: function onMouseLeave() {
                return onPreviewChange && onPreviewChange();
              },
              styles: _this4.styles,
              showWeekDays: !isVertical || i === 0,
              showMonthName: !isVertical || i > 0
            }));
          })
        )
      );
    }
  }]);

  return Calendar;
}(_react.PureComponent);

Calendar.defaultProps = {
  showMonthArrow: true,
  classNames: {},
  locale: _en2.default,
  ranges: [],
  focusedRange: [0, 0],
  dateDisplayFormat: 'MMM D, YYYY',
  monthDisplayFormat: 'MMM YYYY',
  showDateDisplay: true,
  showSelectionPreview: true,
  displayMode: 'date',
  months: 1,
  color: '#3d91ff',
  scroll: {
    enabled: false
  },
  direction: 'vertical',
  maxDate: (0, _add_years2.default)(new Date(), 20),
  minDate: (0, _add_years2.default)(new Date(), -100),
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c']
};

Calendar.propTypes = {
  showMonthArrow: _propTypes2.default.bool,
  minDate: _propTypes2.default.object,
  maxDate: _propTypes2.default.object,
  date: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  onPreviewChange: _propTypes2.default.func,
  onRangeFocusChange: _propTypes2.default.func,
  classNames: _propTypes2.default.object,
  locale: _propTypes2.default.object,
  shownDate: _propTypes2.default.object,
  ranges: _propTypes2.default.arrayOf(_DayCell.rangeShape),
  preview: _propTypes2.default.shape({
    startDate: _propTypes2.default.object,
    endDate: _propTypes2.default.object
  }),
  previewColor: _propTypes2.default.string,
  dateDisplayFormat: _propTypes2.default.string,
  monthDisplayFormat: _propTypes2.default.string,
  focusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  months: _propTypes2.default.number,
  className: _propTypes2.default.string,
  showDateDisplay: _propTypes2.default.bool,
  showSelectionPreview: _propTypes2.default.bool,
  displayMode: _propTypes2.default.oneOf(['dateRange', 'date']),
  color: _propTypes2.default.string,
  updateRange: _propTypes2.default.func,
  scroll: _propTypes2.default.shape({
    enabled: _propTypes2.default.bool,
    monthHeight: _propTypes2.default.number,
    longMonthHeight: _propTypes2.default.number,
    monthWidth: _propTypes2.default.number,
    calendarWidth: _propTypes2.default.number,
    calendarHeight: _propTypes2.default.number
  }),
  direction: _propTypes2.default.oneOf(['vertical', 'horizontal']),
  navigatorRenderer: _propTypes2.default.func,
  rangeColors: _propTypes2.default.arrayOf(_propTypes2.default.string)
};

exports.default = Calendar;