/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'agentsgalazy.blob.core.windows.net',
            port: '',
            pathname: '/**',
          },
        ],
      },
    

};

export default nextConfig;
