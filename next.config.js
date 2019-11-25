require('dotenv').config();
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  env: {
    PUBNUB_SUB_KEY: process.env.PUBNUB_SUB_KEY,
    PUBNUB_PUB_KEY: process.env.PUBNUB_PUB_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    // CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    DB_NAME: process.env.DB_NAME,
  },
});
