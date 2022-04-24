function sumSalary(salaries) {
  let sum = 0;
  for (let item in salaries) {
    if (typeof(salaries[item]) === "number" &&
      salaries[item] != NaN &&
      salaries[item] > -Infinity &&
      salaries[item] < Infinity) {
      console.log(item);
      sum += salaries[item];
    };
  };
  return sum;
}