export default function garantee2Digits(number){
  if(number < 10) return `0${number}`;
  return number;
}