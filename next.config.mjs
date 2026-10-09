/** Site statique : `npm run build` produit le dossier `out/`, à déposer chez n'importe quel hébergeur. */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
