/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['gptmaker.ai'],
  },
}

module.exports = nextConfig