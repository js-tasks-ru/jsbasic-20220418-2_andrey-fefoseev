function truncate(str, maxlength) {
  if (str.length > maxlength) {
    str = str.slice(0, maxlength - 1) + '…';
    return str;
  } else {
    return str;
  };
}

console.log(truncate('Вот, что мне хотелось бы сказать на эту тему:', 20))
