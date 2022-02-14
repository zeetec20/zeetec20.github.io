/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['assets.example.com', 'cdn.thewirecutter.com', 'avatars.githubusercontent.com'],
  },
  env: {
    color1: '#ffffff',
    color2: '#000000',
    color3: '#6b6b6b',
    domain: 'http://localhost:3000'
  }
}
