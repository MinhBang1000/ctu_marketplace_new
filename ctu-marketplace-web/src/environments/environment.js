module.exports = {
  url: {
    java: process.env.REACT_APP_BASE_URL + "/api/v2",
    java_admin: process.env.REACT_APP_BASE_URL,

    GOOGLE_AUTH_URL:
    process.env.REACT_APP_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + process.env.REACT_APP_BASE_URL,
  },
};
