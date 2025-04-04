// src/mock/mockAuth.ts

export const getCurrentUser = async () => {
  return {
    username: "testuser",
    attributes: {
      email: "testuser@example.com",
    },
  };
};
