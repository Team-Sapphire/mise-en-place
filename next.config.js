/** @type {import('next').NextConfig} */
const nextHttps = require("next-https");

const withHttps = nextHttps({
  enabled: process.env.NODE_ENV === "development",
  host: "dev.local",
  key: "./keysAndCerts/localhost.key",
  cert: "./keysAndCerts/localhost.crt",
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withHttps(nextConfig);
