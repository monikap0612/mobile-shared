export const transform = (user) => ({
  ...user,
  fullName: `${user.first_name} ${user.last_name}`
})
