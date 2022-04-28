function camelize(str) {
  let subString = str.split('-');
  subString = subString.map((item, index) => {
    if (index == 0) {
      return item;
    } else {
      return item[0].toUpperCase() + item.slice(1)
    };
  });
  subString = subString.join('');
  return subString;
}
