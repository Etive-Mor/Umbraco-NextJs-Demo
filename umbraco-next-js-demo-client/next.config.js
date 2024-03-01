/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/umbraco-nextjs-demo',
    output: "export",
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost', // http://localhost:59970
            port: '59970',
            pathname: '/media/**'
          },
        ],
      },
    };

    module.exports = nextConfig