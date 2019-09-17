module.exports = {
  PORT: process.env.PORT || 5001,
  jwtSecret: process.env.JWT_SECRET || 'secret',

  linkedIn: {
    clientId: process.env.LINKEDIN_CLIENT_ID || '86d20z9kh5z6t3',
    clientSecret: process.env.LINKEDIN_SECRET || 'KGYshZqAlMdGB0Da',
    callback: 'http://localhost:5001/api/v1/auth/linkedin/callback',
    scopes: ['r_emailaddress', 'r_liteprofile']
  }

  // DB_DATABASE: "wallet",
  // DB_SQL_URL: process.env.DB_URL || "http://localhost:3306/",
  // DB_SQL_USER: process.env.DB_USER || "user",
  // DB_SQL_PASSWORD: process.env.DB_SQL_PASSWORD || "password",
  // DB_MONGO_URL: process.env.DB_URL || "mongodb://localhost:27017/",
  // DB_MONGO_USER: process.env.DB_USER || "user",
  // DB_MONGO_PASSWORD: process.env.DB_SQL_PASSWORD || "password"
};
