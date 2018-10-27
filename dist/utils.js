'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcFocusDate = calcFocusDate;
exports.findNextRangeIndex = findNextRangeIndex;
exports.getMonthDisplayRange = getMonthDisplayRange;
exports.generateStyles = generateStyles;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _end_of_week = require('date-fns/end_of_week');

var _end_of_week2 = _interopRequireDefault(_end_of_week);

var _start_of_week = require('date-fns/start_of_week');

var _start_of_week2 = _interopRequireDefault(_start_of_week);

var _end_of_month = require('date-fns/end_of_month');

var _end_of_month2 = _interopRequireDefault(_end_of_month);

var _start_of_month = require('date-fns/start_of_month');

var _start_of_month2 = _interopRequireDefault(_start_of_month);

var _are_ranges_overlapping = require('date-fns/are_ranges_overlapping');

var _are_ranges_overlapping2 = _interopRequireDefault(_are_ranges_overlapping);

var _add_months = require('date-fns/add_months');

var _add_months2 = _interopRequireDefault(_add_months);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calcFocusDate(currentFocusedDate, props) {
  var shownDate = props.shownDate,
      date = props.date,
      months = props.months,
      ranges = props.ranges,
      focusedRange = props.focusedRange,
      displayMode = props.displayMode;
  // find primary date according the props

  var targetInterval = void 0;
  if (displayMode === 'dateRange') {
    var range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate
    };
  } else {
    targetInterval = {
      start: date,
      end: date
    };
  }
  targetInterval.start = (0, _start_of_month2.default)(targetInterval.start || new Date());
  targetInterval.end = (0, _end_of_month2.default)(targetInterval.end || targetInterval.start);
  var targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();

  // initial focus
  if (!currentFocusedDate) return shownDate || targetDate;

  // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;
  var currentFocusInterval = {
    start: (0, _start_of_month2.default)(currentFocusedDate),
    end: (0, _end_of_month2.default)((0, _add_months2.default)(currentFocusedDate, months - 1))
  };
  if ((0, _are_ranges_overlapping2.default)(targetInterval.start, targetInterval.end, currentFocusInterval.start, currentFocusInterval.end)) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }
  return targetDate;
}

function findNextRangeIndex(ranges) {
  var currentRangeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

  var nextIndex = ranges.findIndex(function (range, i) {
    return i > currentRangeIndex && range.autoFocus !== false && !range.disabled;
  });
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(function (range) {
    return range.autoFocus !== false && !range.disabled;
  });
}

function getMonthDisplayRange(date, dateOptions) {
  var startDateOfMonth = (0, _start_of_month2.default)(date, dateOptions);
  var endDateOfMonth = (0, _end_of_month2.default)(date, dateOptions);
  var startDateOfCalendar = (0, _start_of_week2.default)(startDateOfMonth, dateOptions);
  var endDateOfCalendar = (0, _end_of_week2.default)(endDateOfMonth, dateOptions);
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth: startDateOfMonth,
    endDateOfMonth: endDateOfMonth
  };
}

function generateStyles(sources) {
  if (!sources.length) return {};
  var generatedStyles = sources.filter(function (source) {
    return Boolean(source);
  }).reduce(function (styles, styleSource) {
    Object.keys(styleSource).forEach(function (key) {
      styles[key] = (0, _classnames2.default)(styles[key], styleSource[key]);
    });
    return styles;
  }, {});
  return generatedStyles;
}