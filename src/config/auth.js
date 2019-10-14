/**
 * Configurations of the secret key and time of the token need to expire
 */

export default {
    secret: process.env.APP_SECRET,
    expiresIn: '7d',
};
