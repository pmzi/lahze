import toGregorian from './utils/toGregorian';
import garantee2Digits from './utils/garantee2Digits';

const DATE_FORMATS = {
  FULL_YEAR: /YYYY/,
  SHORT_YEAR: /(?<!Y)YY(?!Y)/,
  FULL_MONTH: /MM/,
  SHORT_MONTH: /(?<!M)M(?!M)/,
  FULL_DAY: /DD/,
  SHORT_DAY: /(?<!D)D(?!D)/,
  FULL_HOUR: /HH/,
  SHORT_HOUR: /(?<!H)H(?!H)/,
  FULL_MINUTES: /mm/,
  SHORT_MINUTES: /(?<!m)m(?!m)/,
  FULL_SECONDS: /ss/,
  SHORT_SECONDS: /(?<!s)s(?!s)/,
}

export default function Lahze(time, format, locale) {
  this.locale = locale;

  if(time){
    if(format){
      this.date = transformFromFormat(time, format, locale);
    }else {
      if(time instanceof Date){
        this.date = time;
      }else {
        this.date = new Date(time);
      }
    }
  }else{
    this.date = new Date();
  }
}

Lahze.prototype.format = function(format, locale) {
  const parsed = parse({ date: this.date, locale: locale || this.locale });

  format = format.replace(DATE_FORMATS.FULL_YEAR, parsed.Y);
  format = format.replace(DATE_FORMATS.FULL_MONTH, parsed.M);
  format = format.replace(DATE_FORMATS.FULL_DAY, parsed.D);
  format = format.replace(DATE_FORMATS.FULL_HOUR, garantee2Digits(this.date.getHours()));
  format = format.replace(DATE_FORMATS.FULL_MINUTES, garantee2Digits(this.date.getMinutes()));
  format = format.replace(DATE_FORMATS.FULL_SECONDS, garantee2Digits(this.date.getSeconds()));

  format = format.replace(DATE_FORMATS.SHORT_YEAR, parsed.Y.substr(2));
  format = format.replace(DATE_FORMATS.SHORT_MONTH, parsed.M);
  format = format.replace(DATE_FORMATS.SHORT_DAY, parsed.D);
  format = format.replace(DATE_FORMATS.SHORT_HOUR, this.date.getHours());
  format = format.replace(DATE_FORMATS.SHORT_MINUTES, this.date.getMinutes());
  format = format.replace(DATE_FORMATS.SHORT_SECONDS, this.date.getSeconds());

  return format;
}

function parse({ date, locale }){
  const localeDate = date.toLocaleDateString(locale);
  let output;
  let parsed;

  if(locale === 'fa'){
    output = /(\d{4})\/(\d{1,2})\/(\d{1,2})/.exec(
      convertNumber(localeDate)
    );
    parsed = {
      Y: output[1],
      M: output[2],
      D: output[3],
    }
  }else {
    output = /(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(
      convertNumber(localeDate)
    );
    parsed = {
      Y: output[3],
      M: output[1],
      D: output[2],
    }
  };

  return parsed;
}

function convertNumber(input){
  const persianNumbers = {
    '۱': 1,
    '۲': 2,
    '۳': 3,
    '۴': 4,
    '۵': 5,
    '۶': 6,
    '۷': 7,
    '۸': 8,
    '۹': 9,
    '۰': 0,
  };

  return input.split('').map(char => {
    if(char in persianNumbers) return persianNumbers[char];
    return char;
  }).join('');
}

function transformFromFormat(time, format, locale){
  const result = fromFromat(time, format, locale);

  return new Date(result.year, result.month - 1, result.day);
}

function fromFromat(time, format, locale){
  const year = {
    string: [DATE_FORMATS.FULL_YEAR, DATE_FORMATS.SHORT_YEAR],
    regexp: ['\\d{4}', '\\d{2}'],
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

  const dates = [year, month, day];

  const result = {};

  dates.forEach(({ string, regexp, property })=>{
    for(let i = 0;i<string.length;i++){
      if(string[i].test(format)){
        const tempTime = format.replace(string[i], 'P').replace(/[^P\-/\\]/g, '.').replace('P', `(${regexp[i]})`);
        result[property] = new RegExp(tempTime).exec(time)[1];
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