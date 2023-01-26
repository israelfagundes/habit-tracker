import { Dimensions } from "react-native";
import { generateRangeDatesFromYearStart } from "./generate-range-between-dates";

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const DATES_FROM_YEAR_START = generateRangeDatesFromYearStart();
const MINIMUM_SUMMARY_DATES_SIZE = 18 * 5;
const DAYS_TO_FILL = MINIMUM_SUMMARY_DATES_SIZE - DATES_FROM_YEAR_START.length;

const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

const DAY_MARGIN_BETWEEN = 8;
const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS.length) - (SCREEN_HORIZONTAL_PADDING + 5)

export {
  WEEK_DAYS,
  DATES_FROM_YEAR_START,
  MINIMUM_SUMMARY_DATES_SIZE,
  DAYS_TO_FILL,
  SCREEN_HORIZONTAL_PADDING,
  DAY_MARGIN_BETWEEN,
  DAY_SIZE
}