require('dotenv').config();
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    // CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    DB_NAME: process.env.DB_NAME,
  },
});
