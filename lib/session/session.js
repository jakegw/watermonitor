export const sessionOptions = {
  password: process.env.COOKIE_PASSWORD,
  cookieName: "water-cookie",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};