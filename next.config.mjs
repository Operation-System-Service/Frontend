/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API;
    console.log("API Base URL:", apiBase); // Add this line for debugging

    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/api/:path*`,
      },
      {
        // Specific rule for servicecatalog
        source: '/api/servicecatalog/list',
        destination: `${apiBase}/api/servicecatalog/list`,
      },
    ];
  },
};

export default nextConfig;