/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['res.cloudinary.com','shop.leerecs.com','leerecs.com','d3wo5wojvuv7l.cloudfront.net'], // add the domain here
        unoptimized: true,
      },
    //  output: 'export',
    
};

export default nextConfig;
