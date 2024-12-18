/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  //使lucia运行起来的配置
  serverExternalPackages: ["@node-rs/argon2"],

};

export default nextConfig;
