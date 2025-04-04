export const getCurrentUser = async () => {
  const user = localStorage.getItem("mockUser");
  return user ? JSON.parse(user) : null;
};

export const signIn = async () => {
  const mockUser = {
    username: "testuser",
    attributes: {
      email: "testuser@example.com",
    },
  };
  localStorage.setItem("mockUser", JSON.stringify(mockUser));
  return mockUser;
};

export const signOut = async () => {
  localStorage.removeItem("mockUser");
};
