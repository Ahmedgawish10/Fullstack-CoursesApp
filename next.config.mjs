/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
      remotePatterns: [
        { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/**' },
        { protocol: 'https', hostname: 'strapi-test-5qa0.onrender.com', pathname: '/**' },
        { protocol: 'https', hostname: 'timely-desire-802f0ed05c.media.strapiapp.com', pathname: '/**' },
      ],
    },
  };
  
  export default nextConfig;
  