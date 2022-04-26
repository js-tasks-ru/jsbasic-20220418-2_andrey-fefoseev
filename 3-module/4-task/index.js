function showSalary(users, age) {
  let result = [];
  users.map((item, index) => {
    if (item.age <= age) {
      result.push(`${item.name}, ${item.balance}`);
    };
  });
  result = result.join('\n');
  return result;
}
