function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  friends.map((friend) => {
    let li = document.createElement('li');
    li.textContent = `${friend.firstName} ${friend.lastName}`;
    ul.append(li);
  })
  return ul;
}
