import toGregorian from './toGregorian';

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
  }
  this.date = time && locale === 'fa' ? transformFromFormat(time, format, locale) : new Date();
}

Lahze.prototype.format = function(format, locale) {
  const parsed = parse({ date: this.date, locale: locale || this.locale });

  format = format.replace('YYYY', parsed.Y);
  format = format.replace('MM', parsed.M);
  format = format.replace('DD', parsed.D);
  format = format.replace('HH', this.date.getHours());
  format = format.replace('mm', this.date.getMinutes());
  format = format.replace('ss', this.date.getSeconds());

  return format;
}

function parse({ date, locale }){
  const localeDate = locale === 'fa' ? date.toLocaleDateString(locale) : date.toLocaleDateString(locale).split('/').reverse().join('/');

  const output = /(\d{4})\/(\d{1,2})\/(\d{1,2})/.exec(
    convertNumber(localeDate)
  );

  const parsed = {
    Y: output[1],
    M: output[2],
    D: output[3],
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

  return new Date(result.year, result.month, result.day);
}

function fromFromat(time, format, locale){
  const year = {
    string: ['yyyy'],
    regexp: ['\\d{4}'],
    property: 'year',
  };
  const month = {
    string: ['MM'],
    regexp: ['\\d{2}'],
    property: 'month',
  }
  const day = {
    string: ['DD'],
    regexp: ['\\d{2}'],
    property: 'day',
  };

  const dates = [year, month, day];

  const result = {};

  dates.forEach(({ string, regexp, property })=>{
    for(let i = 0;i<string.length;i++){
      if(format.includes(string[i])){
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