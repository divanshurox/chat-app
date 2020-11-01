const users = [];

const addUser = ({ id, username, room }) => {
  username = username.toLowerCase().split(" ").join("");
  room = room.toLowerCase().split(" ").join("");
  const existingUser = users.find(
    (ele) => ele.room === room && ele.username === username
  );
  if (!username || !room) {
    return { error: "Username and room are required." };
  }
  if (existingUser) {
    return {
      error: "Username is taken",
    };
  }
  const user = {
    id,
    username,
    room,
  };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((ele) => ele.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUserInRoom = (room) => users.filter((ele) => ele.room === room);

module.exports = { addUser, getUser, removeUser, getUserInRoom };
