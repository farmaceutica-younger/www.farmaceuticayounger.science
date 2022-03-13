module.exports = {
  reactStrictMode: true,
  siteUrl: process.env.SITE_URL || "https://www.farmaceuticayounger.science",
  generateRobotsTxt: true, // (optional)
  exclude: ["/admin/*", "/episodes/*"],
};
