import { Post, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const batchPostDataLoader =
  (prisma: PrismaClient) => async (keys: readonly string[]) => {
    const postsMap = new Map<string, Post[]>();
    const posts = await prisma.post.findMany({
      where: { authorId: { in: [...keys] } },
    });

    for (const post of posts) {
      const authorPosts = postsMap.get(post.authorId) ?? [];
      authorPosts.push(post);
      postsMap.set(post.authorId, authorPosts);
    }

    return keys.map((key) => postsMap.get(key) || []);
  };

export const createPostsLoader = (prisma: PrismaClient) =>
  new DataLoader(batchPostDataLoader(prisma));
