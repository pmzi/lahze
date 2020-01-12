import { toJalali } from './convertor';

export default function parse({ date, locale }){
  if(locale === 'fa') {
    const [Y,M,D] = toJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return {
      Y,
      M,
      D
    }
  }else {
    return {
      Y: date.getFullYear(),
      M: date.getMonth() + 1,
      D: date.getDate()
    }
  }
}