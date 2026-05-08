/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
      remotePatterns: [
        { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/**' },
        { protocol: 'https', hostname: 'strapi-test-5qa0.onrender.com', pathname: '/**' },
      ],
    },
  };
  
  export default nextConfig;
  