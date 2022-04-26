function namify(users) {
  const userNames = [];
  users.map(({ name }) => {
    userNames.push(name);
  });
  return userNames;
}
