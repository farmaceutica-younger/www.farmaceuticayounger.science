const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()({
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    loader: "cloudinary",
    path: "https://res.cloudinary.com/dbdvy5b2z/image/upload/",
  },
});
