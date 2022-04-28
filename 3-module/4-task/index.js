function showSalary(users, age) {
  let result = [];
  users.filter((item) => {
    if (item.age <= age) {
      result.push(`${item.name}, ${item.balance}`);
    };
  });
  result = result.join('\n');
  return result;
}
