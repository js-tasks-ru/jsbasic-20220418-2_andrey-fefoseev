function getMinMax(str) {
  let subStr = str.split(' ');
  let result = {};
  subStr = subStr.filter(item => {
    if (+item !== NaN) {
      return +item;
    };
  }).map(item => +item);
  result.min = Math.min.apply(null,subStr);
  result.max = Math.max.apply(null,subStr);
  return result;
}
