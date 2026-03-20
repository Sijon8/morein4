/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This is the magic word for GitHub Pages
  
  // UNCOMMENT the two lines below ONLY if your repo is named "moreinfour" 
  // and your URL will be username.github.io/moreinfour
  basePath: '/morein4', 
  assetPrefix: '/morein4/',
  
  images: {
    unoptimized: true, // Required for static exports
  },
};

export default nextConfig;