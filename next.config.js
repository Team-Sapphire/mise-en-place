/** @type {import('next').NextConfig} */
const nextHttps = require("next-https");
process.env.NODE_TLS_REJECT_UNAUTHORIZED =
  process.env.NODE_ENV === "development" ? "0" : "1";

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
