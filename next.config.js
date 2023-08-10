// next.config.js
module.exports = {
    reactDevOverlay: false,
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:8989/:path*',
          },
        ]
      },
  };