export function generateUser() {
  const timestamp = Date.now();

  return {
    username: `user_${timestamp}`,
    password: `Pass@123`,
  };
}