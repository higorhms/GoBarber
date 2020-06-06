export default {
  jwt: {
    secret: process.env.APP_SECRET || 'defaultJustToPassInTests',
    expiresIn: '3d',
  },
};
