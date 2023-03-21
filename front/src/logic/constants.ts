export const urls = {
  graphql: `${process.env.REACT_APP_API_URL ?? ''}/graphql`,
  profileData: `${process.env.REACT_APP_API_URL ?? ''}/auth/profile`,
  auth: `${process.env.REACT_APP_API_URL ?? ''}/auth`,
  logout: `${process.env.REACT_APP_API_URL ?? ''}/auth/logout`,
}
