function getMinMax(str) {
  let subStr = str.split(' ');
  let result = {};
  subStr = subStr.filter(item => {
    if (+item !== NaN) {
      return +item;
    };
  }).map(item => +item);
  result.min = Math.min(...subStr);
  result.max = Math.max(...subStr);
  return result;
}
