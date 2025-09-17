// Configuration de l'application
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  },
  app: {
    name: 'DIM VOYAGE',
    description: 'Découvrez la Côte d\'Ivoire avec DIM VOYAGE',
  },
};
