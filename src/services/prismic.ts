import Prismic from '@prismicio/client';

export const getPrismicClient = (req?: unknown) => {
  const prismic = Prismic.client('https://ignews-mat.cdn.prismic.io/api/v2', {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  });

  return prismic;
}