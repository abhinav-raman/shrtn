/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ["lh3.googleusercontent.com"],
	},
  compress: true,
};

module.exports = nextConfig;
