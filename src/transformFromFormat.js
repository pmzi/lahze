import {toGregorian} from './utils/convertor';
import { DATE_FORMATS } from './constants';

export default function transformFromFormat(time, format, locale){
  const year = {
    string: [DATE_FORMATS.FULL_YEAR, DATE_FORMATS.SHORT_YEAR],
    regexp: ['\\d{4}', '\\d{1,2}'],
    property: 'year',
  };
  const month = {
    string: [DATE_FORMATS.FULL_MONTH, DATE_FORMATS.SHORT_MONTH],
    regexp: ['\\d{2}', '\\d{1,2}'],
    property: 'month',
  }
  const day = {
    string: [DATE_FORMATS.FULL_DAY, DATE_FORMATS.SHORT_DAY],
    regexp: ['\\d{2}', '\\d{1,2}'],
    property: 'day',
  };
  const hour = {
    string: [DATE_FORMATS.FULL_HOUR, DATE_FORMATS.SHORT_HOUR],
    regexp: ['\\d{2}', '\\d{1,2}'],
    property: 'hour',
  };
  const minutes = {
    string: [DATE_FORMATS.FULL_MINUTES, DATE_FORMATS.SHORT_MINUTES],
    regexp: ['\\d{2}', '\\d{1,2}'],
    property: 'minutes',
  };
  const seconds = {
    string: [DATE_FORMATS.FULL_SECONDS, DATE_FORMATS.SHORT_SECONDS],
    regexp: ['\\d{2}', '\\d{1,2}'],
    property: 'seconds',
  };

  const dates = [year, month, day, hour, minutes, seconds];

  const result = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minutes: 0,
    seconds: 0,
  };

  dates.forEach(({ string, regexp, property })=>{
    for(let i = 0;i<string.length;i++){
      if(string[i].test(format)){
        const tempTime = format.replace(string[i], 'P').replace(/[^P\-/\\:]/g, '.+?').replace('P', `(${regexp[i]})`);
        const regRes = new RegExp(tempTime).exec(time);
        if(regRes && regRes[1]){
          result[property] = new RegExp(tempTime).exec(time)[1];
        }else{
          result[property] = 0;
        }
      }
    }
  })

  if(locale === 'fa') {
    const [gYear, gMonth, gDay] = toGregorian(result.year, result.month, result.day);
    result.year = gYear;
    result.month = gMonth;
    result.day = gDay;
  }

  return result;
}