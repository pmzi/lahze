import guarantee2Digits from './utils/guarantee2Digits';
import transformFromFormat from './transformFromFormat';
import parse from './utils/parse';
import { DATE_FORMATS } from './constants';
import { toGregorian } from './utils/convertor';

export default function Lahze(time, format, locale) {
  this.locale = locale;

  if(time){
    if(format){
      const { year, month, day, hour, minutes, seconds } = transformFromFormat(time, format, locale);
      this._date = new Date(
        year,
        month == 0 ? month : month - 1,
        day || 1,
        hour,
        minutes,
        seconds
      );
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

Object.defineProperty(Lahze.prototype, 'date', {
  get(){
    return this._date;
  }
});

Lahze.prototype.format = function(format, locale) {
  const parsed = parse({ date: this._date, locale: locale || this.locale });

  format = format.replace(DATE_FORMATS.FULL_YEAR, parsed.Y);
  format = format.replace(DATE_FORMATS.FULL_MONTH, guarantee2Digits(parsed.M));
  format = format.replace(DATE_FORMATS.FULL_DAY, guarantee2Digits(parsed.D));
  format = format.replace(DATE_FORMATS.FULL_HOUR, guarantee2Digits(this._date.getHours()));
  format = format.replace(DATE_FORMATS.FULL_MINUTES, guarantee2Digits(this._date.getMinutes()));
  format = format.replace(DATE_FORMATS.FULL_SECONDS, guarantee2Digits(this._date.getSeconds()));

  format = format.replace(DATE_FORMATS.SHORT_YEAR, parsed.Y.toString().substr(2));
  format = format.replace(DATE_FORMATS.SHORT_MONTH, parsed.M);
  format = format.replace(DATE_FORMATS.SHORT_DAY, parsed.D);
  format = format.replace(DATE_FORMATS.SHORT_HOUR, this._date.getHours());
  format = format.replace(DATE_FORMATS.SHORT_MINUTES, this._date.getMinutes());
  format = format.replace(DATE_FORMATS.SHORT_SECONDS, this._date.getSeconds());

  return format;
}

Lahze.prototype.getFullYear = function(locale){
  return Number(this.format('YYYY', locale));
}
Lahze.prototype.getMonth = function(locale){
  return Number(this.format('M', locale));
}
Lahze.prototype.getDate = function(locale){
  return Number(this.format('D', locale));
}
Lahze.prototype.getHours = function(){
  return this._date.getHours();
}
Lahze.prototype.getMinutes = function(){
  return this._date.getMinutes();
}
Lahze.prototype.getSeconds = function(){
  return this._date.getSeconds();
}
Lahze.prototype.getMilliseconds = function(){
  return this._date.getMilliseconds();
}

Lahze.prototype.setFullYear = function(year, locale){
  if((locale || this.locale) === 'en') this._date.setFullYear(year);
  else {
    const [gYear, gMonth, gDay] = toGregorian(year, this.getMonth('fa'), this.getDay('fa'));
    this._date = new Date(gYear, gMonth - 1, gDay, this._date.getHours(), this._date.getMinutes(), this._date.getSeconds(), this._date.getMilliseconds());
  }
  return this;
}
Lahze.prototype.setMonth = function(month, locale){
  if((locale || this.locale) === 'en') this._date.setMonth(month);
  else {
    const [gYear, gMonth, gDay] = toGregorian(this.getFullYear('fa'), month, this.getDay('fa'));
    this._date = new Date(gYear, gMonth - 1, gDay, this._date.getHours(), this._date.getMinutes(), this._date.getSeconds(), this._date.getMilliseconds());
  }
  return this;
}
Lahze.prototype.setDay = function(day, locale){
  if((locale || this.locale) === 'en') this._date.setDate(day);
  else {
    const [gYear, gMonth, gDay] = toGregorian(this.getFullYear('fa'), this.getMonth('fa'), day);
    this._date = new Date(gYear, gMonth - 1, gDay, this._date.getHours(), this._date.getMinutes(), this._date.getSeconds(), this._date.getMilliseconds());
  }
  return this;
}
Lahze.prototype.setHours = function(hours){
  this._date.setHours(hours);
  return this;
}
Lahze.prototype.setMinutes = function(minutes){
  this._date.setMinutes(minutes);
  return this;
}
Lahze.prototype.setSeconds = function(seconds){
  this._date.setSeconds(seconds);
  return this;
}
Lahze.prototype.setMilliseconds = function(ms){
  this._date.getMilliseconds(ms);
  return this;
}