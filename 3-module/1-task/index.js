function namify(users) {
  let userNames = [];
  userNames = users.map(({ name }) => name);
  return userNames;
}

