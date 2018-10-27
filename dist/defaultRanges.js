'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultInputRanges = exports.defaultStaticRanges = undefined;
exports.createStaticRanges = createStaticRanges;

var _difference_in_calendar_days = require('date-fns/difference_in_calendar_days');

var _difference_in_calendar_days2 = _interopRequireDefault(_difference_in_calendar_days);

var _is_same_day = require('date-fns/is_same_day');

var _is_same_day2 = _interopRequireDefault(_is_same_day);

var _end_of_week = require('date-fns/end_of_week');

var _end_of_week2 = _interopRequireDefault(_end_of_week);

var _start_of_week = require('date-fns/start_of_week');

var _start_of_week2 = _interopRequireDefault(_start_of_week);

var _add_months = require('date-fns/add_months');

var _add_months2 = _interopRequireDefault(_add_months);

var _end_of_month = require('date-fns/end_of_month');

var _end_of_month2 = _interopRequireDefault(_end_of_month);

var _start_of_month = require('date-fns/start_of_month');

var _start_of_month2 = _interopRequireDefault(_start_of_month);

var _start_of_day = require('date-fns/start_of_day');

var _start_of_day2 = _interopRequireDefault(_start_of_day);

var _end_of_day = require('date-fns/end_of_day');

var _end_of_day2 = _interopRequireDefault(_end_of_day);

var _add_days = require('date-fns/add_days');

var _add_days2 = _interopRequireDefault(_add_days);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defineds = {
  startOfWeek: (0, _start_of_week2.default)(new Date()),
  endOfWeek: (0, _end_of_week2.default)(new Date()),
  startOfLastWeek: (0, _start_of_week2.default)((0, _add_days2.default)(new Date(), -7)),
  endOfLastWeek: (0, _end_of_week2.default)((0, _add_days2.default)(new Date(), -7)),
  startOfToday: (0, _start_of_day2.default)(new Date()),
  endOfToday: (0, _end_of_day2.default)(new Date()),
  startOfYesterday: (0, _start_of_day2.default)((0, _add_days2.default)(new Date(), -1)),
  endOfYesterday: (0, _end_of_day2.default)((0, _add_days2.default)(new Date(), -1)),
  startOfMonth: (0, _start_of_month2.default)(new Date()),
  endOfMonth: (0, _end_of_month2.default)(new Date()),
  startOfLastMonth: (0, _start_of_month2.default)((0, _add_months2.default)(new Date(), -1)),
  endOfLastMonth: (0, _end_of_month2.default)((0, _add_months2.default)(new Date(), -1))
};

var staticRangeHandler = {
  get: function get(obj, prop) {
    var checkIsSelected = function checkIsSelected(range) {
      var definedRange = obj.range();
      return (0, _is_same_day2.default)(range.startDate, definedRange.startDate) && (0, _is_same_day2.default)(range.endDate, definedRange.endDate);
    };
    switch (prop) {
      case 'isSelected':
        return obj[prop] || checkIsSelected;
      default:
        return obj[prop];
    }
  }
};

function createStaticRanges(ranges) {
  return ranges.map(function (range) {
    return new Proxy(range, staticRangeHandler);
  });
}

var defaultStaticRanges = exports.defaultStaticRanges = createStaticRanges([{
  label: 'Today',
  range: function range() {
    return {
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday
    };
  }
}, {
  label: 'Yesterday',
  range: function range() {
    return {
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday
    };
  }
}, {
  label: 'This Week',
  range: function range() {
    return {
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek
    };
  }
}, {
  label: 'Last Week',
  range: function range() {
    return {
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek
    };
  }
}, {
  label: 'This Month',
  range: function range() {
    return {
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth
    };
  }
}, {
  label: 'Last Month',
  range: function range() {
    return {
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth
    };
  }
}]);

var defaultInputRanges = exports.defaultInputRanges = [{
  label: 'days up to today',
  range: function range(value) {
    return {
      startDate: (0, _add_days2.default)(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
      endDate: defineds.endOfToday
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _is_same_day2.default)(range.endDate, defineds.endOfToday)) return '-';
    if (!range.startDate) return '∞';
    return (0, _difference_in_calendar_days2.default)(defineds.endOfToday, range.startDate) + 1;
  }
}, {
  label: 'days starting today',
  range: function range(value) {
    var today = new Date();
    return {
      startDate: today,
      endDate: (0, _add_days2.default)(today, Math.max(Number(value), 1) - 1)
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _is_same_day2.default)(range.startDate, defineds.startOfToday)) return '-';
    if (!range.endDate) return '∞';
    return (0, _difference_in_calendar_days2.default)(range.endDate, defineds.startOfToday) + 1;
  }
}];