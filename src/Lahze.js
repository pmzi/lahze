import garantee2Digits from './utils/garantee2Digits';
import transformFromFormat from './transformFromFormat';
import parse from './utils/parse';
import { DATE_FORMATS } from './constants';

export default function Lahze(time, format, locale) {
  this.locale = locale;

  if(time){
    if(format){
      const { year, month, day } = transformFromFormat(time, format, locale);
      this._date = new Date(year, month - 1, day);
    }else {
      if(time instanceof Date){
        this._date = time;
      }else {
        this._date = new Date(time);
      }
    }
  }else{
    this._date = new Date();
  }
}

Lahze.prototype.date = function() {
  return this._date;
}

Lahze.prototype.format = function(format, locale) {
  const parsed = parse({ date: this._date, locale: locale || this.locale });

  format = format.replace(DATE_FORMATS.FULL_YEAR, parsed.Y);
  format = format.replace(DATE_FORMATS.FULL_MONTH, garantee2Digits(parsed.M));
  format = format.replace(DATE_FORMATS.FULL_DAY, garantee2Digits(parsed.D));
  format = format.replace(DATE_FORMATS.FULL_HOUR, garantee2Digits(this._date.getHours()));
  format = format.replace(DATE_FORMATS.FULL_MINUTES, garantee2Digits(this._date.getMinutes()));
  format = format.replace(DATE_FORMATS.FULL_SECONDS, garantee2Digits(this._date.getSeconds()));

  format = format.replace(DATE_FORMATS.SHORT_YEAR, parsed.Y.substr(2));
  format = format.replace(DATE_FORMATS.SHORT_MONTH, parsed.M);
  format = format.replace(DATE_FORMATS.SHORT_DAY, parsed.D);
  format = format.replace(DATE_FORMATS.SHORT_HOUR, this._date.getHours());
  format = format.replace(DATE_FORMATS.SHORT_MINUTES, this._date.getMinutes());
  format = format.replace(DATE_FORMATS.SHORT_SECONDS, this._date.getSeconds());

  return format;
}