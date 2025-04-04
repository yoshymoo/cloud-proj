const MAX_USERS = 2;
const USERS_KEY = "mockUserList";

export const getCurrentUser = async () => {
  const user = localStorage.getItem("mockUser");
  return user ? JSON.parse(user) : null;
};

export const signIn = async (username: string) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  const existing = users.find((u: string) => u === username);
  if (!existing) throw new Error("User does not exist. Please sign up first.");

  const mockUser = {
    username,
    attributes: { email: `${username}@mock.com` },
  };
  localStorage.setItem("mockUser", JSON.stringify(mockUser));
  return mockUser;
};

export const signUp = async (username: string) => {
  let users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  if (users.includes(username)) throw new Error("Username already taken.");
  if (users.length >= MAX_USERS) throw new Error("Maximum number of users reached.");

  users.push(username);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return signIn(username); // Auto-login after signup
};

export const signOut = async () => {
  localStorage.removeItem("mockUser");
};
