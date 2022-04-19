/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  if (name && checkSpaces(name) === 0 && name.length > 3 ) {
    return true;
  } else {
    return false;
  };
}

// напишу дополнительную функцию для проверки пробелов
function checkSpaces(name) {
  let counter = 0;
  for (let i = 0; i < name.length; i += 1) {
    if (name[i] === ' ') {
      counter += 1; 
    };
  };
  return counter;
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
