import { Post, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const batchPostDataLoader = (prisma: PrismaClient) =>
  new DataLoader<string, Post[] | undefined>(async (keys: readonly string[]) => {
    const postsMap = new Map<string, Post[]>();
    const posts = await prisma.post.findMany({
      where: { authorId: { in: [...keys] } },
    });

    for (const post of posts) {
      const authorPosts = postsMap.get(post.authorId) ?? [];
      authorPosts.push(post);
      postsMap.set(post.authorId, authorPosts);
    }

    return keys.map((key) => postsMap.get(key));
  });
