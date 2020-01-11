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

export default function parse({ date, locale }){
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